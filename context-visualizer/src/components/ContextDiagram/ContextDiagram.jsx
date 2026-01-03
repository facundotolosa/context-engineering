import { useDroppable } from "@dnd-kit/core";
import { ResponsiveSankey } from "@nivo/sankey";
import "./ContextDiagram.css";

export function ContextDiagram({
  sankeyData,
  totalTokensUsed,
  availableTokens,
  contextWindowSize,
  percentageUsed,
  addedElements,
  onRemoveElement,
  onClearAll,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: "diagram-drop-zone",
  });

  const formatTokens = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  return (
    <main className="context-diagram" ref={setNodeRef}>
      <div className="diagram-header">
        <h1>Context Window Visualizer</h1>
        <div className="header-actions">
          {addedElements.length > 0 && (
            <button className="clear-btn" onClick={onClearAll}>
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className={`diagram-container ${isOver ? "drag-over" : ""}`}>
        {sankeyData.links.length > 0 ? (
          <ResponsiveSankey
            data={sankeyData}
            margin={{ top: 40, right: 200, bottom: 40, left: 200 }}
            align="justify"
            colors={(node) => node.color || "#6366f1"}
            label={(node) => node.label || node.id}
            nodeOpacity={1}
            nodeHoverOpacity={1}
            nodeThickness={24}
            nodeSpacing={24}
            nodeBorderWidth={0}
            nodeBorderRadius={4}
            linkOpacity={0.5}
            linkHoverOpacity={0.7}
            linkContract={3}
            enableLinkGradient={true}
            labelPosition="outside"
            labelOrientation="horizontal"
            labelPadding={16}
            labelTextColor={{ from: "color", modifiers: [["brighter", 1]] }}
            animate={true}
            motionConfig="gentle"
            theme={{
              labels: {
                text: {
                  fontSize: 12,
                  fontWeight: 500,
                  fill: "#e2e8f0",
                },
              },
              tooltip: {
                container: {
                  background: "#1e293b",
                  color: "#e2e8f0",
                  fontSize: 12,
                  borderRadius: 6,
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
                },
              },
            }}
          />
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M12 5v14M5 12h14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}

        {isOver && (
          <div className="drop-indicator">
            <span>Drop to add</span>
          </div>
        )}
      </div>

      <div className="stats-bar">
        <div className="stat">
          <span className="stat-label">Used</span>
          <span className="stat-value">
            {formatTokens(totalTokensUsed)} tokens
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Available</span>
          <span className="stat-value available">
            {formatTokens(availableTokens)} tokens
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Total</span>
          <span className="stat-value">
            {formatTokens(contextWindowSize)} tokens
          </span>
        </div>
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(percentageUsed, 100)}%`,
                backgroundColor:
                  percentageUsed > 80
                    ? "#ef4444"
                    : percentageUsed > 60
                    ? "#f59e0b"
                    : "#22c55e",
              }}
            />
          </div>
          <span className="progress-text">
            {percentageUsed.toFixed(1)}% used
          </span>
        </div>
      </div>

      {addedElements.length > 0 && (
        <div className="added-elements">
          <h3>Added Elements</h3>
          <div className="elements-list">
            {addedElements.map((el) => (
              <div
                key={el.instanceId}
                className="added-element"
                onClick={() => onRemoveElement(el.instanceId)}
              >
                <div
                  className="element-color"
                  style={{ backgroundColor: el.color }}
                />
                <span className="element-label">{el.name}</span>
                <span className="element-remove">×</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
