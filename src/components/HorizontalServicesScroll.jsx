import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HorizontalServicesScroll.css';

export default function HorizontalServicesScroll() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const services = [
    {
      id: '01',
      title: 'Website Design & Development',
      subtitle: 'Custom web platforms & applications',
      bgImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600&auto=format&fit=crop',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      )
    },
    {
      id: '02',
      title: 'Digital Marketing & Growth',
      subtitle: 'Accelerate traffic & customer acquisition',
      bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12A10 10 0 0 0 12 2v10z"/>
          <path d="M12 22A10 10 0 0 0 22 12H12z"/>
          <path d="M12 12L2.1 12A10 10 0 0 0 12 22z"/>
        </svg>
      )
    },
    {
      id: '03',
      title: 'E-Commerce Platforms',
      subtitle: 'Scalable online store solutions',
      bgImage: 'https://images.unsplash.com/photo-1556742049-0a67e0e7a858?q=80&w=600&auto=format&fit=crop',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      )
    },
    {
      id: '04',
      title: 'CRM & Lead Management',
      subtitle: 'Streamline client workflows & leads',
      bgImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        </svg>
      )
    },
    {
      id: '05',
      title: 'AI Automation & Integration',
      subtitle: 'Automate manual processes with AI',
      bgImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
          <path d="M12 12L2.5 7.5"/>
          <path d="M12 12v10"/>
        </svg>
      )
    },
    {
      id: '06',
      title: 'RAG Knowledge Systems',
      subtitle: 'Intelligent AI vector data search',
      bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
      )
    },
    {
      id: '07',
      title: 'Custom AI Agents & Bots',
      subtitle: '24/7 autonomous customer agents',
      bgImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="10" rx="2"/>
          <circle cx="12" cy="5" r="2"/>
          <path d="M12 7v4"/>
        </svg>
      )
    },
    {
      id: '08',
      title: 'Cloud Infrastructure & DevOps',
      subtitle: 'AWS & Azure deployment architecture',
      bgImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600&auto=format&fit=crop',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
        </svg>
      )
    }
  ];

  // Calculate horizontal translate based on page vertical scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height - window.innerHeight;
      const scrolled = -rect.top;

      let progress = scrolled / containerHeight;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);

      const trackWidth = trackRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const maxTranslate = trackWidth - windowWidth + (windowWidth * 0.12);

      setTranslateX(-progress * maxTranslate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="horizontal-section-container" ref={containerRef} id="services">
      <div className="horizontal-sticky-viewport">
        
        {/* Section Header */}
        <div className="horizontal-header">
          <div className="header-left">
            <span className="horizontal-badge">OUR DIGITAL SOLUTIONS</span>
            <h2 className="horizontal-title">
              All-in-One <span className="title-blue">Services & Solutions</span>
            </h2>
          </div>
          <div className="header-right">
            <span>Scroll to explore</span>
            <svg className="scroll-hint-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </div>
        </div>

        {/* Scroll-Driven Single Row Horizontal Track */}
        <div 
          className="horizontal-scroll-track" 
          ref={trackRef}
          style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
        >
          {services.map((item) => (
            <div 
              key={item.id} 
              className="card-single-row"
              onClick={() => {
                navigate('/services');
                window.scrollTo(0, 0);
              }}
            >
              {/* Card Background Image & Dark Overlay */}
              <div 
                className="card-bg-gradient" 
                style={{ backgroundImage: `url(${item.bgImage})` }} 
              />
              <div className="card-dark-overlay" />

              {/* Top Right Red Badge */}
              <div className="card-number-badge">{item.id}</div>

              {/* Bottom Content */}
              <div className="card-bottom-content">
                <div className="card-icon-pill">
                  {item.icon}
                </div>
                <h3 className="card-row-title">{item.title}</h3>
                <span className="card-row-subtitle">
                  {item.subtitle}
                  <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
              </div>
            </div>
          ))}

          {/* End Featured Card: Explore All Services CTA */}
          <div 
            className="card-single-row explore-more-card"
            onClick={() => {
              navigate('/services');
              window.scrollTo(0, 0);
            }}
          >
            <div className="explore-card-content">
              <div className="explore-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
              </div>
              <span className="explore-card-badge">EXPLORE ALL</span>
              <h3 className="explore-card-title">View All 16+ Digital Solutions</h3>
              <p className="explore-card-desc">Detailed capabilities, technology stack, & project proposals</p>
              <button className="explore-card-btn">
                <span>Services Page</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Horizontal Progress Line */}
        <div className="track-progress-line">
          <div 
            className="track-progress-fill" 
            style={{ width: `${scrollProgress * 100}%` }} 
          />
        </div>

      </div>
    </div>
  );
}
