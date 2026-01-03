import { useState, useEffect, useCallback } from "react";
import "./ErrorCascadeSlide.css";

export function ErrorCascadeSlide() {
  const [step, setStep] = useState(0);
  const totalSteps = 8;

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
    <div className="error-cascade-slide">
      {/* Key Takeaway - at the top */}
      <div className={`takeaway-section top ${step >= 7 ? "visible" : ""}`}>
        <div className="takeaway-quote">
          <span className="quote-mark">"</span>
          <span className="quote-text">Research &gt; Plan &gt; Implement</span>
          <span className="quote-mark">"</span>
        </div>
        <p className="takeaway-explanation">
          A bad <strong>research</strong> destroys the entire flow.
          <br />
          A bad <strong>plan</strong> ruins the implementation.
          <br />
          A bad <strong>code</strong> is just one line.
        </p>
      </div>

      {/* Error Cascade Diagram */}
      <div className="cascade-container">
        {/* Column Headers */}
        <div className="cascade-headers">
          <div className={`cascade-header ${step >= 0 ? "visible" : ""}`}>
            <span className="header-text">Research</span>
          </div>
          <div className={`cascade-header ${step >= 0 ? "visible" : ""}`}>
            <span className="header-text">Plan</span>
          </div>
          <div className={`cascade-header ${step >= 0 ? "visible" : ""}`}>
            <span className="header-text">Code</span>
          </div>
        </div>

        {/* Cascade Columns */}
        <div className="cascade-columns">
          {/* Research Column */}
          <div className={`cascade-column research-col ${step >= 0 ? "visible" : ""}`}>
            <div className={`cascade-item bad ${step >= 4 ? "visible" : ""}`}>
              <span>bad research</span>
            </div>
            <div className={`cascade-item good ${step >= 1 ? "visible" : ""}`}>
              <span>good research</span>
            </div>
          </div>

          {/* Connections: Research to Plan */}
          <svg className="cascade-connections" viewBox="0 0 100 400">
            {/* Good research -> Good plan */}
            <path 
              className={`connection-line good-line ${step >= 2 ? "visible" : ""}`}
              d="M0 280 Q50 280 100 80"
            />
            {/* Bad research -> Bad plan 1 */}
            <path 
              className={`connection-line bad-line ${step >= 5 ? "visible" : ""}`}
              d="M0 80 Q50 80 100 160"
            />
            {/* Bad research -> Bad plan 2 */}
            <path 
              className={`connection-line bad-line ${step >= 5 ? "visible" : ""}`}
              d="M0 80 Q50 120 100 300"
            />
          </svg>

          {/* Plan Column */}
          <div className={`cascade-column plan-col ${step >= 0 ? "visible" : ""}`}>
            <div className={`cascade-item good ${step >= 2 ? "visible" : ""}`}>
              <span>good plan</span>
            </div>
            <div className={`cascade-item bad ${step >= 5 ? "visible" : ""}`}>
              <span>bad plan</span>
            </div>
            <div className={`cascade-item bad large ${step >= 5 ? "visible" : ""}`}>
              <span>bad plan</span>
            </div>
          </div>

          {/* Connections: Plan to Code */}
          <svg className="cascade-connections" viewBox="0 0 100 400">
            {/* Good plan -> Good code */}
            <path 
              className={`connection-line good-line ${step >= 3 ? "visible" : ""}`}
              d="M0 80 Q50 80 100 80"
            />
            {/* Bad plan 1 -> Bad code */}
            <path 
              className={`connection-line bad-line ${step >= 6 ? "visible" : ""}`}
              d="M0 160 Q50 180 100 220"
            />
            {/* Bad plan 2 -> Bad code */}
            <path 
              className={`connection-line bad-line ${step >= 6 ? "visible" : ""}`}
              d="M0 300 Q50 280 100 260"
            />
          </svg>

          {/* Code Column */}
          <div className={`cascade-column code-col ${step >= 0 ? "visible" : ""}`}>
            <div className={`cascade-item good ${step >= 3 ? "visible" : ""}`}>
              <span>good code</span>
            </div>
            <div className={`cascade-item bad extra-large ${step >= 6 ? "visible" : ""}`}>
              <span>bad code</span>
            </div>
            <div className={`cascade-item good small ${step >= 3 ? "visible" : ""}`}>
              <span>good code</span>
            </div>
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

