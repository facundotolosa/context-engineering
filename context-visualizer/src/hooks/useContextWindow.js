import { useState, useCallback, useMemo } from 'react';
import { CONTEXT_WINDOW_SIZE } from '../data/elements';

export function useContextWindow() {
  // Array of added elements with unique instance IDs
  const [addedElements, setAddedElements] = useState([]);
  
  // Add an element to the context window
  const addElement = useCallback((element) => {
    const instanceId = `${element.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setAddedElements(prev => [...prev, { ...element, instanceId }]);
  }, []);
  
  // Remove an element by its instance ID
  const removeElement = useCallback((instanceId) => {
    setAddedElements(prev => prev.filter(el => el.instanceId !== instanceId));
  }, []);
  
  // Clear all elements
  const clearAll = useCallback(() => {
    setAddedElements([]);
  }, []);
  
  // Calculate total tokens used
  const totalTokensUsed = useMemo(() => {
    return addedElements.reduce((sum, el) => sum + el.tokens, 0);
  }, [addedElements]);
  
  // Calculate available tokens
  const availableTokens = useMemo(() => {
    return Math.max(0, CONTEXT_WINDOW_SIZE - totalTokensUsed);
  }, [totalTokensUsed]);
  
  // Calculate percentage used
  const percentageUsed = useMemo(() => {
    return (totalTokensUsed / CONTEXT_WINDOW_SIZE) * 100;
  }, [totalTokensUsed]);
  
  // Generate Sankey data for the diagram
  const sankeyData = useMemo(() => {
    if (addedElements.length === 0) {
      // Show empty state with full available context
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
    
    // Add each element as an individual node (no grouping)
    addedElements.forEach((element, index) => {
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
    
    // Add available context node
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
  }, [addedElements, availableTokens]);
  
  return {
    addedElements,
    addElement,
    removeElement,
    clearAll,
    totalTokensUsed,
    availableTokens,
    percentageUsed,
    contextWindowSize: CONTEXT_WINDOW_SIZE,
    sankeyData
  };
}

