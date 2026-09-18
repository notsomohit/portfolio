import React from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";

export default function Footer({ onNavigate }) {
  const handleScrollTop = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate("hero");
    } else if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full bg-[#070707] border-t border-neutral-900 px-5 sm:px-10 lg:px-20 py-10 sm:py-14 select-none z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6 text-xs font-mono text-neutral-500 uppercase tracking-widest">
          <span>© 2026 MOHIT. ALL RIGHTS RESERVED.</span>
          <span className="hidden sm:inline text-neutral-700">//</span>
          <span className="text-neutral-600">DESIGNED WITH RESTRAINT</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono uppercase tracking-wider">
          <a
            href="mailto:mohitascend07@gmail.com"
            className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
          >
            EMAIL <ArrowUpRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
          </a>

          <a
            href="https://github.com/notsomohit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
          >
            GITHUB <ArrowUpRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
          </a>

          <a
            href="https://www.linkedin.com/in/notsomohit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
          >
            LINKEDIN <ArrowUpRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
          </a>

          <button
            onClick={handleScrollTop}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] hover:bg-[#1c1c1c] text-neutral-300 hover:text-white border border-neutral-800 transition-all group focus:outline-none"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#8B5CF6] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
