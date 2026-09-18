import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import ContactTerminal from "./ContactTerminal";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "mohitascend07@gmail.com";
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
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

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative flex flex-col justify-between px-5 sm:px-10 lg:px-20 py-16 sm:py-20 md:py-24 lg:py-28 bg-[#0A0A0A] border-t border-neutral-900 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div ref={headerRef} className="mb-8 sm:mb-12 lg:mb-14">
          <div className="flex items-baseline gap-3 sm:gap-6 mb-3 sm:mb-4">
            <span className="font-mono text-sm sm:text-lg font-bold text-[#8B5CF6]">
              05
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight">
              CONTACT
            </h2>
          </div>
          <div className="w-full h-[1px] bg-neutral-800" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          <div ref={leftColRef} className="lg:col-span-6 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-[0.95] mb-4 sm:mb-5">
                LET'S<br />
                TALK<span className="text-[#8B5CF6]">.</span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-neutral-400 font-normal leading-relaxed max-w-xl">
                Have a project in mind, an engineering role, or just want to talk about autonomous agent architectures? Reach out directly.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:gap-3.5 w-full max-w-xl">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#141414] border border-neutral-800/80 hover:border-neutral-600 transition-colors duration-200 flex flex-col justify-between group">
                <div className="flex justify-between items-start mb-2.5">
                  <span className="font-mono text-[11px] sm:text-xs text-neutral-500 uppercase tracking-wider">
                    EMAIL
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="text-neutral-500 hover:text-white transition-colors p-1"
                    title="Copy email to clipboard"
                    aria-label="Copy email"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <a
                  href={`mailto:${email}`}
                  className="font-mono text-xs sm:text-sm md:text-base font-bold text-white group-hover:text-[#8B5CF6] transition-colors flex items-center justify-between"
                >
                  <span className="truncate mr-2">{email}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8B5CF6] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              <a
                href="https://github.com/notsomohit"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 sm:p-5 rounded-2xl bg-[#141414] border border-neutral-800/80 hover:border-neutral-600 transition-colors duration-200 flex flex-col justify-between group"
              >
                <div className="flex justify-between items-start mb-2.5">
                  <span className="font-mono text-[11px] sm:text-xs text-neutral-500 uppercase tracking-wider">
                    GITHUB
                  </span>
                  <GithubIcon className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
                </div>

                <div className="font-mono text-xs sm:text-sm md:text-base font-bold text-white group-hover:text-[#8B5CF6] transition-colors flex items-center justify-between">
                  <span>github.com/notsomohit</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8B5CF6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/notsomohit"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 sm:p-5 rounded-2xl bg-[#141414] border border-neutral-800/80 hover:border-neutral-600 transition-colors duration-200 flex flex-col justify-between group"
              >
                <div className="flex justify-between items-start mb-2.5">
                  <span className="font-mono text-[11px] sm:text-xs text-neutral-500 uppercase tracking-wider">
                    LINKEDIN
                  </span>
                  <LinkedinIcon className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
                </div>

                <div className="font-mono text-xs sm:text-sm md:text-base font-bold text-white group-hover:text-[#8B5CF6] transition-colors flex items-center justify-between">
                  <span>linkedin.com/in/notsomohit</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8B5CF6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </div>
          </div>

          <div ref={rightColRef} className="lg:col-span-6 w-full h-full mt-2 lg:mt-0">
            <ContactTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
