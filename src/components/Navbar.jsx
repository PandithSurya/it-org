import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  // Navbar visibility logic on scroll up/down
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY <= 20) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Training', path: '/training', badge: 'New' },
    { name: 'Works', path: '/works', badge: '(9)' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setMobileOpen(false);

    if (item.path === '/works') {
      navigate('/works');
      window.scrollTo(0, 0);
    } else if (item.path === '/services') {
      navigate('/services');
      window.scrollTo(0, 0);
    } else if (item.path === '/training') {
      navigate('/training');
      window.scrollTo(0, 0);
    } else if (item.path === '/contact') {
      navigate('/contact');
      window.scrollTo(0, 0);
    } else if (item.path === '/') {
      navigate('/');
      window.scrollTo(0, 0);
    } else if (item.path.startsWith('/#')) {
      const targetId = item.path.replace('/#', '');
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`navbar-header-wrapper ${visible ? 'nav-visible' : 'nav-hidden'}`}>
      <nav className="navbar-capsule">
        {/* Left Section: Menu icon + Links */}
        <div className="nav-left">
          <button 
            className="menu-toggle" 
            onClick={() => setMobileOpen(!mobileOpen)} 
            aria-label="Toggle Navigation Menu"
          >
            <span className="menu-line"></span>
            <span className="menu-line"></span>
          </button>

          <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
            {navItems.map((item) => {
              const isActive = (item.path === '/training' && location.pathname === '/training') ||
                              (item.path === '/services' && location.pathname === '/services') ||
                              (item.path === '/contact' && location.pathname === '/contact') ||
                              (item.path === '/' && location.pathname === '/' && !location.hash);
              return (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className={`nav-item-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    {item.name}
                    {item.badge && <span className="works-badge">{item.badge}</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Center Section: Integrate Thought Logo */}
        <div className="nav-center">
          <a 
            href="/" 
            className="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              window.scrollTo(0, 0);
            }}
          >
            <img src="/logo.png" alt="Integrate Thought Logo" className="nav-logo-icon" />
            <span className="brand-text">integrate thought</span>
          </a>
        </div>

        {/* Right Section: Founder info + CTA Button */}
        <div className="nav-right">
          <div className="founder-box" onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }} style={{ cursor: 'pointer' }}>
            <div className="avatar-wrapper">
              <svg className="avatar-svg" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="8" fill="#406A99" fillOpacity="0.15"/>
                <path d="M18 18C20.2091 18 22 16.2091 22 14C22 11.7909 20.2091 10 18 10C15.7909 10 14 11.7909 14 14C14 16.2091 15.7909 18 18 18Z" fill="#406A99"/>
                <path d="M10 26C10 22.6863 13.5817 20 18 20C22.4183 20 26 22.6863 26 26" stroke="#406A99" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="founder-details">
              <span className="founder-name">Talk to Henrik</span>
              <span className="founder-title">Founder at Integrate Thought</span>
            </div>
          </div>

          <button className="cta-btn" onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}>
            Get in touch <span className="btn-bullet"></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
