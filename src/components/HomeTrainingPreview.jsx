import { useNavigate } from 'react-router-dom';
import './HomeTrainingPreview.css';

export default function HomeTrainingPreview() {
  const navigate = useNavigate();

  const featuredCourses = [
    {
      id: 1,
      title: 'Python with AI & Machine Learning',
      badge: 'POPULAR & IN-DEMAND',
      desc: 'Master Python programming, data structures, algorithms, and build real-world AI models using OpenAI APIs, Neural Networks, and Automation.',
      tags: ['Python', 'Machine Learning', 'OpenAI APIs', 'AI Automation'],
      duration: '12 Weeks',
      format: 'Certificate Included',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
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
      badge: 'CAREER TRACK',
      desc: 'Comprehensive practical training in Tally Prime, GST filing, inventory management, taxation, payroll, and corporate financial accounting.',
      tags: ['Tally Prime', 'GST Taxation', 'Payroll', 'Financial Reports'],
      duration: '6 Weeks',
      format: 'Certificate Included',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop',
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
      title: 'Computer Typing & Speed Certification',
      badge: '50+ WPM SPEED BADGE',
      desc: 'Master touch typing with 50+ WPM speed accuracy certification, MS Office Suite (Excel, Word, PowerPoint), and workplace document workflow.',
      tags: ['Touch Typing (50+ WPM)', 'Advanced MS Excel', 'MS Word', 'Data Entry'],
      duration: '4 Weeks',
      format: 'Speed Certificate',
      thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8"/>
        </svg>
      )
    }
  ];

  return (
    <section className="home-training-wrapper">
      <div className="home-training-container">
        
        {/* Editorial Header Row */}
        <div className="home-training-header-row">
          <div className="header-title-box">
            <span className="home-training-badge">
              <span className="badge-dot"></span>
              SKILL DEVELOPMENT ACADEMY
            </span>
            <h2 className="home-training-title">
              Industry-Oriented <span className="title-blue">Skill Courses</span>
            </h2>
          </div>

          <div className="header-stats-row">
            <div className="header-stat-item">
              <span className="h-stat-num">100%</span>
              <span className="h-stat-desc">Practical Labs</span>
            </div>
            <div className="header-stat-item">
              <span className="h-stat-num">500+</span>
              <span className="h-stat-desc">Graduates</span>
            </div>
            <div className="header-stat-item">
              <span className="h-stat-num">Placement</span>
              <span className="h-stat-desc">Assistance</span>
            </div>
          </div>
        </div>

        {/* 3 Premium Visual Course Cards */}
        <div className="featured-courses-grid">
          {featuredCourses.map((course) => (
            <div 
              key={course.id} 
              className="featured-card-top1"
              onClick={() => {
                navigate('/training');
                window.scrollTo(0, 0);
              }}
            >
              {/* Thumbnail Media Banner */}
              <div 
                className="card-thumbnail-box" 
                style={{ backgroundImage: `url(${course.thumbnail})` }}
              >
                <div className="card-thumbnail-overlay"></div>
                <span className="card-top-tag">{course.badge}</span>
                <div className="card-icon-floating">
                  {course.icon}
                </div>
              </div>

              {/* Card Body */}
              <div className="card-body-content">
                <div>
                  <h3 className="card-title-top1">{course.title}</h3>
                  <p className="card-desc-top1">{course.desc}</p>

                  <div className="card-skills-row">
                    {course.tags.map((tag) => (
                      <span key={tag} className="skill-tag-pill">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="card-footer-top1">
                  <div className="meta-duration">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {course.duration}
                  </div>

                  <span className="card-link-action">
                    Curriculum & Details
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Simple Centered View More Button */}
        <div className="view-more-container">
          <button 
            className="view-more-btn"
            onClick={() => {
              navigate('/training');
              window.scrollTo(0, 0);
            }}
          >
            <span>View More</span>
            <svg className="view-more-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
