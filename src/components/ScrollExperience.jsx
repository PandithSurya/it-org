import { useState, useEffect, useRef } from 'react';
import './ScrollExperience.css';

export default function ScrollExperience() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const imagesRef = useRef([]);

  const TOTAL_FRAMES = 80;

  // Preload frame images from public/split-video1/ffout001.gif .. ffout080.gif
  useEffect(() => {
    const images = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/split-video1/ffout${frameNum}.gif`;

      img.onload = () => {
        count++;
        setLoadedCount(count);
      };

      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Calculate Scroll Progress across container height
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height - window.innerHeight;
      const scrolled = -rect.top;

      let progress = scrolled / containerHeight;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Draw current frame image on Canvas with aspect-fit cover logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(scrollProgress * (TOTAL_FRAMES - 1)))
    );

    const targetImage = imagesRef.current[frameIndex];

    if (targetImage && targetImage.complete && targetImage.naturalWidth > 0) {
      const imgRatio = targetImage.naturalWidth / targetImage.naturalHeight;
      const canvasRatio = canvas.width / canvas.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(targetImage, offsetX, offsetY, drawWidth, drawHeight);
    } else {
      ctx.fillStyle = '#080c14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [scrollProgress, loadedCount]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Section 1: No entrance animation (100% visible at top), smooth outgoing to top-left
  const calculateSection1Animation = (progress, peakEnd, end) => {
    let opacity = 1;
    let translateX = 0;
    let translateY = 0;
    let scale = 1;
    let blur = 0;

    if (progress <= peakEnd) {
      opacity = 1;
      translateX = 0;
      translateY = 0;
      scale = 1;
      blur = 0;
    } else if (progress <= end) {
      const ratio = (progress - peakEnd) / (end - peakEnd);
      opacity = 1 - ratio;
      translateX = -40 * ratio;
      translateY = -50 * ratio;
      scale = 1 - 0.05 * ratio;
      blur = 10 * ratio;
    } else {
      opacity = 0;
      translateX = -40;
      translateY = -50;
      scale = 0.95;
      blur = 10;
    }

    return {
      opacity,
      transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
      filter: `blur(${blur}px)`,
      pointerEvents: opacity > 0.2 ? 'auto' : 'none'
    };
  };

  // Section 2: Container wrapper visibility range
  const isSection2ContainerActive = scrollProgress >= 0.28 && scrollProgress <= 0.70;

  // Kinetic Flying Letters Calculator for Section 2 Text
  const calculateLetterStyle = (progress, charIndex, totalChars) => {
    const inStartRange = 0.30;
    const inSpan = 0.12;
    const outStartRange = 0.56;
    const outSpan = 0.12;

    const charFrac = charIndex / Math.max(1, totalChars);

    // Staggered incoming range per letter
    const charInStart = inStartRange + charFrac * (inSpan * 0.5);
    const charInEnd = charInStart + (inSpan * 0.5);

    // Staggered outgoing range per letter
    const charOutStart = outStartRange + charFrac * (outSpan * 0.5);
    const charOutEnd = charOutStart + (outSpan * 0.5);

    let opacity = 0;
    let translateY = 50;
    let translateX = (charIndex % 2 === 0 ? -14 : 14);
    let rotate = (charIndex % 2 === 0 ? -16 : 16);
    let scale = 0.5;
    let blur = 10;

    if (progress < charInStart) {
      // Flying IN starting state
      opacity = 0;
      translateY = 55;
      translateX = (charIndex % 2 === 0 ? -18 : 18);
      rotate = (charIndex % 2 === 0 ? -20 : 20);
      scale = 0.4;
      blur = 12;
    } else if (progress < charInEnd) {
      // Flying IN interpolation
      const r = (progress - charInStart) / (charInEnd - charInStart);
      opacity = r;
      translateY = 55 * (1 - r);
      translateX = (charIndex % 2 === 0 ? -18 : 18) * (1 - r);
      rotate = (charIndex % 2 === 0 ? -20 : 20) * (1 - r);
      scale = 0.4 + 0.6 * r;
      blur = 12 * (1 - r);
    } else if (progress <= charOutStart) {
      // Active peak aligned phase
      opacity = 1;
      translateY = 0;
      translateX = 0;
      rotate = 0;
      scale = 1;
      blur = 0;
    } else if (progress < charOutEnd) {
      // Flying OUT interpolation
      const r = (progress - charOutStart) / (charOutEnd - charOutStart);
      opacity = 1 - r;
      translateY = -55 * r;
      translateX = (charIndex % 2 === 0 ? 18 : -18) * r;
      rotate = (charIndex % 2 === 0 ? 20 : -20) * r;
      scale = 1 - 0.4 * r;
      blur = 10 * r;
    } else {
      // Flying OUT finished state
      opacity = 0;
      translateY = -55;
      translateX = (charIndex % 2 === 0 ? 18 : -18);
      rotate = (charIndex % 2 === 0 ? 20 : -20);
      scale = 0.5;
      blur = 10;
    }

    return {
      display: 'inline-block',
      opacity,
      transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale}) rotate(${rotate}deg)`,
      filter: `blur(${blur}px)`,
      willChange: 'transform, opacity, filter',
      transition: 'transform 0.06s linear, opacity 0.06s linear, filter 0.06s linear'
    };
  };

  // Helper to split text into words & staggered animated letters
  const renderFlyingLetters = (textString, isAccent = false, startCharIndex = 0, totalChars = 54) => {
    const words = textString.split(' ');
    let runningCharIndex = startCharIndex;

    return words.map((word, wordIdx) => {
      const letterElements = word.split('').map((char, charIdx) => {
        const currentGlobalIndex = runningCharIndex + charIdx;
        const letterStyle = calculateLetterStyle(scrollProgress, currentGlobalIndex, totalChars);
        
        return (
          <span 
            key={charIdx} 
            className={`flying-letter ${isAccent ? 'accent-flying-letter' : ''}`}
            style={letterStyle}
          >
            {char}
          </span>
        );
      });

      runningCharIndex += word.length + 1; // +1 count for trailing space

      return (
        <span key={wordIdx} className="flying-word-wrapper">
          {letterElements}
          {wordIdx < words.length - 1 && <span className="word-space">&nbsp;</span>}
        </span>
      );
    });
  };

  // Section 3: Right-aligned incoming from bottom-right, stays visible (NO out-animation)
  const calculateSection3Animation = (progress, start, peakStart) => {
    let opacity = 0;
    let translateX = 40;
    let translateY = 60;
    let scale = 0.92;
    let blur = 12;

    if (progress < start) {
      opacity = 0;
      translateX = 40;
      translateY = 60;
      scale = 0.92;
      blur = 12;
    } else if (progress < peakStart) {
      const ratio = (progress - start) / (peakStart - start);
      opacity = ratio;
      translateX = 40 * (1 - ratio);
      translateY = 60 * (1 - ratio);
      scale = 0.92 + 0.08 * ratio;
      blur = 12 * (1 - ratio);
    } else {
      opacity = 1;
      translateX = 0;
      translateY = 0;
      scale = 1;
      blur = 0;
    }

    return {
      opacity,
      transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
      filter: `blur(${blur}px)`,
      pointerEvents: opacity > 0.2 ? 'auto' : 'none'
    };
  };

  // Timeline mappings
  const section1Style = calculateSection1Animation(scrollProgress, 0.22, 0.32);
  const section3Style = calculateSection3Animation(scrollProgress, 0.68, 0.78);

  const part1Text = "Building digital systems ";
  const part2Text = "that move businesses forward.";
  const TOTAL_SECTION2_CHARS = part1Text.length + part2Text.length;

  return (
    <div className="scroll-container" ref={containerRef}>
      {/* Top Scroll Progress Indicator */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Fixed Canvas for Video Scrubbing */}
      <div className="canvas-sticky">
        <canvas ref={canvasRef} className="scroll-canvas" />
      </div>

      {/* Subtle Backdrop Filter Layer between Canvas & Text */}
      <div className="canvas-backdrop-filter" />

      {/* Pinned Viewport holding Dynamic Asymmetric Text Sections */}
      <div className="text-pinned-viewport">
        
        {/* Section 1: Hero Centered Logo & Title */}
        <div className="section-card-animated section-1-hero" style={section1Style}>
          <div className="hero-brand-section">
            <img src="/logo.png" alt="Integrate Thought Logo" className="hero-brand-logo" />
            <h1 className="hero-brand-title">integrate thought</h1>
          </div>
        </div>

        {/* Section 2: Left-Aligned Editorial Purpose Statement with Kinetic Flying Letters */}
        <div 
          className="section-card-animated section-2-left" 
          style={{ opacity: isSection2ContainerActive ? 1 : 0, pointerEvents: isSection2ContainerActive ? 'auto' : 'none' }}
        >
          <div className="editorial-left-content">
            <div className="left-accent-line"></div>
            <span className="editorial-index">02 / OUR PURPOSE</span>
            <h2 className="main-headline-editorial">
              {renderFlyingLetters(part1Text, false, 0, TOTAL_SECTION2_CHARS)}
              <br />
              {renderFlyingLetters(part2Text, true, part1Text.length, TOTAL_SECTION2_CHARS)}
            </h2>
          </div>
        </div>

        {/* Section 3: Right-Aligned Impact Statement */}
        <div className="section-card-animated section-3-right" style={section3Style}>
          <div className="editorial-right-content">
            <div className="right-header-row">
              <span className="editorial-index-badge">03 / OUR IMPACT</span>
            </div>
            <p className="description-text-editorial">
              Digital experiences, <span className="highlight-tag-accent">AI & automation</span> designed to help businesses attract customers, streamline operations and scale.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
