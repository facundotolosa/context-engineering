import { useState, useEffect, useCallback } from "react";
import "./ContextWindowSlide.css";

export function ContextWindowSlide() {
  const [step, setStep] = useState(0);
  const totalSteps = 5;

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

  return (
    <div className="context-window-slide">
      {/* Key Takeaway - at the top */}
      <div className={`takeaway-section top ${step >= 4 ? "visible" : ""}`}>
        <div className="takeaway-quote">
          <span className="quote-mark">"</span>
          <span className="quote-text">Context Engineering</span>
          <span className="quote-mark">"</span>
        </div>
        <p className="takeaway-explanation">
          Can be seen as the art of providing the{" "}
          <strong>necessary context</strong> for a specific task.
          <br />
          Not too much, not too little.
        </p>
      </div>

      {/* Main Card */}
      <div className="cw-card-container">
        <div className={`cw-card ${step >= 1 ? "expanded" : ""}`}>
          <div className="card-header">
            <div className="card-icon cw-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </div>
            <h3 className="card-title cw-title">Context Window</h3>
          </div>

          <div className="card-content">
            <div className="card-content-inner">
              <p className="cw-analogy">
                The <strong>capacity</strong> of an LLM to process a certain
                amount of information without <strong>getting lost</strong>.
              </p>

              <div className="cw-visual">
                <div className="cw-container">
                  <div
                    className="cw-fill"
                    style={{
                      height:
                        step >= 3
                          ? "12%"
                          : step >= 2
                          ? "95%"
                          : step >= 1
                          ? "50%"
                          : "0%",
                    }}
                  ></div>
                  <div className="cw-label">Context</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Cards */}
      <div className="cw-warnings">
        <div className={`cw-warning too-much ${step >= 2 ? "visible" : ""}`}>
          <div className="warning-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div className="warning-content">
            <span className="warning-title">Too much context</span>
            <span className="warning-desc">
              The model gets lost, degraded results
            </span>
          </div>
        </div>

        <div className={`cw-warning too-little ${step >= 3 ? "visible" : ""}`}>
          <div className="warning-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="warning-content">
            <span className="warning-title">Too little context</span>
            <span className="warning-desc">
              Missing information, hallucinations
            </span>
          </div>
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
