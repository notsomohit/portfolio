import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDownRight, FileText, ArrowRight } from "lucide-react";

export default function Hero({ onNavigate }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const metaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        metaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
      )
        .fromTo(
          titleRef.current?.querySelectorAll(".char-item"),
          { opacity: 0, y: 70, rotateX: -30 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.1, stagger: 0.04 },
          "-=0.5"
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current?.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate("projects");
    } else {
      const el = document.getElementById("projects");
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const nameLetters = "MOHIT".split("");

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-36 pb-12 bg-[#0A0A0A] select-none"
    >
      {/* Top Meta Indicator */}
      <div ref={metaRef} className="flex items-center justify-between text-xs font-mono text-neutral-500 uppercase tracking-widest pt-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
          <span>AVAILABLE FOR WORK</span>
        </div>
        <span>BASED IN INDIA // UTC+5:30</span>
      </div>

      {/* Main Kinetic Hero Headline & Tagline */}
      <div className="my-auto py-12 max-w-6xl">
        <div ref={titleRef} className="overflow-hidden mb-6">
          <h1 className="font-display text-[clamp(4.5rem,15vw,13rem)] font-black text-white tracking-tighter uppercase flex">
            {nameLetters.map((char, i) => (
              <span key={i} className="char-item inline-block">
                {char}
              </span>
            ))}
            <span className="text-[#8B5CF6] inline-block char-item">.</span>
          </h1>
        </div>

        {/* Short, punchy tagline */}
        <p
          ref={taglineRef}
          className="text-xl sm:text-3xl lg:text-4xl text-neutral-300 font-medium tracking-tight max-w-3xl leading-snug mb-12"
        >
          Full-stack developer. Building things that work, learning what's next.
        </p>

        {/* Minimal CTAs */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-6">
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-[#0A0A0A] font-bold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-all duration-200 group"
          >
            <span>View Work</span>
            <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href="https://github.com/notsomohit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#141414] text-white font-mono text-xs tracking-wider uppercase border border-neutral-800 hover:border-neutral-600 transition-all duration-200 group"
          >
            <span>Resume / GitHub</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8B5CF6] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Bottom Micro-labels */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-xs font-mono text-neutral-500 uppercase tracking-widest pt-8 border-t border-neutral-900">
        <div className="flex items-center gap-4">
          <span>KEEP SCROLLING</span>
          <div className="w-16 h-[1px] bg-neutral-800" />
        </div>

        <div className="text-neutral-500 tracking-wider">
          FRONTEND — BACKEND — AI/ML
        </div>
      </div>
    </section>
  );
}
