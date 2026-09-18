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
  const projectBlocksRef = useRef([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const blocks = projectBlocksRef.current;
      if (!blocks || blocks.length === 0) return;

      const triggers = blocks.map((block, idx) => {
        if (!block) return null;
        return ScrollTrigger.create({
          trigger: block,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(idx);
            }
          },
        });
      });

      return () => {
        triggers.forEach((t) => t && t.kill());
      };
    });

    return () => mm.revert();
  }, []);

  const activeProject = projectsData[activeIndex] || projectsData[0];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative px-5 sm:px-10 lg:px-20 py-16 sm:py-20 md:py-24 lg:py-28 bg-[#0A0A0A] border-t border-neutral-900 select-none"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-8 sm:mb-12 lg:mb-14">
          <div className="flex items-baseline gap-3 sm:gap-6 mb-3 sm:mb-4">
            <span className="font-mono text-sm sm:text-lg font-bold text-[#8B5CF6]">
              03
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight">
              PROJECTS
            </h2>
          </div>
          <div className="w-full h-[1px] bg-neutral-800" />
        </div>

        <div className="hidden lg:grid grid-cols-12 gap-12 lg:gap-16 items-start relative">
          <div className="col-span-6 flex flex-col">
            {projectsData.map((project, idx) => (
              <div
                key={project.id}
                ref={(el) => (projectBlocksRef.current[idx] = el)}
                className="min-h-[75vh] flex flex-col justify-center py-12"
              >
                <div className="flex items-center gap-3 text-xs sm:text-sm font-mono uppercase tracking-widest mb-4">
                  <span className="text-[#8B5CF6] font-bold">{project.index}</span>
                  <span className="text-neutral-600">//</span>
                  <span className="text-neutral-300">{project.category}</span>
                </div>

                <div className="mb-4">
                  <h3 className="font-display text-4xl lg:text-6xl font-black text-white tracking-tight mb-2">
                    {project.title}
                  </h3>
                  <h4 className="text-base sm:text-lg font-medium text-neutral-300 leading-snug">
                    {project.subtitle}
                  </h4>
                </div>

                <p className="text-neutral-400 text-sm lg:text-base leading-relaxed max-w-xl font-normal mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-3 py-1 rounded-md bg-[#141414] text-neutral-300 border border-neutral-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 text-xs sm:text-sm font-mono uppercase tracking-wider">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white hover:text-[#8B5CF6] transition-colors py-1.5 border-b border-white hover:border-[#8B5CF6] group"
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
                      className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors py-1.5"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-4 h-4 text-[#8B5CF6]" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-6 sticky top-24 self-start py-8">
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                {projectsData.map((p, idx) => (
                  <div
                    key={p.id}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      activeIndex === idx
                        ? "w-10 bg-[#8B5CF6]"
                        : "w-3 bg-neutral-800"
                    }`}
                  />
                ))}
              </div>
              <div className="font-mono text-xs text-neutral-400 transition-opacity duration-500">
                <span className="text-[#8B5CF6] font-bold">0{activeIndex + 1}</span>
                <span className="text-neutral-600 mx-1">/</span>
                <span className="text-neutral-500">0{projectsData.length}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest mb-3 px-1 text-neutral-400 transition-opacity duration-500">
              <div className="flex items-center gap-2">
                <span className="text-[#8B5CF6] font-bold">{activeProject.index}</span>
                <span className="text-neutral-600">//</span>
                <span className="text-neutral-300">{activeProject.category}</span>
              </div>
              <span className="text-neutral-500 font-mono">LIVE PREVIEW</span>
            </div>

            <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-800 bg-[#141414] shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative flex flex-col">
              <div className="h-9 px-4 bg-[#181818] border-b border-neutral-800 flex items-center justify-between shrink-0 z-20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                </div>
                <div className="font-mono text-[11px] text-neutral-400 tracking-wider transition-all duration-500">
                  {activeProject.id}.notsomohit.dev
                </div>
                <div className="w-8" />
              </div>

              <div className="relative flex-1 w-full h-full overflow-hidden bg-black">
                {projectsData.map((project, idx) => {
                  const isCurrent = activeIndex === idx;
                  return (
                    <div
                      key={project.id}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
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
            </div>

            <div className="mt-3 flex items-center justify-between text-xs font-mono uppercase tracking-widest px-1">
              <span className="text-neutral-500">SHOWCASE // REAL PREVIEW</span>
              <div className="flex items-center gap-1 font-mono">
                <span className="text-[#8B5CF6] font-bold">0{activeIndex + 1}</span>
                <span className="text-neutral-600">/</span>
                <span className="text-neutral-500">0{projectsData.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden space-y-14 sm:space-y-20 py-2">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="flex flex-col space-y-4 opacity-100"
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                <span className="text-[#8B5CF6] font-bold">{project.index}</span>
                <span className="text-neutral-600">//</span>
                <span className="text-neutral-400">{project.category}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight">
                {project.title}
              </h3>

              <h4 className="text-sm sm:text-base font-medium text-neutral-300 leading-snug">
                {project.subtitle}
              </h4>

              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-normal">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-[#141414] text-neutral-300 border border-neutral-800"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-wider pt-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-[#8B5CF6] transition-colors py-1 border-b border-white hover:border-[#8B5CF6] group"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
                  <span>View Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
                </a>

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors py-1"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  </a>
                )}
              </div>

              <div className="mt-3 w-full aspect-[16/10] rounded-xl overflow-hidden border border-neutral-800 bg-[#141414] shadow-lg">
                <img
                  src={project.image}
                  alt={`${project.title} Preview`}
                  className="w-full h-full object-cover opacity-100"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
