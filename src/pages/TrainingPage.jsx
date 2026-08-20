import { useState } from 'react';
import './TrainingPage.css';

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [modalCourse, setModalCourse] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', courseName: '' });

  const allCourses = [
    {
      id: 1,
      title: 'Python with AI & Machine Learning',
      category: 'Programming & AI',
      badge: 'POPULAR & IN-DEMAND',
      desc: 'Master Python programming, algorithms, data structures, and build real-world AI models using OpenAI APIs, Neural Networks, and Automation.',
      syllabus: [
        'Python Fundamentals, OOP & Data Structures',
        'Data Analysis with Pandas & NumPy',
        'OpenAI API Integration & Custom AI Models',
        'Machine Learning & Neural Networks with PyTorch',
        'Building 3 Live Portfolio AI Projects'
      ],
      duration: '12 Weeks',
      mode: 'Classroom & Online',
      format: 'Certification',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
          <path d="M12 12L2.5 7.5"/>
          <path d="M12 12v10"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Tally Prime & GST Accounting',
      category: 'Accounting & Finance',
      badge: 'CAREER TRACK',
      desc: 'Comprehensive practical training in Tally Prime, GST filing, inventory management, taxation, payroll, and corporate financial accounting.',
      syllabus: [
        'Company Creation & Accounting Vouchers in Tally',
        'GST Setup, E-Way Bill & GSTR Returns Filing',
        'Inventory & Stock Management',
        'Payroll Management, TDS & TCS Compliance',
        'Financial Statements & Audit Reports'
      ],
      duration: '6 Weeks',
      mode: 'Classroom & Online',
      format: 'Certification',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="M6 8h12"/>
          <path d="M6 12h8"/>
          <path d="M6 16h5"/>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Computer Typing & Office Automation',
      category: 'Typing & Office',
      badge: 'SPEED CERTIFICATION',
      desc: 'Master touch typing with 50+ WPM speed accuracy certification, MS Office Suite (Excel, Word, PowerPoint), and workplace document workflow.',
      syllabus: [
        'Touch Typing Technique & Finger Placement',
        'Speed Building Exercises to Reach 50+ WPM',
        'Advanced MS Excel (VLOOKUP, Pivot Tables, Formulas)',
        'Professional MS Word Formatting & Mail Merge',
        'Office Automation & Government Exam Typing Prep'
      ],
      duration: '4 Weeks',
      mode: 'Practical Lab Session',
      format: 'Speed Certificate',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8"/>
        </svg>
      )
    },
    {
      id: 4,
      title: 'Full-Stack Web Development (MERN)',
      category: 'Programming & AI',
      badge: 'JOB-READY TRACK',
      desc: 'Learn modern full-stack web development using HTML5, CSS3, JavaScript ES6+, React, Node.js, Express, and MongoDB with live client projects.',
      syllabus: [
        'HTML5, CSS3, Responsive Design & Vanilla JS',
        'React Framework, Hooks, State & Router',
        'Node.js & Express RESTful API Development',
        'MongoDB Database & Authentication JWT',
        'Deployment on Vercel & AWS Cloud'
      ],
      duration: '16 Weeks',
      mode: 'Classroom & Online',
      format: 'Live Projects',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      )
    },
    {
      id: 5,
      title: 'Data Science & AI Analytics',
      category: 'Programming & AI',
      badge: 'HIGH GROWTH',
      desc: 'Transform raw data into strategic business insights using Python, Pandas, NumPy, Power BI dashboards, SQL database query, and machine learning.',
      syllabus: [
        'Python Data Analysis with Pandas & NumPy',
        'SQL Database Queries & Relational Models',
        'Power BI & Tableau Dashboard Creation',
        'Predictive Analytics & Statistics',
        'Real-world Capstone Data Project'
      ],
      duration: '10 Weeks',
      mode: 'Classroom & Online',
      format: 'Certification',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      )
    },
    {
      id: 6,
      title: 'Graphic Design & UI/UX Experience',
      category: 'Design & Marketing',
      badge: 'CREATIVE TRACK',
      desc: 'Create stunning visual brand assets, logos, social graphics, wireframes, and interactive mobile app prototypes using Figma, Photoshop, and Illustrator.',
      syllabus: [
        'Color Theory, Typography & Brand Identity',
        'Adobe Photoshop Graphic Editing & Compositing',
        'Adobe Illustrator Vector Logo & Banner Design',
        'Figma UI/UX Wireframing & Interactive Prototypes',
        'Building a Creative Design Portfolio'
      ],
      duration: '8 Weeks',
      mode: 'Classroom & Online',
      format: 'Design Portfolio',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.72 1.7-1.61 0-.43-.17-.83-.44-1.13-.24-.28-.39-.64-.39-1.04 0-.88.72-1.6 1.6-1.6H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9z"/>
        </svg>
      )
    }
  ];

  const categories = ['All', 'Programming & AI', 'Accounting & Finance', 'Typing & Office', 'Design & Marketing'];

  const filteredCourses = activeTab === 'All' 
    ? allCourses 
    : allCourses.filter(c => c.category === activeTab);

  const handleOpenModal = (course) => {
    setModalCourse(course);
    setFormData(prev => ({ ...prev, courseName: course.title }));
    setSubmitted(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setModalCourse(null);
      setSubmitted(false);
    }, 2500);
  };

  return (
    <div className="training-page-container">
      <div className="page-inner-container">
        
        {/* Page Hero Banner */}
        <div className="page-hero">
          <span className="page-hero-badge">INTEGRATE THOUGHT SKILL ACADEMY</span>
          <h1 className="page-hero-title">
            Master In-Demand Skills & <br />
            <span className="title-highlight">Get Industry Certified</span>
          </h1>
          <p className="page-hero-subtitle">
            Hands-on practical training, 1-on-1 expert mentorship, live lab sessions, and job placement assistance in Python with AI, Tally Prime, Touch Typing, Web Development, and Data Analytics.
          </p>

          {/* Stats Counter Grid */}
          <div className="stats-counter-grid">
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Practical Lab Sessions</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Certified Graduates</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+ WPM</div>
              <div className="stat-label">Typing & Tally Mastery</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Job Placement Support</div>
            </div>
          </div>
        </div>

        {/* Filter Category Bar */}
        <div className="training-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Detailed Courses Grid */}
        <div className="detailed-courses-grid">
          {filteredCourses.map((course) => (
            <div key={course.id} className="detailed-course-card">
              <div>
                <div className="d-card-header">
                  <div className="d-card-icon">
                    {course.icon}
                  </div>
                  <span className="d-card-badge">{course.badge}</span>
                </div>

                <h2 className="d-card-title">{course.title}</h2>
                <p className="d-card-desc">{course.desc}</p>

                {/* Syllabus Modules List */}
                <div className="syllabus-box">
                  <span className="syllabus-heading">Key Modules Covered:</span>
                  <ul className="syllabus-list">
                    {course.syllabus.map((item, idx) => (
                      <li key={idx} className="syllabus-item">
                        <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                {/* Meta details */}
                <div className="d-card-meta">
                  <div className="d-meta-item">
                    <span>⏱ {course.duration}</span>
                  </div>
                  <span>•</span>
                  <div className="d-meta-item">
                    <span>📍 {course.mode}</span>
                  </div>
                  <span>•</span>
                  <div className="d-meta-item">
                    <span>🎓 {course.format}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="d-card-actions">
                  <button 
                    className="btn-enroll-primary"
                    onClick={() => handleOpenModal(course)}
                  >
                    Enroll Now
                  </button>
                  <button 
                    className="btn-outline-secondary"
                    onClick={() => handleOpenModal(course)}
                  >
                    Inquire Fee
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-section">
          <div className="testimonials-heading">
            <h2>Student Success Stories</h2>
            <p className="training-subtitle">Hear what our certified students say about their training experience.</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars-row">★★★★★</div>
              <p className="testimonial-text">
                "The Python with AI course at Integrate Thought was incredible. I went from knowing zero coding to building AI automation projects with OpenAI APIs."
              </p>
              <div className="student-author">
                <div className="student-avatar">R</div>
                <div className="student-info">
                  <h4>Rahul Sharma</h4>
                  <span>Python & AI Graduate</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars-row">★★★★★</div>
              <p className="testimonial-text">
                "Tally Prime training with GST returns helped me secure an accounting role immediately after completion. Highly practical lab guidance!"
              </p>
              <div className="student-author">
                <div className="student-avatar">P</div>
                <div className="student-info">
                  <h4>Priya Patel</h4>
                  <span>Tally Prime Certified</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars-row">★★★★★</div>
              <p className="testimonial-text">
                "I improved my computer typing speed from 22 WPM to 54 WPM with 98% accuracy in just 4 weeks! The speed certification helped me pass government typing tests."
              </p>
              <div className="student-author">
                <div className="student-avatar">V</div>
                <div className="student-info">
                  <h4>Vikram Kumar</h4>
                  <span>Speed Typing Graduate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Enrollment Inquiry Modal */}
      {modalCourse && (
        <div className="modal-overlay" onClick={() => setModalCourse(null)}>
          <div className="enroll-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModalCourse(null)}>×</button>
            
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '48px', color: '#10b981', marginBottom: '12px' }}>✓</div>
                <h3 className="modal-title">Registration Submitted!</h3>
                <p className="modal-subtitle">Our training counselor will contact you shortly with batch timings and curriculum details.</p>
              </div>
            ) : (
              <>
                <h3 className="modal-title">Enroll in {modalCourse.title}</h3>
                <p className="modal-subtitle">Fill in your details below to reserve your seat or receive fee structure details.</p>
                
                <form className="enroll-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Enter your full name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone / WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="Enter your contact number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Preferred Learning Mode</label>
                    <select>
                      <option>Classroom Practical Sessions</option>
                      <option>Live Online Training</option>
                      <option>Weekend Batch</option>
                    </select>
                  </div>

                  <button type="submit" className="form-submit-btn">
                    Submit Registration Inquiry
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
