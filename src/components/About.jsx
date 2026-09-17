import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Photo asset reference — swap this path to drop in Mohit's real portrait image
const aboutPhotoSrc = null; // e.g. import aboutPhoto from "../assets/about.jpg";

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
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.2,
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
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
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
      className="relative min-h-[75vh] flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-32 sm:py-40 lg:py-56 bg-[#0A0A0A] border-t border-neutral-900 select-none"
    >
      <div className="max-w-7xl">
        
        {/* Section Index & Title with Consistent Thin Divider */}
        <div className="mb-16 sm:mb-24">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-mono text-base sm:text-lg font-bold text-[#8B5CF6]">
              01
            </span>
            <h2 className="font-display text-[clamp(3rem,8vw,8rem)] font-black text-white tracking-tight">
              ABOUT
            </h2>
          </div>
          <div className="w-full h-[1px] bg-neutral-800" />
        </div>

        {/* Two-Column Layout: Bio text on Left, 3D Model / Portrait container on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Bio text */}
          <div
            ref={bioRef}
            className="lg:col-span-6 space-y-8 sm:space-y-10 text-neutral-300 font-normal leading-relaxed"
          >
            <p className="bio-line text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-snug">
              Full-stack developer who enjoys building clean, functional products end-to-end.
            </p>

            <p className="bio-line text-lg sm:text-2xl lg:text-3xl text-neutral-400 font-normal leading-relaxed">
              Currently going deep on AI and agentic AI systems, figuring out how autonomous agents actually get built.
            </p>

            <div className="bio-line pt-2 flex items-center gap-3 text-xs font-mono text-neutral-500 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              <span>PASSIONATE ABOUT SYSTEM ARCHITECTURE & AI TOOLS</span>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Model / Portrait Container (~590px x 730px on desktop, ~4:5 aspect ratio) */}
          <div
            ref={imageBoxRef}
            className="lg:col-span-6 w-full flex justify-center lg:justify-end"
          >
            <div
              id="about-3d-container"
              className="w-full max-w-[590px] aspect-[4/5] min-h-[380px] sm:min-h-[480px] lg:h-[730px] rounded-2xl bg-[#141414] border border-neutral-800/80 flex flex-col items-center justify-center relative overflow-hidden group hover:border-neutral-700 transition-colors duration-300 shadow-2xl select-none"
              style={{ aspectRatio: "4/5" }}
            >
              {aboutPhotoSrc ? (
                <img
                  src={aboutPhotoSrc}
                  alt="Mohit Portrait"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 text-center p-8 z-10">
                  <div className="w-16 h-16 rounded-full bg-[#1c1c1c] border border-neutral-700/60 flex items-center justify-center text-neutral-500 group-hover:text-[#8B5CF6] transition-colors">
                    <User className="w-7 h-7" />
                  </div>
                  <div className="font-mono text-xs text-neutral-500 tracking-wider uppercase">
                    <span>3D MODEL / PORTRAIT ASSET</span>
                    <span className="block text-[10px] text-neutral-600 mt-1">
                      (Container ready · 590 × 730)
                    </span>
                  </div>
                </div>
              )}

              {/* Corner Frame Lines */}
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
