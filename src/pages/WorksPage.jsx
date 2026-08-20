import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import DetailedCaseStudyModal from '../components/DetailedCaseStudyModal';
import './WorksPage.css';

export default function WorksPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  // Extract unique category names
  const categories = ['All', ...new Set(projectsData.map(p => p.cat))];

  // Filter projects by selected category
  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.cat === selectedCategory);

  return (
    <div className="works-page-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header Section */}
        <div className="text-center pt-6 pb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4173A7]/10 px-4 py-1.5 text-xs font-extrabold text-[#4173A7] border border-[#4173A7]/20 uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Portfolio</span>
          </span>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Architecting High-Velocity <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#4173A7] to-[#25466b] bg-clip-text text-transparent">
              Digital Solutions & Applications
            </span>
          </h1>

          <p className="mt-4 mb-8 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Explore our full catalog of high-conversion client web apps, multi-location franchise platforms, and enterprise digital architecture.
          </p>

          {/* Filter Pills Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto pt-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`filter-pill-btn px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border border-slate-200/80 cursor-pointer shadow-xs ${
                  selectedCategory === category ? 'active' : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List — Minimal & Premium Zig-Zag Alternating Layout */}
        <div className="space-y-16 sm:space-y-24 py-8">
          {filteredProjects.map((project, index) => {
            // Even index (0, 2, 4...): Image on Left, Details on Right
            // Odd index (1, 3, 5...): Details on Left, Image on Right
            const isImageLeft = index % 2 === 0;

            return (
              <div
                key={project.id}
                className="project-zigzag-item grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* IMAGE COLUMN */}
                <div
                  className={`lg:col-span-7 ${
                    isImageLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-img-frame group block cursor-pointer"
                  >
                    {/* Mac Header Bar */}
                    <div className="mac-dots-header">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 truncate max-w-[220px]">
                        {project.url.replace('https://', '')}
                      </span>
                      <span className="rounded-full bg-slate-100 p-1.5 text-slate-500 group-hover:bg-[#4173A7] group-hover:text-white transition-colors">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </span>
                    </div>

                    {/* Screenshot Container */}
                    <div className="relative w-full h-[320px] sm:h-[420px] bg-slate-950 overflow-hidden">
                      <img
                        src={project.img}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Hover Overlay Button (Directs to Live Site) */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#4173A7] px-5 py-2.5 text-xs font-bold text-white shadow-xl transform group-hover:scale-105 transition-transform">
                          <span>Visit Live Website</span>
                          <ExternalLink className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </a>
                </div>

                {/* DETAILS COLUMN */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isImageLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  {/* Eyebrow & Category Badge */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[#4173A7] font-extrabold text-xs uppercase tracking-widest">
                      {project.client}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="rounded-full bg-slate-200/70 border border-slate-300/60 px-3 py-1 text-[11px] font-bold text-slate-700">
                      {project.cat}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                      {project.title}
                    </h2>
                    <p className="text-base sm:text-lg font-bold text-slate-700 mt-1">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-slate-600 font-normal">
                    {project.description}
                  </p>

                  {/* Key Metrics / Results Cards */}
                  <div className="grid grid-cols-3 gap-2.5 pt-1 pb-1">
                    {project.results.map((res) => (
                      <div key={res.label} className="metric-card-box">
                        <span className="text-base sm:text-lg font-black text-[#4173A7] block">
                          {res.value}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-slate-500 leading-tight block mt-0.5 font-medium">
                          {res.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Service & Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-full border border-slate-200/90 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-600 shadow-2xs"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200/80">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#4173A7] hover:bg-[#325a85] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer"
                    >
                      <span>Detailed Case Study</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-slate-100 border border-slate-300 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 shadow-sm transition-all duration-300"
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Case Study Detail Modal */}
      <DetailedCaseStudyModal
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

