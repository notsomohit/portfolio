import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "../data/projectsData";
import { GithubIcon } from "./Icons";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function StickyProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const leftCardsRef = useRef([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Trigger active project index as user scrolls past each left block on desktop
      leftCardsRef.current.forEach((card, idx) => {
        if (!card) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveIndex(idx),
          onEnterBack: () => setActiveIndex(idx),
        });
      });
    });

    return () => mm.revert();
  }, []);

  const activeProject = projectsData[activeIndex] || projectsData[0];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative px-6 sm:px-12 lg:px-20 py-32 sm:py-40 lg:py-56 bg-[#0A0A0A] border-t border-neutral-900 select-none"
    >
      {/* Top Section Header with Consistent Divider */}
      <div className="mb-20 sm:mb-28 lg:mb-36">
        <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
          <span className="font-mono text-base sm:text-lg font-bold text-[#8B5CF6]">
            03
          </span>
          <h2 className="font-display text-[clamp(2.75rem,8vw,8rem)] font-black text-white tracking-tight">
            PROJECTS
          </h2>
        </div>
        <div className="w-full h-[1px] bg-neutral-800" />
      </div>

      {/* Split Grid: Left scrolling blocks, Right sticky panel for the ENTIRE desktop section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start relative min-h-screen">
        
        {/* LEFT COLUMN: Stacked Project Blocks */}
        <div className="lg:col-span-6 space-y-36 sm:space-y-48 lg:space-y-72 pb-16 lg:pb-24">
          {projectsData.map((project, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={project.id}
                ref={(el) => (leftCardsRef.current[idx] = el)}
                className="transition-all duration-500 will-change-transform lg:opacity-20 lg:scale-[0.98]"
                style={{
                  opacity: typeof window !== "undefined" && window.innerWidth >= 1024 ? (isActive ? 1 : 0.2) : 1,
                  transform: typeof window !== "undefined" && window.innerWidth >= 1024 ? (isActive ? "scale(1)" : "scale(0.98)") : "none",
                }}
              >
                {/* 1. Small Violet Index + Category Micro-Label */}
                <div className="flex items-center gap-3 text-xs sm:text-sm font-mono uppercase tracking-widest mb-4 sm:mb-6">
                  <span className="text-[#8B5CF6] font-bold">{project.index}</span>
                  <span className="text-neutral-600">//</span>
                  <span className="text-neutral-400">{project.category}</span>
                </div>

                {/* 2. Giant Display Project Name */}
                <h3 className="font-display text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight mb-3 sm:mb-4">
                  {project.title}
                </h3>

                {/* 3. Subtitle Line */}
                <h4 className="text-base sm:text-xl font-medium text-neutral-300 mb-6 sm:mb-8 leading-snug">
                  {project.subtitle}
                </h4>

                {/* 4. Paragraph Description */}
                <p className="text-neutral-400 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-10 max-w-2xl font-normal">
                  {project.description}
                </p>

                {/* 5. Wrapped Row of Individual Tech Tag Pills */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs sm:text-sm px-3 sm:px-3.5 py-1.5 rounded-md bg-[#141414] text-neutral-300 border border-neutral-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* 6. Links: Icon before VIEW REPOSITORY ↗ and LIVE DEMO ↗ */}
                <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm font-mono uppercase tracking-wider">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-white hover:text-[#8B5CF6] transition-colors py-2 border-b border-white hover:border-[#8B5CF6] group"
                  >
                    <GithubIcon className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                    <span>View Repository</span>
                    <ArrowUpRight className="w-4 h-4 text-[#8B5CF6]" />
                  </a>

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-neutral-400 hover:text-white transition-colors py-2"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-4 h-4 text-[#8B5CF6]" />
                    </a>
                  )}
                </div>

                {/* Mobile Inline Image Preview Fallback (In-flow stack, not sticky) */}
                <div className="lg:hidden mt-8 sm:mt-12 w-full aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-800 bg-[#141414] shadow-2xl">
                  <img
                    src={project.image}
                    alt={`${project.title} Preview`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Continuously Pinned Sticky Browser Preview Panel (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-6 sticky top-28 self-start w-full">
          
          {/* Top Showcase Chrome: Micro-label and Category */}
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest mb-3 px-1 text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="text-[#8B5CF6] font-bold">{activeProject.index}</span>
              <span className="text-neutral-600">//</span>
              <span className="text-neutral-300">{activeProject.category}</span>
            </div>
            <span className="text-neutral-500 font-mono">LIVE PREVIEW</span>
          </div>

          {/* Browser Window Mockup Frame */}
          <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-800 bg-[#141414] shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative flex flex-col">
            
            {/* Top Browser Bar Chrome */}
            <div className="h-9 px-4 bg-[#181818] border-b border-neutral-800 flex items-center justify-between shrink-0 z-20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              </div>
              <div className="font-mono text-[11px] text-neutral-500 tracking-wider">
                {activeProject.id}.notsomohit.dev
              </div>
              <div className="w-8" />
            </div>

            {/* Image Showcase Container with Smooth Crossfade */}
            <div className="relative flex-1 w-full h-full overflow-hidden bg-black">
              {projectsData.map((project, idx) => {
                const isCurrent = activeIndex === idx;
                return (
                  <div
                    key={project.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isCurrent
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} Screenshot Preview`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Showcase Chrome: Micro-labels & Dynamic Pagination */}
          <div className="mt-4 flex items-center justify-between text-xs font-mono uppercase tracking-widest px-1">
            <span className="text-neutral-500">SHOWCASE // REAL PREVIEW</span>
            <div className="flex items-center gap-1">
              <span className="text-[#8B5CF6] font-bold">0{activeIndex + 1}</span>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-500">0{projectsData.length}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
