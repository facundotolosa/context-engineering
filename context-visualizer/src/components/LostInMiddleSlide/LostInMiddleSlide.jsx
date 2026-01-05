import { useState, useEffect, useCallback, useRef } from "react";
import "./LostInMiddleSlide.css";

// Sample conversation messages that will be added step by step
const CONVERSATION_MESSAGES = [
  {
    role: "user",
    content: "Can you help me refactor the authentication module?",
  },
  {
    role: "assistant",
    content:
      "Of course! I'll analyze the auth module structure and suggest improvements for better security and maintainability.",
  },
  {
    role: "user",
    content:
      "The current implementation uses JWT tokens but they expire too quickly.",
  },
  {
    role: "assistant",
    content:
      "I see. We should implement refresh tokens alongside the access tokens. This way, users won't need to re-authenticate frequently.",
  },
  {
    role: "user",
    content: "Also, the password validation is pretty basic right now.",
  },
  {
    role: "assistant",
    content:
      "Let's add comprehensive password validation: minimum 12 characters, uppercase, lowercase, numbers, and special characters.",
  },
  {
    role: "user",
    content: "What about rate limiting for login attempts?",
  },
  {
    role: "assistant",
    content:
      "Great point! We should implement exponential backoff: 3 failed attempts = 1 min lockout, 5 = 5 min, 10 = 30 min lockout.",
  },
  {
    role: "user",
    content: "I also need to add OAuth support for Google and GitHub.",
  },
  {
    role: "assistant",
    content:
      "For OAuth, we'll use passport.js strategies. I'll set up the callback routes and handle token exchange securely.",
  },
  {
    role: "user",
    content: "Perfect. Now let's also add two-factor authentication.",
  },
  {
    role: "assistant",
    content:
      "For 2FA, I recommend TOTP using speakeasy library. Users can scan a QR code with their authenticator app.",
  },
  {
    role: "user",
    content: "One more thing - we need session management with Redis.",
  },
  {
    role: "assistant",
    content:
      "I'll configure express-session with Redis store. This enables session persistence across server restarts and horizontal scaling.",
  },
];

export function LostInMiddleSlide() {
  const [step, setStep] = useState(0);
  const [enteredMessages, setEnteredMessages] = useState(new Set([0]));
  const prevStepRef = useRef(0);
  const messagesEndRef = useRef(null);

  // Each step adds one message, last step shows takeaway
  // Steps 0-13: Show 1-14 messages
  // Step 14: Show takeaway
  const totalSteps = 15;

  // Calculate how many messages to show based on step
  const getVisibleMessages = () => {
    const messageCount = Math.min(step + 1, 14);
    return CONVERSATION_MESSAGES.slice(0, messageCount);
  };

  // Mark new messages as entered after animation
  useEffect(() => {
    if (step > prevStepRef.current) {
      // Moving forward - animate the new message
      const newMessageIndex = Math.min(step, 13);
      const timer = setTimeout(() => {
        setEnteredMessages((prev) => new Set([...prev, newMessageIndex]));
      }, 50);
      return () => clearTimeout(timer);
    } else if (step < prevStepRef.current) {
      // Moving backward - remove from entered set
      setEnteredMessages((prev) => {
        const next = new Set(prev);
        for (let i = step + 1; i <= 13; i++) {
          next.delete(i);
        }
        return next;
      });
    }
    prevStepRef.current = step;
  }, [step]);

  // Scroll to bottom when new messages are added (after animation completes)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 500); // Wait for message expand animation to complete
    return () => clearTimeout(timer);
  }, [step]);

  // Calculate blur/opacity for each message based on position
  const getMessageStyle = (index, totalMessages) => {
    // If we have 4 or fewer messages, no blur
    if (totalMessages <= 4) {
      return { opacity: 1, filter: "blur(0px)" };
    }

    // Calculate attention based on position
    // First 2 messages: high attention (primacy)
    // Last 2 messages: high attention (recency)
    // Middle messages: low attention

    const primacyZone = 2;
    const recencyZone = totalMessages - 2;

    if (index < primacyZone) {
      // Primacy - first messages get full attention
      return { opacity: 1, filter: "blur(0px)" };
    } else if (index >= recencyZone) {
      // Recency - last messages get full attention
      return { opacity: 1, filter: "blur(0px)" };
    } else {
      // Middle - gets "lost"
      // Calculate how "deep" in the middle this message is
      const middleStart = primacyZone;
      const middleEnd = recencyZone;
      const middleLength = middleEnd - middleStart;
      const positionInMiddle = index - middleStart;

      // Messages closer to the center are more blurred
      const centerDistance =
        Math.abs(positionInMiddle - middleLength / 2) / (middleLength / 2);
      const blurFactor = 1 - centerDistance; // 0 at edges, 1 at center

      // Scale blur based on total messages (more messages = more blur)
      const maxBlur = Math.min(4, (totalMessages - 4) * 0.5);
      const blur = blurFactor * maxBlur;

      // Opacity decreases for middle messages
      const opacity = 0.3 + centerDistance * 0.4;

      return {
        opacity,
        filter: `blur(${blur}px)`,
      };
    }
  };

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

  const visibleMessages = getVisibleMessages();

  return (
    <div className="lost-in-middle-slide">
      {/* Key Takeaway - at the top */}
      <div className={`takeaway-section top ${step >= 14 ? "visible" : ""}`}>
        <div className="takeaway-quote">
          <span className="quote-mark">"</span>
          <span className="quote-text">Lost in the Middle</span>
          <span className="quote-mark">"</span>
        </div>
        <p className="takeaway-explanation">
          In long conversations, the model loses focus on middle messages.
          <br />
          It prioritizes the <strong>beginning</strong> and <strong>end</strong>{" "}
          of the conversation.
        </p>
      </div>

      {/* Main Content */}
      <div className="lost-in-middle-content">
        {/* Conversation Container */}
        <div className="conversation-container">
          <div className="conversation-header">
            <div className="conversation-title">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>Conversation ({visibleMessages.length} messages)</span>
            </div>
          </div>

          <div className="messages-wrapper">
            <div className="messages-list">
              {visibleMessages.map((msg, index) => {
                const style = getMessageStyle(index, visibleMessages.length);
                const isLost =
                  visibleMessages.length > 4 &&
                  index >= 2 &&
                  index < visibleMessages.length - 2;
                const isEntered = enteredMessages.has(index);
                const isNew =
                  index === visibleMessages.length - 1 && !isEntered;

                return (
                  <div
                    key={index}
                    className={`message-enter-wrapper ${
                      isEntered || index === 0 ? "entered" : ""
                    }`}
                  >
                    <div className="message-row">
                      <div
                        className={`message ${msg.role} ${
                          isLost ? "lost" : ""
                        }`}
                        style={{
                          opacity: isNew ? undefined : style.opacity,
                          filter: isNew ? undefined : style.filter,
                        }}
                      >
                        <div className="message-avatar">
                          {msg.role === "user" ? (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                          ) : (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                              <circle cx="8" cy="14" r="1" />
                              <circle cx="16" cy="14" r="1" />
                            </svg>
                          )}
                        </div>
                        <div className="message-content">
                          <span className="message-role">
                            {msg.role === "user" ? "You" : "Assistant"}
                          </span>
                          <p className="message-text">{msg.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
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
