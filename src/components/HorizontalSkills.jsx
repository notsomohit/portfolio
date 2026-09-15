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

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    let scrollTriggerInstance = null;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;

      if (!track || !container) return;

      const totalScrollWidth = track.scrollWidth - window.innerWidth + 320;

      // Master pinned horizontal scroll tween
      const masterTween = gsap.to(track, {
        x: () => -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScrollWidth * 1.35}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (skillClusters.length - 1),
            duration: { min: 0.25, max: 0.6 },
            ease: "power1.inOut"
          }
        },
      });

      scrollTriggerInstance = masterTween.scrollTrigger;

      // Sub-category titles hand-off: slide up & fade out as their icons take center stage
      const clusterStages = track.querySelectorAll(".skill-cluster-stage");
      clusterStages.forEach((cluster) => {
        const titleBlock = cluster.querySelector(".cluster-title-block");
        const iconsBlock = cluster.querySelector(".cluster-icons-block");

        if (titleBlock) {
          gsap.fromTo(
            titleBlock,
            { y: 0, opacity: 1 },
            {
              y: -70,
              opacity: 0,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: cluster,
                containerAnimation: masterTween,
                start: "center 55%",
                end: "right 30%",
                scrub: true,
              },
            }
          );
        }

        if (iconsBlock) {
          gsap.fromTo(
            iconsBlock,
            { scale: 0.92, opacity: 0.5 },
            {
              scale: 1.05,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cluster,
                containerAnimation: masterTween,
                start: "left 75%",
                end: "center 50%",
                scrub: true,
              },
            }
          );
        }
      });
    }, containerRef);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0A0A0A] py-20 lg:py-0 border-t border-neutral-900 select-none"
    >
      {/* 1. Main Persistent Top-Level Section Header */}
      <div className="px-6 sm:px-12 lg:px-20 pt-12 sm:pt-16 pb-4">
        <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
          <span className="font-mono text-base sm:text-lg font-bold text-[#8B5CF6]">
            02
          </span>
          <h2 className="font-display text-[clamp(4rem,9vw,8rem)] font-black text-white tracking-tight">
            SKILLS
          </h2>
        </div>
        <div className="w-full h-[1px] bg-neutral-800" />
      </div>

      {/* 2. Pinned Horizontal Track */}
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row items-stretch md:items-center gap-24 md:gap-48 px-6 sm:px-12 lg:px-20 md:w-max overflow-x-auto md:overflow-visible py-8 scrollbar-none"
      >
        {skillClusters.map((cluster) => (
          <div
            key={cluster.name}
            className="skill-cluster-stage shrink-0 flex flex-col justify-center min-w-[340px] sm:min-w-[540px] lg:min-w-[720px] relative"
          >
            {/* Sub-Category Title (Slides UP & Fades OUT as icons take focus) */}
            <div className="cluster-title-block will-change-transform mb-8">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-mono text-base sm:text-xl font-bold text-[#8B5CF6]">
                  {cluster.index}
                </span>
                <h3 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight">
                  {cluster.name}
                </h3>
              </div>
              <div className="w-full h-[1px] bg-neutral-800" />
            </div>

            {/* Centerpiece Icons Grid: Separate Dark Rounded Badge + Sibling Plain Label */}
            <div className="cluster-icons-block will-change-transform transition-all duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 sm:gap-y-10">
                {cluster.skills.map((skill) => {
                  const Icon = iconComponents[skill.iconKey] || SiJavascript;
                  return (
                    <div
                      key={skill.name}
                      className="flex items-center gap-5 sm:gap-6 group"
                    >
                      {/* Separate Independent Icon Badge (~72-96px) */}
                      <div className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] rounded-2xl bg-[#141414] border border-neutral-800/80 flex items-center justify-center shrink-0 group-hover:border-neutral-600 transition-all duration-300 shadow-lg">
                        <Icon
                          className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform duration-300"
                          style={{ color: skill.color }}
                        />
                      </div>

                      {/* Sibling Plain Text Label (Not sharing badge's bg or border) */}
                      <span className="font-mono text-base sm:text-xl font-medium text-neutral-200 group-hover:text-white transition-colors duration-200">
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

      {/* 3. Bottom Corner Micro-labels */}
      <div className="px-6 sm:px-12 lg:px-20 pb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-xs font-mono text-neutral-500 uppercase tracking-widest border-t border-neutral-900 pt-8">
        <div className="flex items-center gap-4">
          <span>KEEP SCROLLING</span>
          <div className="w-20 h-[1px] bg-neutral-800" />
        </div>

        <div className="text-neutral-500 tracking-wider">
          LANGUAGES — FRAMEWORKS — DATA — DB — TOOLS
        </div>
      </div>
    </section>
  );
}
