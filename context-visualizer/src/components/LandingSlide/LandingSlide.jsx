import { useState } from "react";
import "./LandingSlide.css";

export function LandingSlide({ onGetStarted }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleGetStarted = () => {
    setIsExiting(true);
    setTimeout(() => {
      onGetStarted();
    }, 600);
  };

  return (
    <div className={`landing-slide ${isExiting ? "exiting" : ""}`}>
      <div className="landing-content">
        <h1 className="landing-title">
          <span className="title-gradient">Context</span>
          <span className="title-white">Engineering</span>
        </h1>
        <p className="landing-subtitle">
          Advanced techniques for effective context window management
        </p>
        <button
          className="get-started-btn"
          onClick={handleGetStarted}
          disabled={isExiting}
        >
          <span>Get Started</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>

      <div className="landing-decoration">
        <div className="deco-ring deco-ring-1"></div>
        <div className="deco-ring deco-ring-2"></div>
        <div className="deco-ring deco-ring-3"></div>
        <div className="deco-glow"></div>
      </div>

      <div className="landing-grid"></div>
    </div>
  );
}
