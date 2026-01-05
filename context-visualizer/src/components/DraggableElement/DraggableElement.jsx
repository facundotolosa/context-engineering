import { useDraggable } from '@dnd-kit/core';
import './DraggableElement.css';

export function DraggableElement({ element }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: element.id,
    data: element
  });
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`draggable-element ${isDragging ? 'dragging' : ''}`}
      {...listeners}
      {...attributes}
    >
      <div 
        className="element-indicator" 
        style={{ backgroundColor: element.color }}
      />
      <div className="element-content">
        <span className="element-name">{element.name}</span>
        <span className="element-tokens">{element.tokens.toLocaleString()} tokens</span>
      </div>
    </div>
  );
}


