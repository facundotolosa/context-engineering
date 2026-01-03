import { useDroppable } from '@dnd-kit/core';
import { ResponsiveSankey } from '@nivo/sankey';
import './ConversationPanel.css';

export function ConversationPanel({ 
  id,
  title,
  sankeyData, 
  addedElements,
  onClearAll,
  onSummarize,
  onCompact,
  onDelete,
  canDelete
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `drop-zone-${id}`
  });

  // Check if we can summarize (need more than 1 non-permanent, non-summary element)
  const summarizableElements = addedElements.filter(el => !el.permanent && el.id !== 'summary');
  const canSummarize = summarizableElements.length > 1;
  const canCompact = summarizableElements.length > 0;

  return (
    <div className="conversation-panel">
      <div className="panel-header">
        <h2>{title}</h2>
        <div className="panel-actions">
          {addedElements.length > 0 && (
            <button className="action-btn clear-btn" onClick={onClearAll}>
              Clear
            </button>
          )}
          {canDelete && (
            <button className="action-btn delete-btn" onClick={onDelete}>
              ×
            </button>
          )}
        </div>
      </div>
      
      <div 
        className={`panel-diagram ${isOver ? 'drag-over' : ''}`}
        ref={setNodeRef}
      >
        {sankeyData.links.length > 0 ? (
          <ResponsiveSankey
            data={sankeyData}
            margin={{ top: 20, right: 160, bottom: 20, left: 120 }}
            align="justify"
            sort="input"
            colors={(node) => node.color || '#6366f1'}
            label={(node) => node.label || node.id}
            nodeOpacity={1}
            nodeHoverOpacity={1}
            nodeThickness={12}
            nodeSpacing={12}
            nodeBorderWidth={0}
            nodeBorderRadius={2}
            linkOpacity={0.5}
            linkHoverOpacity={0.7}
            linkContract={2}
            enableLinkGradient={true}
            labelPosition="outside"
            labelOrientation="horizontal"
            labelPadding={16}
            labelTextColor={{ from: 'color', modifiers: [['brighter', 1]] }}
            animate={true}
            motionConfig="gentle"
            theme={{
              labels: {
                text: {
                  fontSize: 11,
                  fontWeight: 500,
                  fill: '#e2e8f0'
                }
              },
              tooltip: {
                container: {
                  background: '#1e293b',
                  color: '#e2e8f0',
                  fontSize: 11,
                  borderRadius: 6,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
                }
              }
            }}
          />
        ) : (
          <div className="empty-state">
            <p>Drop elements here</p>
          </div>
        )}
        
        {isOver && (
          <div className="drop-indicator">
            <span>Drop to add</span>
          </div>
        )}
      </div>

      {/* Action buttons */}
      {(canSummarize || canCompact) && (
        <div className="summarize-section">
          {canSummarize && (
            <button className="summarize-btn" onClick={onSummarize}>
              /summarize
            </button>
          )}
          {canCompact && (
            <button className="compact-btn" onClick={onCompact}>
              Intentional compaction
            </button>
          )}
        </div>
      )}
    </div>
  );
}
