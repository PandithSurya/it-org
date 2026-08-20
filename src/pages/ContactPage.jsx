import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, Sparkles, Clock, UserCheck } from 'lucide-react';
import './ContactPage.css';

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    category: 'Web App Development',
    budget: '$10k - $25k',
    message: ''
  });

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page-container">
      <div className="contact-inner-container">
        
        {/* Editorial Hero Banner */}
        <div className="contact-hero">
          <span className="contact-hero-badge">
            <Sparkles className="inline-block w-3.5 h-3.5 mr-1.5" />
            GET IN TOUCH
          </span>
          <h1 className="contact-hero-title">
            Let's Build Something <span className="title-blue">Extraordinary</span> Together
          </h1>
          <p className="contact-hero-subtitle">
            Have a new project, a complex technical challenge, or looking to scale your engineering capability? We're ready to partner with you.
          </p>
        </div>

        {/* 3 Quick Contact Info Cards */}
        <div className="contact-info-grid">
          
          {/* Card 1: Direct Email */}
          <div className="info-card">
            <div className="info-icon-box">
              <Mail className="w-5 h-5" />
            </div>
            <div className="info-content">
              <span className="info-label">Direct Email</span>
              <div className="info-val">hello@integratethought.com</div>
              <span className="info-subtext">Fast response guaranteed</span>
              <div>
                <button
                  type="button"
                  onClick={() => handleCopy('hello@integratethought.com', 'email')}
                  className="copy-btn"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Talk to Founder */}
          <div className="info-card">
            <div className="info-icon-box">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="info-content">
              <span className="info-label">Talk to Founder</span>
              <div className="info-val">Talk to Henrik</div>
              <span className="info-subtext">Founder at Integrate Thought</span>
              <div>
                <button
                  type="button"
                  onClick={() => handleCopy('+91 97638 77717', 'phone')}
                  className="copy-btn"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Phone className="w-3.5 h-3.5" />
                      <span>+91 97638 77717</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Global SLA */}
          <div className="info-card">
            <div className="info-icon-box">
              <Clock className="w-5 h-5" />
            </div>
            <div className="info-content">
              <span className="info-label">Response Time SLA</span>
              <div className="info-val">&lt; 24 Hours</div>
              <span className="info-subtext">Monday – Saturday</span>
              <div className="mt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Active &amp; Accepting New Projects</span>
              </div>
            </div>
          </div>

        </div>

        {/* Premium Minimal Contact Form Card */}
        <div className="contact-form-wrapper">
          {submitted ? (
            <div className="form-success-box">
              <div className="success-icon">✓</div>
              <h2 className="success-title">Message Received!</h2>
              <p className="success-desc">
                Thank you for reaching out to Integrate Thought. Our principal solution architect will review your project brief and respond within 24 hours.
              </p>
            </div>
          ) : (
            <>
              <div className="form-header">
                <h2>Start Your Project Brief</h2>
                <p>Fill out the form below and we'll prepare a tailored technical scope for your team.</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form-grid">
                
                {/* Full Name */}
                <div className="input-field-group">
                  <label className="input-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Henrik Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="custom-input"
                  />
                </div>

                {/* Work Email */}
                <div className="input-field-group">
                  <label className="input-label">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="henrik@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="custom-input"
                  />
                </div>

                {/* Company Name */}
                <div className="input-field-group">
                  <label className="input-label">Company / Organization</label>
                  <input
                    type="text"
                    placeholder="Integrate Thought"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="custom-input"
                  />
                </div>

                {/* Category Selector */}
                <div className="input-field-group">
                  <label className="input-label">Project Domain *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="custom-select"
                  >
                    <option value="Web App Development">Web App &amp; Full-Stack Platform</option>
                    <option value="AI & Automation">AI Model Integration &amp; Automation</option>
                    <option value="Skill Academy Training">Skill Academy &amp; Corporate Training</option>
                    <option value="UI/UX & Branding">UI/UX Design &amp; Brand Identity</option>
                    <option value="Other">Other Custom Solutions</option>
                  </select>
                </div>

                {/* Budget Range */}
                <div className="input-field-group form-group-full">
                  <label className="input-label">Estimated Budget Range</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="custom-select"
                  >
                    <option value="$5k - $10k">$5,000 – $10,000</option>
                    <option value="$10k - $25k">$10,000 – $25,000</option>
                    <option value="$25k+">$25,000+</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="input-field-group form-group-full">
                  <label className="input-label">Project Details &amp; Objectives *</label>
                  <textarea
                    required
                    placeholder="Tell us about your project goals, scope, key deliverables, and target timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="custom-textarea"
                  />
                </div>

                {/* Submit Button */}
                <div className="submit-btn-row">
                  <button type="submit" className="contact-submit-btn">
                    <span>Send Project Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>

              </form>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
