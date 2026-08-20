import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        
        {/* Main 3-Column Grid Matching Reference Image */}
        <div className="footer-main-grid">
          
          {/* Left Column: Brand Name, Logo, Tagline & Social Icons */}
          <div className="footer-left-col">
            <div className="footer-brand-header">
              <img src="/logo.png" alt="Integrate Thought Logo" className="footer-logo" />
              <span className="footer-brand-name">INTEGRATE THOUGHT</span>
            </div>
            <p className="footer-slogan">Engineering Intelligent Digital Systems & AI Solutions</p>

            <div className="footer-social-box">
              <h4 className="follow-us-label">Follow Us</h4>
              <div className="social-icons-row">
                <a href="#facebook" className="social-icon-btn primary" title="Facebook">F</a>
                <a href="#twitter" className="social-icon-btn" title="Twitter">T</a>
                <a href="#linkedin" className="social-icon-btn" title="LinkedIn">L</a>
                <a href="#whatsapp" className="social-icon-btn" title="WhatsApp">W</a>
                <a href="#instagram" className="social-icon-btn" title="Instagram">I</a>
              </div>
            </div>
          </div>

          {/* Middle Column: Nav Links & About Us */}
          <div className="footer-middle-col">
            <div className="footer-nav-row">
              <a 
                href="/" 
                className="footer-nav-link active-red"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                  window.scrollTo(0, 0);
                }}
              >
                About
              </a>
              <a 
                href="/services" 
                className="footer-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/services');
                  window.scrollTo(0, 0);
                }}
              >
                Services
              </a>
              <a 
                href="/training" 
                className="footer-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/training');
                  window.scrollTo(0, 0);
                }}
              >
                Training
              </a>
              <a href="#works" className="footer-nav-link">Works</a>
              <a 
                href="/contact" 
                className="footer-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/contact');
                  window.scrollTo(0, 0);
                }}
              >
                Contact
              </a>
              <a href="#faq" className="footer-nav-link">FAQ</a>
              <a 
                href="/contact" 
                className="footer-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/contact');
                  window.scrollTo(0, 0);
                }}
              >
                Support
              </a>
            </div>

            <div className="footer-about-box">
              <h3 className="about-us-title">About Us</h3>
              <p className="about-us-text">
                Integrate Thought is a modern digital engineering and AI agency specializing in custom web platforms, automated workflow architecture, RAG knowledge systems, and hands-on skill development programs.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Details & Email Newsletter Input */}
          <div className="footer-right-col">
            <div className="contact-info-block">
              <div>
                <span className="contact-item-title">Call :</span>
                <a href="tel:+919876543210" className="contact-item-value">+91 98765 43210</a>
              </div>
              <div>
                <span className="contact-item-title">Email :</span>
                <a href="mailto:hello@integratethought.com" className="contact-item-value">hello@integratethought.com</a>
              </div>
            </div>

            {/* Email Subscribe Input Matching Reference Image */}
            <form className="footer-email-box" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                required
                className="footer-email-input" 
                placeholder={subscribed ? "Subscribed successfully!" : "Write Email..."}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="footer-email-submit" aria-label="Submit Email">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright Line */}
        <div className="footer-bottom-bar">
          <span>© 2026 Integrate Thought. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
