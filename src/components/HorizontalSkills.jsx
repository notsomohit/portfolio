import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillClusters } from "../data/skillsData";

import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPostgresql,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPandas,
  SiNumpy,
  SiMongodb,
  SiGit,
  SiGithub,
  SiTailwindcss,
  SiPostman,
  SiJsonwebtokens,
  SiAuth0,
  SiXampp,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { BsShieldLockFill } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

const iconComponents = {
  SiJavascript,
  SiTypescript,
  SiPython,
  FaJava,
  SiPostgresql,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPandas,
  SiNumpy,
  SiMongodb,
  SiGit,
  SiGithub,
  SiTailwindcss,
  TbApi,
  SiPostman,
  SiJsonwebtokens,
  SiAuth0,
  BsShieldLockFill,
  SiXampp,
};

export default function HorizontalSkills() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const headerRef = useRef(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollProgress = useRef(0);
  const scrollTriggerInstance = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current;
      const container = containerRef.current;
      const header = headerRef.current;

      if (!track || !container) return;

      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const getScrollAmount = () => {
        if (!track) return 0;
        return Math.max(0, track.scrollWidth - window.innerWidth + 160);
      };

      const masterTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${Math.max(getScrollAmount() * 1.25, 1200)}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      scrollTriggerInstance.current = masterTween.scrollTrigger;

      const clusterStages = track.querySelectorAll(".skill-cluster-stage");
      clusterStages.forEach((cluster) => {
        const titleBlock = cluster.querySelector(".cluster-title-block");
        const iconsBlock = cluster.querySelector(".cluster-icons-block");

        if (iconsBlock) {
          gsap.set(iconsBlock, { opacity: 1, scale: 1 });
        }

        if (titleBlock) {
          gsap.fromTo(
            titleBlock,
            { y: 0, opacity: 1 },
            {
              y: -50,
              opacity: 0,
              ease: "power1.out",
              scrollTrigger: {
                trigger: cluster,
                containerAnimation: masterTween,
                start: "center 55%",
                end: "right 20%",
                scrub: true,
              },
            }
          );
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      const container = containerRef.current;
      const header = headerRef.current;

      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const clusterStages = container?.querySelectorAll(".skill-cluster-stage");
      clusterStages?.forEach((cluster) => {
        const titleBlock = cluster.querySelector(".cluster-title-block");
        if (titleBlock) {
          gsap.fromTo(
            titleBlock,
            { y: 0, opacity: 1 },
            {
              y: -20,
              opacity: 0.25,
              ease: "power1.out",
              scrollTrigger: {
                trigger: cluster,
                start: "top 30%",
                end: "top 0%",
                scrub: true,
              },
            }
          );
        }
      });
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      mm.revert();
    };
  }, []);

  const handleMouseDown = (e) => {
    if (window.innerWidth < 768 || !scrollTriggerInstance.current) return;
    isDragging.current = true;
    startX.current = e.pageX;
    startScrollProgress.current = scrollTriggerInstance.current.progress;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !scrollTriggerInstance.current) return;
    const dx = e.pageX - startX.current;
    const st = scrollTriggerInstance.current;
    const totalDist = st.end - st.start;
    if (totalDist <= 0) return;

    const progressDelta = -dx / totalDist;
    const newProgress = Math.max(0, Math.min(1, startScrollProgress.current + progressDelta));
    
    const targetScroll = st.start + newProgress * totalDist;
    if (window.__lenis) {
      window.__lenis.scrollTo(targetScroll, { immediate: true });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "auto" });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <section
      id="skills"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0A0A0A] py-16 sm:py-20 md:py-24 lg:py-0 border-t border-neutral-900 select-none"
    >
      <div ref={headerRef} className="px-5 sm:px-10 lg:px-20 pt-6 sm:pt-12 lg:pt-14 pb-2 shrink-0">
        <div className="flex items-baseline gap-3 sm:gap-6 mb-3 sm:mb-4">
          <span className="font-mono text-sm sm:text-lg font-bold text-[#8B5CF6]">
            02
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight">
            SKILLS
          </h2>
        </div>
        <div className="w-full h-[1px] bg-neutral-800" />
      </div>

      <div className="w-full overflow-x-auto md:overflow-visible custom-repo-scroll pb-6 md:pb-0 scroll-smooth">
        <div
          ref={trackRef}
          className="flex flex-row items-stretch md:items-center gap-8 sm:gap-14 md:gap-24 lg:gap-32 px-5 sm:px-10 lg:px-20 pr-16 sm:pr-32 md:pr-48 lg:pr-64 w-max py-4 md:py-0 md:-mt-8"
        >
          {skillClusters.map((cluster) => (
            <div
              key={cluster.name}
              className="skill-cluster-stage shrink-0 flex flex-col justify-center min-w-[280px] sm:min-w-[420px] md:min-w-[480px] lg:min-w-[580px] relative"
            >
              <div className="cluster-title-block will-change-transform mb-4 sm:mb-6 lg:mb-8">
                <div className="flex items-baseline gap-2.5 sm:gap-4 mb-2.5 sm:mb-3">
                  <span className="font-mono text-xs sm:text-base font-bold text-[#8B5CF6]">
                    {cluster.index}
                  </span>
                  <h3 className="font-display text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                    {cluster.name}
                  </h3>
                </div>
                <div className="w-full h-[1px] bg-neutral-800" />
              </div>

              <div className="cluster-icons-block will-change-transform transition-all duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-5">
                  {cluster.skills.map((skill) => {
                    const Icon = iconComponents[skill.iconKey] || SiJavascript;
                    return (
                      <div
                        key={skill.name}
                        className="flex items-center gap-3 sm:gap-4 group"
                      >
                        <div className="w-[52px] h-[52px] sm:w-[68px] sm:h-[68px] lg:w-[76px] lg:h-[76px] rounded-xl sm:rounded-2xl bg-[#141414] border border-neutral-800/80 flex items-center justify-center shrink-0 group-hover:border-neutral-600 transition-all duration-300 shadow-md">
                          <Icon
                            className="w-5 h-5 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform duration-300"
                            style={{ color: skill.color }}
                          />
                        </div>

                        <span className="font-mono text-xs sm:text-base lg:text-lg font-medium text-neutral-200 group-hover:text-white transition-colors duration-200">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 sm:px-10 lg:px-20 pb-6 sm:pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest border-t border-neutral-900 pt-4 sm:pt-6 shrink-0">
        <div className="text-neutral-500 tracking-wider text-[10px] sm:text-xs">
          07 CATEGORIES // TECH & ARCHITECTURE
        </div>
        <div className="text-neutral-500 tracking-wider text-[10px] sm:text-xs">
          LANGUAGES — FRAMEWORKS — DATA — DB — TOOLS — AUTH
        </div>
      </div>
    </section>
  );
}
