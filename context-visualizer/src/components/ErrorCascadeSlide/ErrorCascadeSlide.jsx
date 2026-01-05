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
          An error while <strong>researching</strong> destroys the entire flow.
          <br />A mistake in <strong>planning</strong> ruins the implementation.
          <br />
          Something wrong while <strong>implementing</strong> can be easily
          fixed.
        </p>
      </div>

      {/* Error Cascade Diagram */}
      <div className="cascade-diagram">
        {/* Column Headers */}
        <div className="cascade-headers">
          <div className="cascade-header visible">
            <span className="header-text">Research</span>
          </div>
          <div className="header-spacer" />
          <div className="cascade-header visible">
            <span className="header-text">Plan</span>
          </div>
          <div className="header-spacer" />
          <div className="cascade-header visible">
            <span className="header-text">Implement</span>
          </div>
        </div>

        {/* Main Diagram Area */}
        <div className="cascade-content">
          {/* Research Column */}
          <div className="cascade-column">
            {/* Steps 1-5: good research (30% height) */}
            {step >= 1 && step <= 5 && (
              <div className="cascade-item good size-30 visible">
                <span>good research</span>
              </div>
            )}

            {/* Step 6: Split research into good/bad/good */}
            {step >= 6 && (
              <>
                <div className="cascade-item good size-12 visible">
                  <span>good research</span>
                </div>
                <div className="cascade-item bad size-5 visible">
                  <span>bad research</span>
                </div>
                <div className="cascade-item good size-12 visible">
                  <span>good research</span>
                </div>
              </>
            )}
          </div>

          {/* Connection Area 1 (Research -> Plan) */}
          <div className="cascade-connector">
            <svg
              className="connector-svg"
              viewBox="-80 0 240 100"
              preserveAspectRatio="none"
            >
              {/* Steps 2-5: single good research -> good plan */}
              {step >= 2 && step <= 5 && (
                <>
                  <line
                    className="connection-line good-line visible"
                    x1="0"
                    y1="15"
                    x2="80"
                    y2="5"
                  />
                  <line
                    className="connection-line good-line visible"
                    x1="0"
                    y1="15"
                    x2="80"
                    y2="58"
                  />
                </>
              )}

              {/* Step 6: split research -> split plan (6 lines) */}
              {step >= 6 && (
                <>
                  {/* good research top (center ~6) -> good plan top (2-16) */}
                  <line
                    className="connection-line good-line visible"
                    x1="0"
                    y1="6"
                    x2="80"
                    y2="3"
                  />
                  <line
                    className="connection-line good-line visible"
                    x1="0"
                    y1="6"
                    x2="80"
                    y2="16"
                  />

                  {/* bad research (center ~17) -> bad plan (23-38) */}
                  <line
                    className="connection-line bad-line visible"
                    x1="0"
                    y1="17"
                    x2="80"
                    y2="23"
                  />
                  <line
                    className="connection-line bad-line visible"
                    x1="0"
                    y1="17"
                    x2="80"
                    y2="38"
                  />

                  {/* good research bottom (center ~29) -> good plan bottom (42-55) */}
                  <line
                    className="connection-line good-line visible"
                    x1="0"
                    y1="29"
                    x2="80"
                    y2="42"
                  />
                  <line
                    className="connection-line good-line visible"
                    x1="0"
                    y1="29"
                    x2="80"
                    y2="55"
                  />
                </>
              )}
            </svg>
          </div>

          {/* Plan Column */}
          <div className="cascade-column">
            {/* Steps 2-4: good plan (60% height) */}
            {step >= 2 && step <= 4 && (
              <div className="cascade-item good size-60 visible">
                <span>good plan</span>
              </div>
            )}

            {/* Step 5: Split plan into good/bad/good (small bad) */}
            {step === 5 && (
              <>
                <div className="cascade-item good size-27 visible">
                  <span>good plan</span>
                </div>
                <div className="cascade-item bad size-5 visible">
                  <span>bad plan</span>
                </div>
                <div className="cascade-item good size-27 visible">
                  <span>good plan</span>
                </div>
              </>
            )}

            {/* Step 6: Split plan with BIGGER bad plan (cascade from bad research) */}
            {step >= 6 && (
              <>
                <div className="cascade-item good size-18 visible">
                  <span>good plan</span>
                </div>
                <div className="cascade-item bad size-19 visible">
                  <span>bad plan</span>
                </div>
                <div className="cascade-item good size-18 visible">
                  <span>good plan</span>
                </div>
              </>
            )}
          </div>

          {/* Connection Area 2 (Plan -> Implement) */}
          <div className="cascade-connector">
            <svg
              className="connector-svg"
              viewBox="-80 0 240 100"
              preserveAspectRatio="none"
            >
              {/* Steps 3-4: single good plan -> good code */}
              {step >= 3 && step <= 4 && (
                <>
                  <line
                    className="connection-line good-line visible"
                    x1="0"
                    y1="30"
                    x2="80"
                    y2="5"
                  />
                  <line
                    className="connection-line good-line visible"
                    x1="0"
                    y1="30"
                    x2="80"
                    y2="92"
                  />
                </>
              )}

              {/* Step 5: split plan -> split code (6 lines) */}
              {step === 5 && (
                <>
                  {/* good plan top -> good code top */}
                  <line
                    className="connection-line good-line visible"
                    x1="0"
                    y1="14"
                    x2="80"
                    y2="5"
                  />
                  <line
                    className="connection-line good-line visible"
                    x1="0"
                    y1="14"
                    x2="80"
                    y2="23"
                  />
                  {/* bad plan -> bad code */}
                  <line
                    className="connection-line bad-line visible"
                    x1="0"
                    y1="32"
                    x2="80"
                    y2="30"
                  />
                  <line
                    className="connection-line bad-line visible"
                    x1="0"
                    y1="32"
                    x2="80"
                    y2="46"
                  />
                  {/* good plan bottom -> good code bottom */}
                  <line
                    className="connection-line good-line visible"
                    x1="0"
                    y1="50"
                    x2="80"
                    y2="50"
                  />
                  <line
                    className="connection-line good-line visible"
                    x1="0"
                    y1="50"
                    x2="80"
                    y2="70"
                  />
                </>
              )}

              {/* Step 6: bigger bad plan -> even bigger bad code (6 lines) */}
              {step >= 6 && (
                <>
                  {/* good plan top (center ~9) -> good code top (2-24) */}
                  <line
                    className="connection-line good-line visible"
                    x1="0"
                    y1="9"
                    x2="80"
                    y2="3"
                  />
                  <line
                    className="connection-line good-line visible"
                    x1="0"
                    y1="9"
                    x2="80"
                    y2="24"
                  />
                  {/* bad plan (center ~31) -> bad code (31-66) */}
                  <line
                    className="connection-line bad-line visible"
                    x1="0"
                    y1="31"
                    x2="80"
                    y2="31"
                  />
                  <line
                    className="connection-line bad-line visible"
                    x1="0"
                    y1="31"
                    x2="80"
                    y2="66"
                  />
                  {/* good plan bottom (center ~52) -> good code bottom (70-90) */}
                  <line
                    className="connection-line good-line visible"
                    x1="0"
                    y1="52"
                    x2="80"
                    y2="70"
                  />
                  <line
                    className="connection-line good-line visible"
                    x1="0"
                    y1="52"
                    x2="80"
                    y2="90"
                  />
                </>
              )}
            </svg>
          </div>

          {/* Implement Column */}
          <div className="cascade-column">
            {/* Step 3: good code (100% height) - only shown at step 3 */}
            {step === 3 && (
              <div className="cascade-item good size-100 visible">
                <span>good code</span>
              </div>
            )}

            {/* Step 4: Split into good/bad/good (small bad) */}
            {step === 4 && (
              <>
                <div className="cascade-item good size-45 visible">
                  <span>good code</span>
                </div>
                <div className="cascade-item bad size-5 visible">
                  <span>bad code</span>
                </div>
                <div className="cascade-item good size-45 visible">
                  <span>good code</span>
                </div>
              </>
            )}

            {/* Step 5: Split with bigger bad code */}
            {step === 5 && (
              <>
                <div className="cascade-item good size-25 visible">
                  <span>good code</span>
                </div>
                <div className="cascade-item bad size-20 visible">
                  <span>bad code</span>
                </div>
                <div className="cascade-item good size-25 visible">
                  <span>good code</span>
                </div>
              </>
            )}

            {/* Step 6: Split with HUGE bad code (cascade from bad research) */}
            {step >= 6 && (
              <>
                <div className="cascade-item good size-26 visible">
                  <span>good code</span>
                </div>
                <div className="cascade-item bad size-39 visible">
                  <span>bad code</span>
                </div>
                <div className="cascade-item good size-26 visible">
                  <span>good code</span>
                </div>
              </>
            )}
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
