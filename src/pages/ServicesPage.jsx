import { useState } from 'react';
import './ServicesPage.css';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [modalService, setModalService] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', serviceName: '' });

  const allServices = [
    {
      id: 1,
      title: 'Website Design & Development',
      category: 'Web & Mobile',
      badge: 'POPULAR',
      desc: 'High-performance, responsive websites and web applications custom-built to represent your brand, engage users, and drive high conversion rates.',
      deliverables: [
        'Custom React & Next.js Web Architecture',
        'UI/UX Prototyping & Responsive Design',
        'SEO Optimization & Fast Page Speeds',
        'CMS & Admin Dashboard Integration'
      ],
      techStack: ['React', 'Next.js', 'Node.js', 'Tailwind', 'Vite'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'AI Automation & Integration',
      category: 'AI & Automation',
      badge: 'ENTERPRISE AI',
      desc: 'Seamlessly automate complex business workflows, replace manual data tasks, and integrate cutting-edge AI models into your software ecosystem.',
      deliverables: [
        'Workflow & API Process Automation',
        'OpenAI GPT-4 & Custom LLM Integration',
        'Document Data Extraction & Processing',
        'Automated Email & Notification Triggers'
      ],
      techStack: ['Python', 'OpenAI', 'LangChain', 'FastAPI', 'Zapier'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
          <path d="M12 12L2.5 7.5"/>
          <path d="M12 12v10"/>
        </svg>
      )
    },
    {
      id: 3,
      title: 'RAG Knowledge Systems',
      category: 'AI & Automation',
      badge: 'ADVANCED AI',
      desc: 'Retrieval-Augmented Generation (RAG) systems that connect AI to your proprietary business data, PDF documents, and internal databases accurately.',
      deliverables: [
        'Vector Database Setup & Embedding Pipeline',
        'Private Business Data Search & Indexing',
        'Context-Aware AI Fact-Checking',
        'Enterprise Knowledge Base Chat Interface'
      ],
      techStack: ['Pinecone', 'ChromaDB', 'Python', 'LlamaIndex'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
      )
    },
    {
      id: 4,
      title: 'Custom AI Agents & Chatbots',
      category: 'AI & Automation',
      badge: '24/7 SUPPORT',
      desc: 'Autonomous AI agents capable of engaging leads, answering complex customer support queries, booking appointments, and triggering backend actions.',
      deliverables: [
        'Custom Persona & Conversational Design',
        'Omnichannel Integration (Web, WhatsApp, Email)',
        'CRM & Database Syncing',
        'Real-Time Analytics & Handoff to Human Agents'
      ],
      techStack: ['Python', 'Webhooks', 'REST APIs', 'Node.js'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="10" rx="2"/>
          <circle cx="12" cy="5" r="2"/>
          <path d="M12 7v4"/>
        </svg>
      )
    },
    {
      id: 5,
      title: 'E-Commerce Store Engineering',
      category: 'Web & Mobile',
      badge: 'HIGH CONVERSION',
      desc: 'Custom online shopping experiences, payment gateway integrations, automated inventory sync, and seamless checkout flows for retail brands.',
      deliverables: [
        'Custom Shopify / Headless Storefronts',
        'Stripe & Razorpay Payment Gateway Setup',
        'Automated Cart Abandonment Recovery',
        'Order Fulfillment & Inventory Management'
      ],
      techStack: ['React', 'Shopify API', 'Stripe', 'Node.js'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      )
    },
    {
      id: 6,
      title: 'Cloud Infrastructure & DevOps',
      category: 'Cloud & Infrastructure',
      badge: 'SCALABLE SLA',
      desc: 'Architect resilient cloud infrastructure on AWS, Google Cloud, or Azure with CI/CD deployment pipelines, containerization, and 99.9% uptime SLA.',
      deliverables: [
        'AWS / GCP Cloud Architecture Setup',
        'Docker & Kubernetes Container Orchestration',
        'CI/CD Automated Deployment Pipelines',
        'Server Monitoring, Backups & Disaster Recovery'
      ],
      techStack: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Nginx'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
        </svg>
      )
    }
  ];

  const categories = ['All', 'AI & Automation', 'Web & Mobile', 'Cloud & Infrastructure'];

  const filteredServices = activeTab === 'All' 
    ? allServices 
    : allServices.filter(s => s.category === activeTab);

  const handleOpenModal = (service) => {
    setModalService(service);
    setFormData(prev => ({ ...prev, serviceName: service.title }));
    setSubmitted(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setModalService(null);
      setSubmitted(false);
    }, 2500);
  };

  return (
    <div className="services-page-container">
      <div className="services-inner-container">
        
        {/* Page Hero */}
        <div className="services-hero">
          <span className="services-hero-badge">DIGITAL SOLUTIONS & ENGINEERING</span>
          <h1 className="services-hero-title">
            End-to-End Digital Solutions <br />
            Built to Scale Your Business
          </h1>
          <p className="services-hero-subtitle">
            From custom web applications and AI automation systems to cloud DevOps and CRM engineering — we deliver high-performance digital systems designed for measurable business growth.
          </p>

          {/* Stats Row */}
          <div className="services-stats-grid">
            <div className="s-stat-card">
              <div className="s-stat-num">100+</div>
              <div className="s-stat-label">Systems Delivered</div>
            </div>
            <div className="s-stat-card">
              <div className="s-stat-num">99.9%</div>
              <div className="s-stat-label">System Uptime SLA</div>
            </div>
            <div className="s-stat-card">
              <div className="s-stat-num">24/7</div>
              <div className="s-stat-label">AI Autonomous Ops</div>
            </div>
            <div className="s-stat-card">
              <div className="s-stat-num">10x</div>
              <div className="s-stat-label">Client Growth Focus</div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="s-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`s-filter-btn ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Detailed Services Grid */}
        <div className="detailed-services-grid">
          {filteredServices.map((service) => (
            <div key={service.id} className="s-detail-card">
              <div>
                <div className="s-card-top">
                  <div className="s-card-icon">
                    {service.icon}
                  </div>
                  <span className="s-card-tag">{service.badge}</span>
                </div>

                <h2 className="s-card-title">{service.title}</h2>
                <p className="s-card-desc">{service.desc}</p>

                {/* Deliverables Box */}
                <div className="deliverables-box">
                  <span className="deliverables-title">Key Deliverables & Scope:</span>
                  <ul className="deliverables-list">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="deliverable-item">
                        <svg className="d-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Tags */}
                <div className="tech-stack-row">
                  {service.techStack.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="s-card-footer">
                <button 
                  className="btn-proposal"
                  onClick={() => handleOpenModal(service)}
                >
                  Request Project Proposal
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 4-Step Engagement Process Section */}
        <div className="process-section">
          <div className="process-header">
            <h2>Our 4-Step Delivery Process</h2>
            <p className="services-hero-subtitle">How we partner with your business from concept to production release.</p>
          </div>

          <div className="process-grid">
            <div className="process-step-card">
              <div className="step-number">01</div>
              <h3 className="step-title">Discovery & Strategy</h3>
              <p className="step-desc">We analyze your business workflows, define technical requirements, and formulate an architecture blueprint.</p>
            </div>

            <div className="process-step-card">
              <div className="step-number">02</div>
              <h3 className="step-title">Architecture & AI Design</h3>
              <p className="step-desc">We design intuitive UI/UX wireframes, database schemas, and AI model integrations for maximum efficiency.</p>
            </div>

            <div className="process-step-card">
              <div className="step-number">03</div>
              <h3 className="step-title">Agile Engineering</h3>
              <p className="step-desc">Rapid 2-week development sprints with live staging links, giving you full visibility into project progress.</p>
            </div>

            <div className="process-step-card">
              <div className="step-number">04</div>
              <h3 className="step-title">Launch & Scaling SLA</h3>
              <p className="step-desc">Rigorous security audits, cloud deployment, automated monitoring, and ongoing 24/7 technical support.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Project Proposal Inquiry Modal */}
      {modalService && (
        <div className="modal-overlay" onClick={() => setModalService(null)}>
          <div className="enroll-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModalService(null)}>×</button>
            
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '48px', color: '#10b981', marginBottom: '12px' }}>✓</div>
                <h3 className="modal-title">Proposal Request Received!</h3>
                <p className="modal-subtitle">Our solution architect will review your request and send a detailed project scope within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="modal-title">Request Proposal for {modalService.title}</h3>
                <p className="modal-subtitle">Tell us about your project requirements and budget to receive a tailored technical proposal.</p>
                
                <form className="enroll-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Enter your name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Company / Organization Name</label>
                    <input 
                      type="text" 
                      placeholder="Your company name" 
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Work Email *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Enter contact number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="form-submit-btn">
                    Submit Proposal Request
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
