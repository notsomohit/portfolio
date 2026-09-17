"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillClusters } from "../data/skillsData";

// Brand Icons
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

  // Desktop Drag-to-Scroll refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollProgress = useRef(0);
  const scrollTriggerInstance = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // DESKTOP (>= 768px): Pinned Horizontal Track
    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current;
      const container = containerRef.current;
      const header = headerRef.current;

      if (!track || !container) return;

      // Animate Section Header on arrival
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

      // Dynamic calculation of total horizontal scroll distance ensuring full reach of all 7 clusters
      const getScrollAmount = () => {
        if (!track) return 0;
        const totalW = track.scrollWidth;
        const viewW = window.innerWidth;
        // Generous right padding offset ensures last item (cluster 07) is 100% visible
        return Math.max(0, totalW - viewW + 120);
      };

      // Desktop pinned horizontal scroll master tween
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

      // Gentle parallax / presence transition for each cluster stage
      const clusterStages = track.querySelectorAll(".skill-cluster-stage");
      clusterStages.forEach((cluster) => {
        const titleBlock = cluster.querySelector(".cluster-title-block");
        const iconsBlock = cluster.querySelector(".cluster-icons-block");

        if (titleBlock) {
          gsap.fromTo(
            titleBlock,
            { opacity: 0.85, y: 0 },
            {
              opacity: 1,
              y: 0,
              ease: "power1.out",
              scrollTrigger: {
                trigger: cluster,
                containerAnimation: masterTween,
                start: "left 90%",
                end: "center 50%",
                scrub: true,
              },
            }
          );
        }

        if (iconsBlock) {
          gsap.fromTo(
            iconsBlock,
            { scale: 0.98, opacity: 0.85 },
            {
              scale: 1,
              opacity: 1,
              ease: "power1.out",
              scrollTrigger: {
                trigger: cluster,
                containerAnimation: masterTween,
                start: "left 90%",
                end: "center 50%",
                scrub: true,
              },
            }
          );
        }
      });
    });

    // MOBILE (< 768px): Header entrance & natural touch horizontal track
    mm.add("(max-width: 767px)", () => {
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
    });

    // Ensure ScrollTrigger gets accurate measurements after DOM paint
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      mm.revert();
    };
  }, []);

  // Desktop Mouse Drag to scroll horizontally
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

    // Convert pixel drag to scroll progress
    const progressDelta = -dx / totalDist;
    const newProgress = Math.max(0, Math.min(1, startScrollProgress.current + progressDelta));
    
    // Scroll window / Lenis to corresponding position
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
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0A0A0A] py-16 sm:py-20 md:py-0 border-t border-neutral-900 select-none"
    >
      {/* 1. Section Header */}
      <div ref={headerRef} className="px-6 sm:px-12 lg:px-20 pt-10 sm:pt-14 pb-2 shrink-0">
        <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
          <span className="font-mono text-base sm:text-lg font-bold text-[#8B5CF6]">
            02
          </span>
          <h2 className="font-display text-[clamp(2.75rem,8vw,8rem)] font-black text-white tracking-tight">
            SKILLS
          </h2>
        </div>
        <div className="w-full h-[1px] bg-neutral-800" />
      </div>

      {/* 2. Track Container: Desktop = GSAP Pinned Horizontal Track; Mobile = Smooth Touch Scrollable Horizontal Strip */}
      <div className="w-full overflow-x-auto md:overflow-visible custom-repo-scroll pb-6 md:pb-0">
        <div
          ref={trackRef}
          className="flex flex-row items-stretch md:items-center gap-10 sm:gap-16 md:gap-28 lg:gap-36 px-6 sm:px-12 lg:px-20 pr-16 sm:pr-32 md:pr-48 lg:pr-64 w-max py-6 md:py-0 md:-mt-10"
        >
          {skillClusters.map((cluster) => (
            <div
              key={cluster.name}
              className="skill-cluster-stage shrink-0 flex flex-col justify-center min-w-[300px] sm:min-w-[440px] md:min-w-[500px] lg:min-w-[620px] relative"
            >
              {/* Sub-Category Title Header */}
              <div className="cluster-title-block will-change-transform mb-6 sm:mb-8">
                <div className="flex items-baseline gap-3 sm:gap-4 mb-3">
                  <span className="font-mono text-sm sm:text-lg font-bold text-[#8B5CF6]">
                    {cluster.index}
                  </span>
                  <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                    {cluster.name}
                  </h3>
                </div>
                <div className="w-full h-[1px] bg-neutral-800" />
              </div>

              {/* Centerpiece Icons Grid */}
              <div className="cluster-icons-block will-change-transform transition-all duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-4 sm:gap-y-6">
                  {cluster.skills.map((skill) => {
                    const Icon = iconComponents[skill.iconKey] || SiJavascript;
                    return (
                      <div
                        key={skill.name}
                        className="flex items-center gap-3.5 sm:gap-5 group"
                      >
                        {/* Separate Independent Icon Badge */}
                        <div className="w-[58px] h-[58px] sm:w-[72px] sm:h-[72px] lg:w-[80px] lg:h-[80px] rounded-2xl bg-[#141414] border border-neutral-800/80 flex items-center justify-center shrink-0 group-hover:border-neutral-600 transition-all duration-300 shadow-lg">
                          <Icon
                            className="w-6 h-6 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform duration-300"
                            style={{ color: skill.color }}
                          />
                        </div>

                        {/* Sibling Plain Text Label */}
                        <span className="font-mono text-sm sm:text-lg lg:text-xl font-medium text-neutral-200 group-hover:text-white transition-colors duration-200">
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

      {/* 3. Bottom Corner Micro-labels */}
      <div className="px-6 sm:px-12 lg:px-20 pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 text-xs font-mono text-neutral-500 uppercase tracking-widest border-t border-neutral-900 pt-6 shrink-0">
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
