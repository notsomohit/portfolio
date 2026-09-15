import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillClusters } from "../data/skillsData";

// Accurate Brand Icons from react-icons
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPostgresql,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiGithub,
  SiTailwindcss,
  SiPostman,
  SiJsonwebtokens,
  SiAuth0,
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
  SiMongodb,
  SiGit,
  SiGithub,
  SiTailwindcss,
  TbApi,
  SiPostman,
  SiJsonwebtokens,
  SiAuth0,
  BsShieldLockFill,
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

      const totalScrollWidth = track.scrollWidth - window.innerWidth + 240;

      const tween = gsap.to(track, {
        x: () => -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScrollWidth * 1.3}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (skillClusters.length - 1),
            duration: { min: 0.2, max: 0.5 },
            ease: "power1.inOut"
          }
        },
      });

      scrollTriggerInstance = tween.scrollTrigger;

      // Animate individual clusters as they pass
      const clusters = track.querySelectorAll(".skill-cluster-group");
      clusters.forEach((cluster) => {
        gsap.fromTo(
          cluster.querySelectorAll(".skill-item-row"),
          { opacity: 0.35, y: 15 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cluster,
              containerAnimation: tween,
              start: "left 80%",
              end: "right 20%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
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
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0A0A0A] py-24 lg:py-0 border-t border-neutral-900 select-none"
    >
      {/* Top Section Header */}
      <div className="px-6 sm:px-12 lg:px-20 pt-12 sm:pt-20 pb-6">
        <div className="flex items-baseline gap-4 sm:gap-6">
          <span className="font-mono text-base sm:text-lg font-bold text-[#8B5CF6]">
            02
          </span>
          <h2 className="font-display text-[clamp(4rem,9vw,8rem)] font-black text-white tracking-tight">
            SKILLS
          </h2>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row items-stretch md:items-center gap-20 md:gap-36 px-6 sm:px-12 lg:px-20 md:w-max overflow-x-auto md:overflow-visible py-12 scrollbar-none"
      >
        {skillClusters.map((cluster) => (
          <div
            key={cluster.name}
            className="skill-cluster-group shrink-0 flex flex-col justify-center min-w-[340px] sm:min-w-[480px] lg:min-w-[620px]"
          >
            {/* Cluster Header */}
            <div className="flex items-baseline gap-4 mb-10 sm:mb-14 border-b border-neutral-800 pb-5">
              <span className="font-mono text-sm sm:text-base font-bold text-[#8B5CF6]">
                {cluster.index}
              </span>
              <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                {cluster.name}
              </h3>
            </div>

            {/* Loose Spaced Grid: Independent Dark Rounded-Square Badge + Plain Text Sibling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 sm:gap-y-10">
              {cluster.skills.map((skill) => {
                const Icon = iconComponents[skill.iconKey] || SiJavascript;
                return (
                  <div
                    key={skill.name}
                    className="skill-item-row flex items-center gap-5 sm:gap-6 group"
                  >
                    {/* Separate Independent Icon Badge (~72-96px) */}
                    <div className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] rounded-2xl bg-[#141414] border border-neutral-800/80 flex items-center justify-center shrink-0 group-hover:border-neutral-600 transition-all duration-300">
                      <Icon
                        className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform duration-300"
                        style={{ color: skill.color }}
                      />
                    </div>

                    {/* Plain Text Sibling Label (Not sharing badge's bg or border) */}
                    <span className="font-mono text-base sm:text-xl font-medium text-neutral-300 group-hover:text-white transition-colors duration-200">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Corner Micro-labels */}
      <div className="px-6 sm:px-12 lg:px-20 pb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-xs font-mono text-neutral-500 uppercase tracking-widest border-t border-neutral-900 pt-8">
        <div className="flex items-center gap-4">
          <span>KEEP SCROLLING</span>
          <div className="w-20 h-[1px] bg-neutral-800" />
        </div>

        <div className="text-neutral-500 tracking-wider">
          FRONTEND — BACKEND — AI/ML
        </div>
      </div>
    </section>
  );
}
