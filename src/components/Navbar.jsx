import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

const navLinks = [
  { num: "//", label: "HOME", id: "hero" },
  { num: "01", label: "ABOUT", id: "about" },
  { num: "02", label: "SKILLS", id: "skills" },
  { num: "03", label: "PROJECTS", id: "projects" },
  { num: "04", label: "GITHUB", id: "github" },
];

export default function Navbar({ activeSection, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-12 lg:px-20 py-6 sm:py-8 pointer-events-none">
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "hero")}
          className="pointer-events-auto flex items-center group focus:outline-none"
          aria-label="Mohit - Home"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center text-[#0A0A0A] font-black text-sm sm:text-base tracking-tighter group-hover:scale-105 transition-transform duration-200 shadow-md">
            M
          </div>
        </a>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="pointer-events-auto p-3 sm:p-3.5 rounded-full bg-[#141414] hover:bg-[#1f1f1f] text-white border border-[#262626] transition-all duration-200 focus:outline-none flex flex-col items-center justify-center gap-1.5 w-11 h-11 sm:w-12 sm:h-12 group"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-[4.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-[3px]" : ""
            }`}
          />
        </button>
      </header>

      <div
        className={`fixed inset-0 bg-[#0A0A0A] z-40 flex flex-col justify-between p-6 sm:p-14 lg:p-20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="flex justify-between items-center text-xs font-mono text-neutral-500 uppercase tracking-widest border-b border-neutral-800 pb-6 pt-16 sm:pt-14">
          <span>NAVIGATION</span>
          <span className="text-[#8B5CF6]">05 SECTIONS</span>
        </div>

        <nav className="my-auto flex flex-col gap-3 sm:gap-6 py-6">
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              className="group flex items-baseline gap-4 sm:gap-8 transition-all duration-300"
            >
              <span className="font-mono text-xs sm:text-base text-[#8B5CF6] opacity-70 group-hover:opacity-100 transition-opacity">
                {item.num}
              </span>
              <span className="font-display text-3xl sm:text-6xl lg:text-8xl font-black text-neutral-400 group-hover:text-white group-hover:translate-x-3 sm:group-hover:translate-x-4 transition-all duration-200">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-neutral-400 pt-6 border-t border-neutral-800">
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <a
              href="mailto:mohitascend07@gmail.com"
              className="hover:text-white flex items-center gap-1.5 transition-colors"
            >
              EMAIL <ArrowUpRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
            </a>
            <a
              href="https://github.com/notsomohit"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1.5 transition-colors"
            >
              GITHUB <ArrowUpRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
            </a>
            <a
              href="https://www.linkedin.com/in/notsomohit"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1.5 transition-colors"
            >
              LINKEDIN <ArrowUpRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
            </a>
          </div>

          <span className="text-neutral-600 hidden sm:inline">FULL-STACK DEVELOPER // 2026</span>
        </div>
      </div>
    </>
  );
}
