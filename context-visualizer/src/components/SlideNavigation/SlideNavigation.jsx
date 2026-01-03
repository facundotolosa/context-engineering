import './SlideNavigation.css';

const SLIDES = [
  { id: 'comparison', title: 'Prompt vs Context Engineering' },
  { id: 'context-window', title: 'Context Window' },
  { id: 'lost-in-middle', title: 'Lost in the Middle' },
  { id: 'visualizer', title: 'Context Window Visualizer' },
  { id: 'rpi-flow', title: 'Research → Plan → Implement' },
  { id: 'error-cascade', title: 'Error Cascade' },
];

export function SlideNavigation({ currentSlide, onSlideChange }) {
  const currentIndex = SLIDES.findIndex(s => s.id === currentSlide);
  
  const goToPrevious = () => {
    if (currentIndex > 0) {
      onSlideChange(SLIDES[currentIndex - 1].id);
    }
  };
  
  const goToNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      onSlideChange(SLIDES[currentIndex + 1].id);
    }
  };

  return (
    <div className="slide-navigation">
      <button 
        className="nav-arrow nav-prev" 
        onClick={goToPrevious}
        disabled={currentIndex === 0}
        aria-label="Previous slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      <div className="slide-info">
        <div className="slide-dots">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              className={`slide-dot ${currentSlide === slide.id ? 'active' : ''}`}
              onClick={() => onSlideChange(slide.id)}
              aria-label={`Go to ${slide.title}`}
            />
          ))}
        </div>
      </div>
      
      <button 
        className="nav-arrow nav-next" 
        onClick={goToNext}
        disabled={currentIndex === SLIDES.length - 1}
        aria-label="Next slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
}

export { SLIDES };

