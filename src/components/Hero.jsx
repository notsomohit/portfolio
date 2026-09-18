import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onNavigate }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const metaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

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
          { opacity: 0, y: 50, rotateX: -20 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.04 },
          "-=0.5"
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current?.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          "-=0.5"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.4"
        );

      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "25% top",
            scrub: true,
          },
        });
      }
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
      className="relative min-h-screen flex flex-col justify-between px-5 sm:px-12 lg:px-20 pt-28 sm:pt-36 lg:pt-40 pb-10 sm:pb-12 bg-[#0A0A0A] select-none overflow-hidden"
    >
      <div
        ref={metaRef}
        className="flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs font-mono text-neutral-500 uppercase tracking-widest pt-2"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
          <span>AVAILABLE FOR WORK</span>
        </div>
        <span className="hidden sm:inline">BASED IN INDIA // UTC+5:30</span>
      </div>

      <div className="my-auto py-8 sm:py-16 max-w-6xl w-full">
        <div ref={titleRef} className="overflow-hidden mb-4 sm:mb-6">
          <h1 className="font-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter uppercase flex flex-wrap leading-none">
            {nameLetters.map((char, i) => (
              <span key={i} className="char-item inline-block">
                {char}
              </span>
            ))}
            <span className="text-[#8B5CF6] inline-block char-item">.</span>
          </h1>
        </div>

        <p
          ref={taglineRef}
          className="text-base sm:text-xl md:text-2xl lg:text-3xl text-neutral-300 font-medium tracking-tight max-w-3xl leading-snug mb-8 sm:mb-12"
        >
          Full-stack developer. Building things that work, learning what's next.
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center gap-3.5 sm:gap-6">
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white text-[#0A0A0A] font-bold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-all duration-200 group"
          >
            <span>View Work</span>
            <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href="https://github.com/notsomohit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#141414] text-white font-mono text-xs tracking-wider uppercase border border-neutral-800 hover:border-neutral-600 transition-all duration-200 group"
          >
            <span>Resume / GitHub</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8B5CF6] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <div className="flex justify-between items-end gap-4 text-xs font-mono text-neutral-500 uppercase tracking-widest pt-6 border-t border-neutral-900">
        <div
          ref={scrollIndicatorRef}
          className="flex items-center gap-3 group opacity-80"
        >
          <div className="relative w-[1.5px] h-8 bg-neutral-800 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-b from-transparent via-[#8B5CF6] to-white animate-traveling-dot" />
          </div>
          <span className="text-[10px] tracking-widest text-neutral-500">SCROLL</span>
        </div>

        <div className="text-neutral-500 tracking-wider text-[10px] sm:text-xs text-right">
          FRONTEND — BACKEND — AI/ML
        </div>
      </div>
    </section>
  );
}
