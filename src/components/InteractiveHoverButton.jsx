import React from 'react';
import { ArrowRight } from 'lucide-react';

export function InteractiveHoverButton({
  text = "View Project",
  hoverText = "Case Study",
  onClick,
  className = ""
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-500 overflow-hidden border border-[#406A99]/40 bg-card text-foreground cursor-pointer shadow-md hover:border-[#406A99] ${className}`}
    >
      {/* Background Radial Expand Effect */}
      <span className="absolute inset-0 m-auto h-0 w-0 rounded-full bg-[#406A99] transition-all duration-500 ease-out group-hover:h-56 group-hover:w-56 group-hover:scale-[1.8] -z-0" />

      {/* Content wrapper */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {/* Default Text (slides out right on hover) */}
        <span className="inline-block transition-all duration-300 ease-in-out group-hover:translate-x-10 group-hover:opacity-0">
          {text}
        </span>

        {/* Hover Text + Icon (slides in from left on hover) */}
        <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:text-white whitespace-nowrap">
          <span>{hoverText}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </span>
    </button>
  );
}

export default InteractiveHoverButton;
