import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ConversationPanel } from './components/ConversationPanel/ConversationPanel';
import { SlideNavigation, SLIDES } from './components/SlideNavigation/SlideNavigation';
import { ComparisonSlide } from './components/ComparisonSlide/ComparisonSlide';
import { ContextWindowSlide } from './components/ContextWindowSlide/ContextWindowSlide';
import { LostInMiddleSlide } from './components/LostInMiddleSlide/LostInMiddleSlide';
import { RPIFlowSlide } from './components/RPIFlowSlide/RPIFlowSlide';
import { ErrorCascadeSlide } from './components/ErrorCascadeSlide/ErrorCascadeSlide';
import { ELEMENT_TYPES, CONTEXT_WINDOW_SIZE, getPermanentElements } from './data/elements';
import './App.css';

// Helper to create permanent elements with unique instance IDs
function createPermanentElements() {
  return getPermanentElements().map(el => ({
    ...el,
    instanceId: `${el.id}-permanent-${Math.random().toString(36).substr(2, 9)}`
  }));
}

// Helper to generate Sankey data from elements
function generateSankeyData(addedElements, availableTokens) {
  if (addedElements.length === 0) {
    return {
      nodes: [
        { id: 'context-window', label: 'Context Window', color: '#6366f1' },
        { id: 'available', label: 'Available', color: '#22c55e' }
      ],
      links: [
        { source: 'context-window', target: 'available', value: CONTEXT_WINDOW_SIZE }
      ]
    };
  }
  
  const nodes = [
    { id: 'context-window', label: 'Context Window', color: '#6366f1' }
  ];
  
  const links = [];
  
  addedElements.forEach((element) => {
    const nodeId = `node-${element.instanceId}`;
    
    nodes.push({
      id: nodeId,
      label: element.name,
      color: element.color
    });
    
    links.push({
      source: 'context-window',
      target: nodeId,
      value: element.tokens,
      color: element.color
    });
  });
  
  if (availableTokens > 0) {
    nodes.push({
      id: 'available',
      label: 'Available',
      color: '#22c55e'
    });
    
    links.push({
      source: 'context-window',
      target: 'available',
      value: availableTokens
    });
  }
  
  return { nodes, links };
}

