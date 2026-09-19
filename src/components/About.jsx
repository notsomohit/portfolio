import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const aboutPhotoSrc =
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZHdrcTdhaHR2aWQ5Mm9weWdsa25jZ3NubnZ4eTBlcHZyZnlmajJvdyZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/8fgwop8fhah9K/giphy.gif";

export default function About() {
  const containerRef = useRef(null);
  const bioRef = useRef(null);
  const imageBoxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = bioRef.current?.querySelectorAll(".bio-line");

      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (imageBoxRef.current) {
        gsap.fromTo(
          imageBoxRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
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
      className="relative min-h-[70vh] flex flex-col justify-center px-5 sm:px-12 lg:px-20 py-20 sm:py-28 lg:py-40 bg-[#0A0A0A] border-t border-neutral-900 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="flex items-baseline gap-3 sm:gap-6 mb-4">
            <span className="font-mono text-sm sm:text-lg font-bold text-[#8B5CF6]">
              01
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight">
              ABOUT
            </h2>
          </div>
          <div className="w-full h-[1px] bg-neutral-800" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div
            ref={bioRef}
            className="lg:col-span-6 space-y-6 sm:space-y-8 text-neutral-300 font-normal leading-relaxed"
          >
            <p className="bio-line text-xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-snug">
              Full-stack developer who enjoys building clean, functional products end-to-end.
            </p>

            <p className="bio-line text-sm sm:text-lg lg:text-xl text-neutral-400 font-normal leading-relaxed">
              Currently going deep on AI and agentic AI systems, figuring out how autonomous agents actually get built.
            </p>

            <div className="bio-line pt-2 flex items-center gap-2.5 text-[11px] sm:text-xs font-mono text-neutral-500 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              <span>PASSIONATE ABOUT SYSTEM ARCHITECTURE & AI TOOLS</span>
            </div>
          </div>

          <div
            ref={imageBoxRef}
            className="lg:col-span-6 w-full flex justify-center lg:justify-end"
          >
            <div
              id="about-3d-container"
              className="w-full max-w-sm sm:max-w-md lg:max-w-[540px] aspect-[4/5] min-h-[300px] sm:min-h-[400px] lg:h-[640px] rounded-2xl bg-[#141414] border border-neutral-800 flex items-center justify-center relative overflow-hidden group hover:border-neutral-700 transition-colors duration-300 shadow-xl select-none"
            >
              <img
                src={aboutPhotoSrc}
                alt="Mohit Portrait"
                className="w-full h-full object-cover"
                loading="lazy"
              />

              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-neutral-700 pointer-events-none" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-neutral-700 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-neutral-700 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-neutral-700 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
