import { useState, useEffect, useCallback } from "react";
import "./ComparisonSlide.css";

export function ComparisonSlide() {
  const [step, setStep] = useState(0);
  const totalSteps = 4;

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
    <div className="comparison-slide">
      {/* Key Takeaway - at the top */}
      <div className={`takeaway-section top ${step >= 3 ? "visible" : ""}`}>
        <div className="takeaway-quote">
          <span className="quote-mark">"</span>
          <span className="quote-text">Garbage In, Garbage Out</span>
          <span className="quote-mark">"</span>
        </div>
        <p className="takeaway-explanation">
          If irrelevant information is in the context, the best system in the
          world won't prevent hallucinations.
          <br />
        </p>
      </div>

      <div className="comparison-cards">
        {/* Prompt Engineering Card */}
        <div
          className={`comparison-card prompt-card ${
            step >= 1 ? "expanded" : ""
          }`}
        >
          <div className="card-header">
            <div className="card-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <h3 className="card-title">Prompt Engineering</h3>
          </div>

          <div className="card-content">
            <div className="card-content-inner">
              <p className="card-focus">
                Focuses on <strong>HOW</strong> you ask
              </p>

              <ul className="card-points">
                <li>
                  <span className="point-icon">-</span>
                  <span>Structure, keywords, techniques</span>
                </li>
                <li>
                  <span className="point-icon">-</span>
                  <span>Chain-of-Thought, few-shot examples</span>
                </li>
                <li>
                  <span className="point-icon">-</span>
                  <span>Optimizes communication with the model</span>
                </li>
              </ul>

              <div className="card-example">
                <code>
                  "Please think step by step and analyze this code carefully..."
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Plus Divider */}
        <div className="plus-divider">
          <span className="plus-text">+</span>
        </div>

        {/* Context Engineering Card */}
        <div
          className={`comparison-card context-card ${
            step >= 2 ? "expanded" : ""
          }`}
        >
          <div className="card-header">
            <div className="card-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <h3 className="card-title">Context Engineering</h3>
          </div>

          <div className="card-content">
            <div className="card-content-inner">
              <p className="card-focus">
                Focuses on <strong>WHAT</strong> information you provide
              </p>

              <ul className="card-points">
                <li>
                  <span className="point-icon">-</span>
                  <span>Relevant files, documentation, examples</span>
                </li>
                <li>
                  <span className="point-icon">-</span>
                  <span>Curating the right information</span>
                </li>
                <li>
                  <span className="point-icon">-</span>
                  <span>Building the model's understanding</span>
                </li>
              </ul>

              <div className="card-example">
                <code>@file.ts @docs.md @similar-impl.ts + clear intent</code>
              </div>
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
