import React from "react";
import { ArrowUp, Heart, Sparkles, Terminal } from "lucide-react";

export default function Footer({ onNavigate }) {
  const handleScrollTop = (e) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#06080d] py-12 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-cyan-500/30">
            M
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              Mohit <span className="text-cyan-400 font-mono">Full-Stack Engineer</span>
            </p>
            <p className="text-xs text-slate-400">
              Crafted with React, Tailwind CSS, GSAP & Lenis
            </p>
          </div>
        </div>

        {/* Center: Status */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>All systems operational • 2026</span>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={handleScrollTop}
          className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 transition-all group"
          aria-label="Back to top"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

      </div>
    </footer>
  );
}
