import { useState, useEffect, useCallback } from "react";
import "./RPIFlowSlide.css";

export function RPIFlowSlide() {
  const [step, setStep] = useState(0);
  const totalSteps = 11;

  const nextStep = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }, []);

  const prevStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 0));
  }, []);

  // Keyboard navigation for steps (arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextStep();
      } else if (e.key === "ArrowLeft") {
        prevStep();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextStep, prevStep]);

  // Steps:
  // 0: Solo los 3 círculos (Research, Plan, Implement)
  // 1: Research Document + arrow
  // 2: Human Review for Research
  // 3: Revisions for Research
  // 4: Implementation Plan + arrow
  // 5: Human Review for Planning
  // 6: Revisions for Planning
  // 7: Clean Code + arrow
  // 8: Human Review for Implementation
  // 9: Revisions for Implementation
  // 10: Takeaway

  return (
    <div className="rpi-flow-slide">
      {/* Key Takeaway - at the top */}
      <div className={`takeaway-section top ${step >= 10 ? "visible" : ""}`}>
        <div className="takeaway-quote">
          <span className="quote-mark">"</span>
          <span className="quote-text">Research, plan, implement</span>
          <span className="quote-mark">"</span>
        </div>
        <p className="takeaway-explanation">
          Each phase must be <strong>validated</strong> before moving forward.
          <br />
          The cost of fixing increases <strong>exponentially</strong> in each
          phase.
        </p>
      </div>

      {/* RPI Flow Diagram */}
      <div className="rpi-diagram">
        {/* Phase 1: Research */}
        <div className="rpi-row visible">
          <div className="phase-diamond">
            <div className="diamond-content">
              <span className="phase-name">Research</span>
            </div>
          </div>

          <svg
            className={`connector-arrow ${step >= 1 ? "visible" : ""}`}
            viewBox="0 0 80 24"
          >
            <path
              d="M0 12 L65 12 M55 6 L65 12 L55 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>

          <div className={`artifact-box ${step >= 1 ? "visible" : ""}`}>
            <span className="artifact-title">Research</span>
            <span className="artifact-title">Document</span>
          </div>

          <svg
            className={`connector-arrow ${step >= 2 ? "visible" : ""}`}
            viewBox="0 0 80 24"
          >
            <path
              d="M0 12 L65 12 M55 6 L65 12 L55 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>

          <div className={`review-diamond ${step >= 2 ? "visible" : ""}`}>
            <div className="review-content">
              <span className="review-title">Human</span>
              <span className="review-title">Review</span>
            </div>
          </div>

          {/* Revision arrow - from Human Review back to artifact */}
          <svg
            className={`revision-loop ${step >= 3 ? "visible" : ""}`}
            viewBox="0 0 206 60"
          >
            <defs>
              <marker
                id="arrowhead1"
                markerWidth="8"
                markerHeight="8"
                refX="4"
                refY="4"
                orient="auto"
              >
                <path d="M0 0 L8 4 L0 8 L2 4 Z" fill="currentColor" />
              </marker>
            </defs>
            <path
              d="M206 8 L206 45 Q206 55 196 55 L10 55 Q0 55 0 45 L0 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead1)"
            />
            <text x="103" y="48" className="revision-label">
              Revisions
            </text>
          </svg>
        </div>

        {/* Phase 2: Planning */}
        <div className="rpi-row visible">
          <div className="phase-diamond">
            <div className="diamond-content">
              <span className="phase-name">Plan</span>
            </div>
          </div>

          <svg
            className={`connector-arrow ${step >= 4 ? "visible" : ""}`}
            viewBox="0 0 80 24"
          >
            <path
              d="M0 12 L65 12 M55 6 L65 12 L55 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>

          <div className={`artifact-box ${step >= 4 ? "visible" : ""}`}>
            <span className="artifact-title">Implementation</span>
            <span className="artifact-title">Plan</span>
          </div>

          <svg
            className={`connector-arrow ${step >= 5 ? "visible" : ""}`}
            viewBox="0 0 80 24"
          >
            <path
              d="M0 12 L65 12 M55 6 L65 12 L55 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>

          <div className={`review-diamond ${step >= 5 ? "visible" : ""}`}>
            <div className="review-content">
              <span className="review-title">Human</span>
              <span className="review-title">Review</span>
            </div>
          </div>

          {/* Revision arrow - from Human Review back to artifact */}
          <svg
            className={`revision-loop ${step >= 6 ? "visible" : ""}`}
            viewBox="0 0 206 60"
          >
            <defs>
              <marker
                id="arrowhead2"
                markerWidth="8"
                markerHeight="8"
                refX="4"
                refY="4"
                orient="auto"
              >
                <path d="M0 0 L8 4 L0 8 L2 4 Z" fill="currentColor" />
              </marker>
            </defs>
            <path
              d="M206 8 L206 45 Q206 55 196 55 L10 55 Q0 55 0 45 L0 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead2)"
            />
            <text x="103" y="48" className="revision-label">
              Revisions
            </text>
          </svg>
        </div>

        {/* Phase 3: Implementation */}
        <div className="rpi-row visible">
          <div className="phase-diamond">
            <div className="diamond-content">
              <span className="phase-name">Implement</span>
            </div>
          </div>

          <svg
            className={`connector-arrow ${step >= 7 ? "visible" : ""}`}
            viewBox="0 0 80 24"
          >
            <path
              d="M0 12 L65 12 M55 6 L65 12 L55 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>

          <div className={`artifact-box ${step >= 7 ? "visible" : ""}`}>
            <span className="artifact-title">Clean Code</span>
          </div>

          <svg
            className={`connector-arrow ${step >= 8 ? "visible" : ""}`}
            viewBox="0 0 80 24"
          >
            <path
              d="M0 12 L65 12 M55 6 L65 12 L55 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>

          <div className={`review-diamond ${step >= 8 ? "visible" : ""}`}>
            <div className="review-content">
              <span className="review-title">Human</span>
              <span className="review-title">Review</span>
            </div>
          </div>

          {/* Revision arrow - from Human Review back to artifact */}
          <svg
            className={`revision-loop ${step >= 9 ? "visible" : ""}`}
            viewBox="0 0 206 60"
          >
            <defs>
              <marker
                id="arrowhead3"
                markerWidth="8"
                markerHeight="8"
                refX="4"
                refY="4"
                orient="auto"
              >
                <path d="M0 0 L8 4 L0 8 L2 4 Z" fill="currentColor" />
              </marker>
            </defs>
            <path
              d="M206 8 L206 45 Q206 55 196 55 L10 55 Q0 55 0 45 L0 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead3)"
            />
            <text x="103" y="48" className="revision-label">
              Revisions
            </text>
          </svg>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="step-navigation">
        <button className="step-btn" onClick={prevStep} disabled={step === 0}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className="step-indicators">
          {[...Array(totalSteps)].map((_, i) => (
            <button
              key={i}
              className={`step-dot ${step >= i ? "active" : ""}`}
              onClick={() => setStep(i)}
            />
          ))}
        </div>

        <button
          className="step-btn"
          onClick={nextStep}
          disabled={step === totalSteps - 1}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