function App() {
  const [currentSlide, setCurrentSlide] = useState('comparison');
  const [activeElement, setActiveElement] = useState(null);
  const [conversations, setConversations] = useState([
    { id: 'conv-1', title: 'Conversation 1', elements: createPermanentElements() }
  ]);
  const [nextConvId, setNextConvId] = useState(2);
  const [compactedSummaries, setCompactedSummaries] = useState([]);

  // Keyboard navigation for slides (number keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Mapping: 1 = comparison, 2 = context-window, 3 = lost-in-middle, 4 = visualizer, 5 = rpi-flow, 6 = error-cascade
      const slideMap = {
        '1': 'comparison',
        '2': 'context-window',
        '3': 'lost-in-middle',
        '4': 'visualizer',
        '5': 'rpi-flow',
        '6': 'error-cascade'
      };
      
      if (slideMap[e.key]) {
        setCurrentSlide(slideMap[e.key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Add a new conversation
  const addConversation = useCallback(() => {
    const newConv = {
      id: `conv-${nextConvId}`,
      title: `Conversation ${nextConvId}`,
      elements: createPermanentElements()
    };
    setConversations(prev => [...prev, newConv]);
    setNextConvId(prev => prev + 1);
  }, [nextConvId]);

  // Delete a conversation
  const deleteConversation = useCallback((convId) => {
    setConversations(prev => prev.filter(c => c.id !== convId));
  }, []);

  // Add element to a specific conversation
  const addElementToConversation = useCallback((convId, element) => {
    const instanceId = `${element.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setConversations(prev => prev.map(conv => {
      if (conv.id === convId) {
        return { ...conv, elements: [...conv.elements, { ...element, instanceId }] };
      }
      return conv;
    }));
  }, []);

  // Clear all elements from a conversation
  const clearConversation = useCallback((convId) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === convId) {
        return { ...conv, elements: [] };
      }
      return conv;
    }));
  }, []);

  // Summarize non-summary and non-permanent elements in a conversation
  const summarizeConversation = useCallback((convId) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === convId) {
        // Separate permanent, summaries, and summarizable elements
        const permanentElements = conv.elements.filter(el => el.permanent);
        const existingSummaries = conv.elements.filter(el => el.id === 'summary');
        const elementsToSummarize = conv.elements.filter(el => !el.permanent && el.id !== 'summary');
        
        // Only summarize if there are elements to summarize
        if (elementsToSummarize.length < 2) {
          return conv;
        }
        
        const totalTokens = elementsToSummarize.reduce((sum, el) => sum + el.tokens, 0);
        // Compression factor: summary is ~25-35% of original (simulating real summarization)
        const compressionFactor = 0.25 + Math.random() * 0.1;
        const summaryTokens = Math.round(totalTokens * compressionFactor);
        
        // Count existing summaries to number the new one
        const summaryNumber = existingSummaries.length + 1;
        
        const summaryElement = {
          id: 'summary',
          instanceId: `summary-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: summaryNumber > 1 ? `Summary #${summaryNumber} (${elementsToSummarize.length} items)` : `Summary (${elementsToSummarize.length} items)`,
          tokens: summaryTokens,
          color: '#10b981', // Emerald green
          description: 'Summarized conversation context',
          category: 'summary',
          originalTokens: totalTokens,
          savedTokens: totalTokens - summaryTokens
        };
        
        // Keep permanent elements, existing summaries, and add new summary
        return { ...conv, elements: [...permanentElements, ...existingSummaries, summaryElement] };
      }
      return conv;
    }));
  }, []);

  // Intentional compaction: creates a draggable summary file without modifying the conversation
  const compactConversation = useCallback((convId) => {
    const conv = conversations.find(c => c.id === convId);
    if (!conv) return;

    // Get conversation number from title
    const convNumber = conv.title.replace('Conversation ', '');
    
    // Get elements to compact (non-permanent, non-summary)
    const elementsToCompact = conv.elements.filter(el => !el.permanent && el.id !== 'summary');
    
    if (elementsToCompact.length < 1) return;
    
    const totalTokens = elementsToCompact.reduce((sum, el) => sum + el.tokens, 0);
    // More aggressive compression: 10-15% (vs 25-35% for /summarize)
    const compressionFactor = 0.10 + Math.random() * 0.05;
    const compactedTokens = Math.round(totalTokens * compressionFactor);
    
    const compactedElement = {
      id: `compacted-conv-${convNumber}-${Date.now()}`,
      name: `Conversation${convNumber}-summary.md`,
      tokens: compactedTokens,
      color: '#14b8a6', // Teal
      description: `Compacted summary of Conversation ${convNumber}`,
      category: 'compacted',
      isCompacted: true
    };
    
    setCompactedSummaries(prev => [...prev, compactedElement]);
  }, [conversations]);

  const handleDragStart = (event) => {
    const { active } = event;
    // Check in ELEMENT_TYPES first, then in compactedSummaries
    let element = Object.values(ELEMENT_TYPES).find(el => el.id === active.id);
    if (!element) {
      element = compactedSummaries.find(el => el.id === active.id);
    }
    setActiveElement(element);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (over && over.id.startsWith('drop-zone-')) {
      const convId = over.id.replace('drop-zone-', '');
      // Check in ELEMENT_TYPES first, then in compactedSummaries
      let element = Object.values(ELEMENT_TYPES).find(el => el.id === active.id);
      if (!element) {
        element = compactedSummaries.find(el => el.id === active.id);
      }
      if (element) {
        addElementToConversation(convId, element);
      }
    }
    
    setActiveElement(null);
  };

  const handleDragCancel = () => {
    setActiveElement(null);
  };

  // Generate Sankey data for each conversation
  const conversationsWithSankey = useMemo(() => {
    return conversations.map(conv => {
      const totalTokensUsed = conv.elements.reduce((sum, el) => sum + el.tokens, 0);
      const availableTokens = Math.max(0, CONTEXT_WINDOW_SIZE - totalTokensUsed);
      const sankeyData = generateSankeyData(conv.elements, availableTokens);
      
      return { ...conv, sankeyData };
    });
  }, [conversations]);

  // Render the visualizer slide content (with DnD context)
  const renderVisualizerSlide = () => (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="app-content">
        <div className="conversations-container">
          {conversationsWithSankey.map((conv) => (
            <ConversationPanel
              key={conv.id}
              id={conv.id}
              title={conv.title}
              sankeyData={conv.sankeyData}
              addedElements={conv.elements}
              onClearAll={() => clearConversation(conv.id)}
              onSummarize={() => summarizeConversation(conv.id)}
              onCompact={() => compactConversation(conv.id)}
              onDelete={() => deleteConversation(conv.id)}
              canDelete={conversations.length > 1}
            />
          ))}
        </div>
        <Sidebar compactedSummaries={compactedSummaries} />
      </div>
      
      <DragOverlay dropAnimation={null}>
        {activeElement ? (
          <div className="drag-preview">
            <div 
              className="preview-indicator" 
              style={{ backgroundColor: activeElement.color }}
            />
            <span>{activeElement.name}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Context Engineering</h1>
        
        <SlideNavigation 
          currentSlide={currentSlide} 
          onSlideChange={setCurrentSlide} 
        />
        
        {currentSlide === 'visualizer' && (
          <button className="new-conv-btn" onClick={addConversation}>
            + New Conversation
          </button>
        )}
        {currentSlide !== 'visualizer' && (
          <div className="header-spacer"></div>
        )}
      </header>
      
      {currentSlide === 'comparison' && (
        <div className="slide-container">
          <ComparisonSlide />
        </div>
      )}
      {currentSlide === 'context-window' && (
        <div className="slide-container">
          <ContextWindowSlide />
        </div>
      )}
      {currentSlide === 'lost-in-middle' && (
        <div className="slide-container">
          <LostInMiddleSlide />
        </div>
      )}
      {currentSlide === 'visualizer' && renderVisualizerSlide()}
      {currentSlide === 'rpi-flow' && (
        <div className="slide-container">
          <RPIFlowSlide />
        </div>
      )}
      {currentSlide === 'error-cascade' && (
        <div className="slide-container">
          <ErrorCascadeSlide />
        </div>
      )}
    </div>
  );
}

export default App;
