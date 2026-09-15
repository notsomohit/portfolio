import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const bioRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = bioRef.current?.querySelectorAll(".bio-line");

      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-[75vh] flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-40 lg:py-56 bg-[#0A0A0A] border-t border-neutral-900 select-none"
    >
      <div className="max-w-6xl">
        
        {/* Section Index & Title with Consistent Thin Divider */}
        <div className="mb-20">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-mono text-base sm:text-lg font-bold text-[#8B5CF6]">
              01
            </span>
            <h2 className="font-display text-[clamp(4rem,9vw,8rem)] font-black text-white tracking-tight">
              ABOUT
            </h2>
          </div>
          <div className="w-full h-[1px] bg-neutral-800" />
        </div>

        {/* Big Staggered Editorial Bio */}
        <div ref={bioRef} className="space-y-10 max-w-5xl text-neutral-300 font-normal leading-relaxed">
          <p className="bio-line text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-snug">
            Full-stack developer who enjoys building clean, functional products end-to-end.
          </p>

          <p className="bio-line text-xl sm:text-3xl lg:text-4xl text-neutral-400 font-normal leading-relaxed">
            Currently going deep on AI and agentic AI systems, figuring out how autonomous agents actually get built.
          </p>
        </div>

      </div>
    </section>
  );
}
