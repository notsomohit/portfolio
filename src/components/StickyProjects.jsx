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
    const ctx = gsap.context(() => {
      leftCardsRef.current.forEach((card, idx) => {
        if (!card) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActiveIndex(idx),
          onEnterBack: () => setActiveIndex(idx),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative px-6 sm:px-12 lg:px-20 py-40 lg:py-56 bg-[#0A0A0A] border-t border-neutral-900 select-none"
    >
      {/* Section Header */}
      <div className="flex items-baseline gap-4 sm:gap-6 mb-24 lg:mb-36">
        <span className="font-mono text-base sm:text-lg font-bold text-[#8B5CF6]">
          03
        </span>
        <h2 className="font-display text-[clamp(4rem,9vw,8rem)] font-black text-white tracking-tight">
          PROJECTS
        </h2>
      </div>

      {/* Split Sticky Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start relative">
        
        {/* LEFT COLUMN: Stacked Project Blocks */}
        <div className="lg:col-span-6 space-y-48 lg:space-y-64">
          {projectsData.map((project, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={project.id}
                ref={(el) => (leftCardsRef.current[idx] = el)}
                className={`transition-all duration-500 ${
                  isActive ? "opacity-100 scale-100" : "opacity-25 lg:scale-[0.98]"
                }`}
              >
                {/* Meta Category & Index */}
                <div className="flex items-center gap-4 text-xs sm:text-sm font-mono text-neutral-500 uppercase tracking-widest mb-6">
                  <span className="text-[#8B5CF6] font-bold">{project.index}</span>
                  <span>//</span>
                  <span>{project.category}</span>
                </div>

                {/* Big Bold Title */}
                <h3 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4">
                  {project.title}
                </h3>

                <h4 className="text-lg sm:text-xl font-medium text-neutral-300 mb-8 leading-snug">
                  {project.subtitle}
                </h4>

                {/* Description */}
                <p className="text-neutral-400 text-base sm:text-xl leading-relaxed mb-10 max-w-2xl font-normal">
                  {project.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2.5 sm:gap-3.5 mb-12">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs sm:text-sm px-3.5 py-2 rounded-lg bg-[#141414] text-neutral-300 border border-neutral-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-8 text-xs sm:text-sm font-mono uppercase tracking-wider">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-white hover:text-[#8B5CF6] transition-colors py-2 border-b border-white hover:border-[#8B5CF6]"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-neutral-400 hover:text-white transition-colors py-2"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Mobile Inline Image Preview Fallback */}
                <div className="lg:hidden mt-12 w-full aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-800 bg-[#141414]">
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

        {/* RIGHT COLUMN: Sticky Crossfading Image Panel with Uniform Frame */}
        <div className="hidden lg:block lg:col-span-6 sticky top-36">
          <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-800 bg-[#141414] shadow-2xl relative">
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
                    alt={`${project.title} Preview`}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div>

          {/* Sticky Caption Meta */}
          <div className="mt-4 flex items-center justify-between text-xs font-mono text-neutral-500 uppercase tracking-widest px-2">
            <span>SHOWCASE // REAL PREVIEW</span>
            <span className="text-[#8B5CF6]">0{activeIndex + 1} / 0{projectsData.length}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
