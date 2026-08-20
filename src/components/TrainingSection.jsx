import { useState } from 'react';
import './TrainingSection.css';

export default function TrainingSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const courses = [
    {
      id: 1,
      title: 'Python with AI & Machine Learning',
      category: 'Programming & AI',
      badge: 'POPULAR & IN-DEMAND',
      desc: 'Master Python programming, algorithms, data structures, and build real-world AI models using OpenAI APIs, Neural Networks, and Automation.',
      skills: ['Python', 'Machine Learning', 'OpenAI APIs', 'AI Automation'],
      duration: '12 Weeks',
      format: 'Certificate Included',
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
      category: 'Accounting & Office',
      badge: 'CAREER TRACK',
      desc: 'Comprehensive practical training in Tally Prime, GST filing, inventory management, taxation, payroll, and corporate financial accounting.',
      skills: ['Tally Prime', 'GST Taxation', 'Payroll', 'Financial Reports'],
      duration: '6 Weeks',
      format: 'Certificate Included',
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
      category: 'Accounting & Office',
      badge: 'SPEED CERTIFICATION',
      desc: 'Master touch typing with 50+ WPM speed accuracy certification, MS Office Suite (Excel, Word, PowerPoint), and workplace document workflow.',
      skills: ['Touch Typing (50+ WPM)', 'Advanced MS Excel', 'MS Word', 'Data Entry'],
      duration: '4 Weeks',
      format: 'Speed Badge',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8"/>
        </svg>
      )
    },
    {
      id: 4,
      title: 'Full-Stack Web Development',
      category: 'Programming & AI',
      badge: 'JOB-READY',
      desc: 'Learn modern web development from scratch using HTML5, CSS3, JavaScript, React, Node.js, and MongoDB with live portfolio projects.',
      skills: ['React', 'Node.js', 'JavaScript', 'REST APIs'],
      duration: '16 Weeks',
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
      desc: 'Transform raw data into strategic business insights using Python, Pandas, NumPy, Power BI dashboards, and predictive analytics.',
      skills: ['Python', 'Power BI', 'Pandas', 'SQL'],
      duration: '10 Weeks',
      format: 'Portfolio Projects',
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
      desc: 'Create stunning visual assets, brand logos, wireframes, and interactive app prototypes using Figma, Photoshop, and Illustrator.',
      skills: ['Figma', 'Photoshop', 'UI/UX Design', 'Branding'],
      duration: '8 Weeks',
      format: 'Design Portfolio',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.72 1.7-1.61 0-.43-.17-.83-.44-1.13-.24-.28-.39-.64-.39-1.04 0-.88.72-1.6 1.6-1.6H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9z"/>
        </svg>
      )
    }
  ];

  const categories = ['All', 'Programming & AI', 'Accounting & Office', 'Design & Marketing'];

  const filteredCourses = activeCategory === 'All' 
    ? courses 
    : courses.filter(c => c.category === activeCategory);

  return (
    <section className="training-section-wrapper" id="training">
      <div className="training-container">
        
        {/* Header */}
        <div className="training-header">
          <span className="training-badge">SKILL DEVELOPMENT & TRAINING</span>
          <h2 className="training-title">
            Master In-Demand <span className="title-highlight">Professional Courses</span>
          </h2>
          <p className="training-subtitle">
            Hands-on practical training, expert mentorship, and industry-recognized certifications in Python with AI, Tally Prime, Touch Typing, Web Development, and more.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="course-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              
              <div>
                <div className="course-top-row">
                  <div className="course-icon-box">
                    {course.icon}
                  </div>
                  <span className="course-badge-tag">{course.badge}</span>
                </div>

                <h3 className="course-title">{course.title}</h3>
                <p className="course-desc">{course.desc}</p>

                <div className="course-skills-chips">
                  {course.skills.map((skill) => (
                    <span key={skill} className="skill-chip">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="course-footer-row">
                <div className="course-meta-info">
                  <span className="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {course.duration}
                  </span>
                  <span>•</span>
                  <span>{course.format}</span>
                </div>

                <button className="enroll-btn">
                  Enroll <span className="arrow">→</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Custom Corporate & Institutional Training Banner */}
        <div className="custom-training-banner">
          <div className="banner-left">
            <h3>Looking for Corporate Training or Institutional Workshops?</h3>
            <p>We provide customized group training, skill certification, and hands-on workshops tailored for schools, colleges, and enterprise teams.</p>
          </div>
          <button className="banner-cta-btn">
            Inquire For Workshops
          </button>
        </div>

      </div>
    </section>
  );
}
