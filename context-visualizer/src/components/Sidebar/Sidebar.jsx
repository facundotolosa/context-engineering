import { getElementsByCategory, CATEGORY_LABELS } from "../../data/elements";
import { DraggableElement } from "../DraggableElement/DraggableElement";
import "./Sidebar.css";

export function Sidebar({ compactedSummaries = [] }) {
  const elementsByCategory = getElementsByCategory();

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {Object.entries(elementsByCategory).map(([category, elements]) => (
          <div key={category} className="element-category">
            <h3 className="category-title">{CATEGORY_LABELS[category]}</h3>
            <div className="category-elements">
              {elements.map((element) => (
                <DraggableElement key={element.id} element={element} />
              ))}
            </div>
          </div>
        ))}

        {compactedSummaries.length > 0 && (
          <div className="element-category">
            <h3 className="category-title">Compacted Summaries</h3>
            <div className="category-elements">
              {compactedSummaries.map((element) => (
                <DraggableElement key={element.id} element={element} />
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
