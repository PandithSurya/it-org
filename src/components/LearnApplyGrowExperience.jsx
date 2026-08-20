import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LearnApplyGrowExperience.css';

const TOTAL_FRAMES = 80;

export default function LearnApplyGrowExperience() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Preload split-video2 80 frames
  useEffect(() => {
    const loadedImages = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/split-video2/ffout${frameNum}.gif`;
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  // Canvas drawing & frame scrubbing on vertical scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame();
    };

    const renderFrame = () => {
      if (!containerRef.current || imagesRef.current.length === 0) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height - window.innerHeight;
      const scrolled = -rect.top;

      let progress = scrolled / containerHeight;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(progress * TOTAL_FRAMES)
      );

      const currentImg = imagesRef.current[frameIndex];
      if (currentImg && currentImg.complete && currentImg.naturalWidth !== 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Aspect Cover Scaling
        const imgRatio = currentImg.naturalWidth / currentImg.naturalHeight;
        const canvasRatio = canvas.width / canvas.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        ctx.drawImage(currentImg, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    window.addEventListener('resize', updateCanvasSize);
    window.addEventListener('scroll', renderFrame, { passive: true });

    updateCanvasSize();
    renderFrame();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('scroll', renderFrame);
    };
  }, []);

  // Section 1: LEARN (0.0 to 0.35)
  const calcSection1Style = () => {
    const start = 0.04;
    const peakStart = 0.12;
    const peakEnd = 0.25;
    const end = 0.35;

    let opacity = 0;
    let translateY = 40;

    if (scrollProgress >= start && scrollProgress < peakStart) {
      const p = (scrollProgress - start) / (peakStart - start);
      opacity = p;
      translateY = 40 * (1 - p);
    } else if (scrollProgress >= peakStart && scrollProgress <= peakEnd) {
      opacity = 1;
      translateY = 0;
    } else if (scrollProgress > peakEnd && scrollProgress <= end) {
      const p = (scrollProgress - peakEnd) / (end - peakEnd);
      opacity = 1 - p;
      translateY = -40 * p;
    }

    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0)`,
      pointerEvents: opacity > 0.2 ? 'auto' : 'none'
    };
  };

  // Section 2: APPLY (0.35 to 0.68) - Kinetic Flying Letters
  const calcLetterStyle = (charIndex, totalChars) => {
    const inStart = 0.36;
    const inSpan = 0.10;
    const outStart = 0.54;
    const outSpan = 0.10;

    const charFrac = charIndex / Math.max(1, totalChars);
    const charInStart = inStart + charFrac * (inSpan * 0.5);
    const charOutStart = outStart + charFrac * (outSpan * 0.5);

    let opacity = 0;
    let translateY = 30;
    let rotate = 8;

    if (scrollProgress >= charInStart && scrollProgress < charInStart + 0.08) {
      const p = (scrollProgress - charInStart) / 0.08;
      opacity = Math.min(1, Math.max(0, p));
      translateY = 30 * (1 - p);
      rotate = 8 * (1 - p);
    } else if (scrollProgress >= charInStart + 0.08 && scrollProgress < charOutStart) {
      opacity = 1;
      translateY = 0;
      rotate = 0;
    } else if (scrollProgress >= charOutStart) {
      const p = (scrollProgress - charOutStart) / 0.08;
      opacity = Math.max(0, 1 - p);
      translateY = -30 * p;
      rotate = -8 * p;
    }

    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0) rotate(${rotate}deg)`
    };
  };

  const renderFlyingLetters = (text) => {
    const chars = text.split('');
    return (
      <span className="flying-letters-container">
        {chars.map((char, i) => (
          <span
            key={i}
            className={`flying-char ${char === ' ' ? 'space-char' : ''}`}
            style={calcLetterStyle(i, chars.length)}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    );
  };

  // Section 3: GROW (0.68 to 1.0) - Enters smoothly & STAYS 100% visible (NO out-animation)
  const calcSection3Style = () => {
    const start = 0.65;
    const peak = 0.78;

    let opacity = 0;
    let translateY = 50;

    if (scrollProgress >= start && scrollProgress < peak) {
      const p = (scrollProgress - start) / (peak - start);
      opacity = p;
      translateY = 50 * (1 - p);
    } else if (scrollProgress >= peak) {
      opacity = 1;
      translateY = 0;
    }

    return {
      opacity,
      transform: `translate3d(-50%, ${translateY}px, 0)`,
      pointerEvents: opacity > 0.2 ? 'auto' : 'none'
    };
  };

  return (
    <section className="lag-container" ref={containerRef}>
      <div className="lag-sticky-viewport">
        
        {/* Canvas & Overlay Filter */}
        <canvas ref={canvasRef} className="lag-canvas" />
        <div className="lag-overlay-filter" />

        {/* Content Layer */}
        <div className="lag-content-layer">
          
          {/* Section 1: LEARN (Left Aligned) */}
          <div className="lag-section-card card-left" style={calcSection1Style()}>
            <h2 className="lag-section-title">
              Build Knowledge <span className="title-glow">That Matters</span>
            </h2>
            <p className="lag-section-desc">
              Practical learning and training designed around real skills, real challenges, and continuous improvement.
            </p>
          </div>

          {/* Section 2: APPLY (Right Aligned - Kinetic Typography) */}
          <div 
            className="lag-section-card card-right"
            style={{
              opacity: scrollProgress >= 0.34 && scrollProgress <= 0.68 ? 1 : 0,
              pointerEvents: scrollProgress >= 0.34 && scrollProgress <= 0.68 ? 'auto' : 'none'
            }}
          >
            <h2 className="lag-section-title">
              {renderFlyingLetters('Turn Knowledge Into Capability')}
            </h2>
            <p className="lag-section-desc">
              {renderFlyingLetters('Create, collaborate, solve problems, and put what you learn into practice.')}
            </p>
          </div>

          {/* Section 3: GROW (Centered - Stays 100% Visible at End) */}
          <div className="lag-section-card card-center" style={calcSection3Style()}>
            <h2 className="lag-section-title">
              Keep Moving Forward, <span className="title-glow">Together</span>
            </h2>
            <p className="lag-section-desc">
              A growing ecosystem of people, expertise, and opportunities built around continuous growth.
            </p>

            <div className="lag-card-actions">
              <button 
                className="btn-lag-primary"
                onClick={() => {
                  navigate('/training');
                  window.scrollTo(0, 0);
                }}
              >
                Join Skill Academy →
              </button>
              <button 
                className="btn-lag-outline"
                onClick={() => {
                  navigate('/services');
                  window.scrollTo(0, 0);
                }}
              >
                Explore Digital Solutions
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
