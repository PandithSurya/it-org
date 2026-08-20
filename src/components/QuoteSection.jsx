import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuoteSection.css';

export default function QuoteSection() {
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowContactModal(false);
      setSubmitted(false);
    }, 2500);
  };

  const handleExploreServices = () => {
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/services');
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="quote-section-wrapper">
      <div className="quote-container">
        
        {/* Quote SVG Icon */}
        <svg className="quote-mark-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4vwv10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>

        {/* Quote Headline */}
        <blockquote className="quote-text">
          "Technology is not just about writing code; it is about{' '}
          <span className="quote-highlight">engineering intelligent systems</span> that transform how businesses scale, automate, and move forward."
        </blockquote>

        {/* Attribution */}
        <div className="quote-attribution">
          <span className="attribution-line"></span>
          <span>Integrate Thought — Digital Architecture & AI Systems</span>
          <span className="attribution-line"></span>
        </div>

        {/* Action Buttons Row */}
        <div className="quote-buttons-row">
          <button 
            className="btn-quote-contact"
            onClick={() => setShowContactModal(true)}
          >
            <span>Contact Us</span>
            <svg className="arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>

          <button 
            className="btn-quote-explore"
            onClick={handleExploreServices}
          >
            <span>Explore Services</span>
            <svg className="arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>

      </div>

      {/* Quick Contact Us Modal */}
      {showContactModal && (
        <div className="contact-modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="contact-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="contact-modal-close" onClick={() => setShowContactModal(false)}>×</button>
            
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '48px', color: '#10b981', marginBottom: '12px' }}>✓</div>
                <h3 className="modal-title">Message Sent Successfully!</h3>
                <p className="modal-subtitle">Thank you for reaching out. Our team will contact you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="modal-title">Get in Touch with Integrate Thought</h3>
                <p className="modal-subtitle">Have a project in mind or need expert technical consultation? We are here to help.</p>
                
                <form className="enroll-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Enter full name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="name@company.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone / WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Enter contact number" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>How can we help you? *</label>
                    <textarea 
                      required
                      rows="3"
                      placeholder="Briefly describe your project or inquiry..."
                      style={{
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        outline: 'none'
                      }}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="form-submit-btn">
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
