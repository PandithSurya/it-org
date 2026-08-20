import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import DetailedCaseStudyModal from './DetailedCaseStudyModal';
import './ProjectsSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function RadialScrollGallery() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const totalItems = projectsData.length;
  // Arc parameters matching reference photos
  const radius = 580;
  const angleStep = 38;

  useGSAP(() => {
    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 768px)", () => {
      if (!containerRef.current) return;

      const pinTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=2600",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });

      return () => pinTrigger.kill();
    });

    return () => matchMedia.revert();
  }, { scope: containerRef });

  const anyHovered = hoveredId !== null;

  return (
    <section 
      ref={containerRef} 
      id="projects-section"
      className="radial-gallery-section relative min-h-screen w-full overflow-hidden py-6 flex flex-col justify-between items-center"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#4173A7]/10 blur-[130px] rounded-full pointer-events-none" />

      {/* ============================================================ */}
      {/* DESKTOP SHOWCASE: Arc Showcase Wheel (md+)                  */}
      {/* ============================================================ */}
      <div className="hidden md:block relative w-full h-[580px] overflow-hidden my-auto z-10">
        
        {/* Relative Anchor for Cards */}
        <div className="absolute top-[50px] left-1/2 -translate-x-1/2 w-0 h-0">
          {projectsData.map((project, index) => {
            // Calculate position along arc
            let cardAngle = (index * angleStep) - (scrollProgress * (totalItems - 1) * angleStep);
            
            // Normalize angle to [-180, 180]
            while (cardAngle > 180) cardAngle -= 360;
            while (cardAngle < -180) cardAngle += 360;

            const rad = cardAngle * (Math.PI / 180);
            const x = radius * Math.sin(rad);
            const y = radius * (1 - Math.cos(rad));
            
            // Outward arc tilt matching reference photos
            const rotation = cardAngle * 0.55;

            const absAngle = Math.abs(cardAngle);
            const isVisible = absAngle < 115;
            const zIndex = Math.round(1000 - absAngle * 10);
            
            const opacity = isVisible ? Math.max(0, 1 - Math.pow(absAngle / 115, 2.2)) : 0;
            const scale = Math.max(0.78, 1 - Math.pow(absAngle / 105, 2) * 0.22);

            const isHovered = hoveredId === project.id;
            const currentOpacity = anyHovered ? (isHovered ? 1 : 0.35) : opacity;
            const currentScale = anyHovered ? (isHovered ? 1.06 : scale * 0.95) : scale;
            const currentBlur = anyHovered && !isHovered ? 'blur(5px)' : 'none';

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedProject(project)}
                className={`card-radial-item absolute cursor-pointer rounded-[24px] overflow-hidden shadow-2xl w-[310px] h-[410px] group transition-all duration-300 ${
                  isHovered ? 'scale-105 ring-4 ring-[#4173A7]/50 shadow-2xl bg-white' : 'bg-slate-900 border border-slate-200/60'
                }`}
                style={{
                  left: '0px',
                  top: '0px',
                  transform: `translate(-50%, 0) translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${currentScale})`,
                  zIndex: isHovered ? 2000 : zIndex,
                  opacity: currentOpacity,
                  filter: currentBlur,
                  pointerEvents: isVisible ? 'auto' : 'none'
                }}
              >
                {/* Full Card Background Image */}
                <img
                  src={project.img}
                  alt={project.title}
                  className={`absolute inset-0 w-full object-cover object-top transition-all duration-500 ${
                    isHovered ? 'h-[265px] rounded-t-[24px]' : 'h-full group-hover:scale-105'
                  }`}
                />

                {/* Top Controls Overlay */}
                <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-20">
                  {/* Category Pill Badge */}
                  <span className="rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-md backdrop-blur-md border border-slate-200/60">
                    {project.cat}
                  </span>

                  {/* Top-Right Arrow Circle */}
                  <span className={`rounded-full p-2.5 text-white shadow-md backdrop-blur-md transition-colors ${
                    isHovered ? 'bg-[#4173A7]' : 'bg-[#1e293b]/70 group-hover:bg-[#4173A7]'
                  }`}>
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                {/* Unhovered Dark Gradient Scrim Overlay */}
                {!isHovered && (
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />
                )}

                {/* Bottom Content Morph (Unhovered vs Hovered State) */}
                {isHovered ? (
                  /* HOVERED STATE: White Panel at Bottom (Image 3) */
                  <div className="absolute bottom-0 inset-x-0 bg-white p-4 z-20 flex flex-col gap-2 rounded-b-[24px] border-t border-slate-100 shadow-xl animate-in slide-in-from-bottom-2 duration-300">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">
                        {project.title}
                      </h3>
                      <div className="w-full h-[2px] bg-[#4173A7] my-1.5 rounded-full" />
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#4173A7] hover:bg-[#325a85] px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <span>Detailed Case Study</span>
                      <span className="text-xs font-normal">→</span>
                    </button>
                  </div>
                ) : (
                  /* UNHOVERED STATE: Overlay on Full-Bleed Image (Image 2) */
                  <div className="absolute bottom-5 inset-x-5 z-20 flex flex-col items-start gap-2.5">
                    <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-md">
                      {project.title}
                    </h3>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-slate-800 shadow-lg border border-slate-200/80 transition-all duration-300 hover:bg-white cursor-pointer"
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-[#4173A7]" />
                      <span>Detailed Case Study</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE SHOWCASE: Horizontal Touch-Scroll Snap Slider (< md) */}
      {/* ============================================================ */}
      <div className="block md:hidden relative w-full px-4 my-4 z-10">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 pt-1">
          {projectsData.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="relative w-[290px] h-[390px] snap-center shrink-0 flex-shrink-0 rounded-[24px] overflow-hidden bg-slate-900 border border-slate-200/60 shadow-xl cursor-pointer"
            >
              <img
                src={project.img}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />

              <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
                <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-sm">
                  {project.cat}
                </span>
                <span className="rounded-full bg-[#1e293b]/70 p-2 text-white shadow-md">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 inset-x-4 z-10 flex flex-col items-start gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight drop-shadow-md">
                  {project.title}
                </h3>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-md border border-slate-200/50"
                >
                  <span className="h-2 w-2 rounded-full bg-[#4173A7]" />
                  <span>Detailed Case Study</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Scroll Swipe Indicator */}
        <div className="flex items-center justify-center gap-2 mt-2 text-xs text-slate-500 font-medium">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4173A7] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4173A7]"></span>
          </span>
          <span>Swipe left/right to view all 9 projects</span>
        </div>
      </div>

      {/* Explore All Works Page CTA Button (Below Scrolling Section) */}
      <div className="relative z-20 mt-4 mb-2 flex items-center justify-center">
        <button
          type="button"
          onClick={() => {
            navigate('/works');
            window.scrollTo(0, 0);
          }}
          className="group relative inline-flex items-center gap-3 rounded-full bg-slate-900 px-7 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-xl transition-all duration-300 hover:bg-[#4173A7] hover:scale-105 hover:shadow-2xl cursor-pointer"
        >
          <span>Explore All Client Works</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Case Study Detail Modal Popup */}
      <DetailedCaseStudyModal
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}





