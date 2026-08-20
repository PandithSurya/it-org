import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ExternalLink, X } from "lucide-react";

export function DetailedCaseStudyModal({ selectedProject, onClose }) {
  if (!selectedProject) return null;

  return (
    <DialogPrimitive.Root open={!!selectedProject} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        {/* Backdrop Overlay with Blur */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[999] bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in-0" />

        {/* Modal Window Container */}
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
          <DialogPrimitive.Content className="relative max-w-3xl w-[94vw] max-h-[90vh] flex flex-col border border-slate-200/80 bg-white text-slate-900 shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 fade-in-0 duration-300 focus:outline-none">
            
            {/* Top Close Button (X icon) */}
            <DialogPrimitive.Close
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer z-30"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>

            {/* Padded Header Box (Fixed at top) */}
            <div className="p-5 sm:p-7 pb-4 border-b border-slate-100 pr-12 bg-white">
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow text-[#4173A7] font-bold text-[11px] sm:text-xs uppercase tracking-widest">
                  {selectedProject.client}
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                  {selectedProject.cat}
                </span>
              </div>
              <DialogPrimitive.Title className="mt-1.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display leading-snug">
                {selectedProject.tagline}
              </DialogPrimitive.Title>
            </div>

            {/* Middle Scrollable Body */}
            <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
              
              {/* 2-Column Main Section */}
              <div className="grid items-center gap-5 sm:gap-6 lg:grid-cols-12">
                
                {/* Left Column — Live Image Preview (5 Cols) */}
                <div className="lg:col-span-5">
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative overflow-hidden rounded-xl border border-slate-200/80 shadow-md transition-all duration-300 hover:border-[#4173A7]"
                  >
                    <img
                      src={selectedProject.img}
                      alt={selectedProject.title}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4173A7] px-4 py-1.5 text-xs font-semibold text-white shadow-md transform group-hover:scale-105 transition-transform">
                        <span>Visit Site</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </a>
                </div>

                {/* Right Column — Overview & Impact Metrics (7 Cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <DialogPrimitive.Description className="text-xs sm:text-sm leading-relaxed text-slate-600">
                    {selectedProject.description}
                  </DialogPrimitive.Description>

                  {/* Metrics Cards Grid */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 py-2">
                    {selectedProject.results.map((r) => (
                      <div key={r.label} className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-2 sm:p-2.5 text-left">
                        <span className="font-display text-sm sm:text-lg font-bold text-[#4173A7] block truncate">
                          {r.value}
                        </span>
                        <span className="text-[9px] sm:text-[11px] text-slate-500 leading-tight block mt-0.5">
                          {r.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Service Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedProject.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Challenge & Solution Side-by-Side Cards */}
              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4">
                  <span className="font-semibold text-slate-900 block text-xs mb-1">
                    The Challenge
                  </span>
                  <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
                    {selectedProject.challenge}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4">
                  <span className="font-semibold text-slate-900 block text-xs mb-1">
                    Our Solution
                  </span>
                  <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

            </div>

            {/* Padded Footer Box (Fixed at bottom) */}
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3">
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#4173A7]/30 bg-[#4173A7]/10 px-5 py-2 text-xs font-semibold text-[#4173A7] transition-all duration-300 hover:bg-[#4173A7] hover:text-white"
              >
                <span>Explore Website</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default DetailedCaseStudyModal;
