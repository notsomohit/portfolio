import React, { useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "mohitascend07@gmail.com";

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-[90vh] flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-40 lg:py-56 bg-[#0A0A0A] border-t border-neutral-900 select-none"
    >
      <div>
        {/* Section Header */}
        <div className="flex items-baseline gap-4 sm:gap-6 mb-16">
          <span className="font-mono text-base sm:text-lg font-bold text-[#8B5CF6]">
            04
          </span>
          <span className="font-mono text-sm sm:text-base text-neutral-500 uppercase tracking-widest">
            CONTACT // GET IN TOUCH
          </span>
        </div>

        {/* Huge Editorial Headline */}
        <div className="max-w-6xl mb-24">
          <h2 className="font-display text-[clamp(4.5rem,15vw,12rem)] font-black text-white tracking-tighter uppercase leading-none mb-8">
            LET'S TALK<span className="text-[#8B5CF6]">.</span>
          </h2>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-neutral-400 font-normal max-w-3xl leading-relaxed">
            Have a project in mind, an engineering role, or just want to talk about autonomous agent architectures? Reach out directly.
          </p>
        </div>

        {/* Direct Action Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl pt-4">
          {/* Email Direct Link */}
          <div className="p-8 rounded-2xl bg-[#141414] border border-neutral-800/80 hover:border-neutral-600 transition-colors duration-200 flex flex-col justify-between group">
            <div className="flex justify-between items-start mb-8">
              <span className="font-mono text-xs sm:text-sm text-neutral-500 uppercase tracking-wider">EMAIL</span>
              <button
                onClick={handleCopyEmail}
                className="text-neutral-500 hover:text-white transition-colors p-1"
                title="Copy email to clipboard"
                aria-label="Copy email"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <a
              href={`mailto:${email}`}
              className="font-mono text-base sm:text-lg font-bold text-white group-hover:text-[#8B5CF6] transition-colors flex items-center justify-between"
            >
              <span className="truncate mr-2">{email}</span>
              <ArrowUpRight className="w-5 h-5 text-[#8B5CF6] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* GitHub Link */}
          <a
            href="https://github.com/notsomohit"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-2xl bg-[#141414] border border-neutral-800/80 hover:border-neutral-600 transition-colors duration-200 flex flex-col justify-between group"
          >
            <div className="flex justify-between items-start mb-8">
              <span className="font-mono text-xs sm:text-sm text-neutral-500 uppercase tracking-wider">GITHUB</span>
              <GithubIcon className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
            </div>

            <div className="font-mono text-base sm:text-lg font-bold text-white group-hover:text-[#8B5CF6] transition-colors flex items-center justify-between">
              <span>notsomohit</span>
              <ArrowUpRight className="w-5 h-5 text-[#8B5CF6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/notsomohit"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-2xl bg-[#141414] border border-neutral-800/80 hover:border-neutral-600 transition-colors duration-200 flex flex-col justify-between group"
          >
            <div className="flex justify-between items-start mb-8">
              <span className="font-mono text-xs sm:text-sm text-neutral-500 uppercase tracking-wider">LINKEDIN</span>
              <LinkedinIcon className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
            </div>

            <div className="font-mono text-base sm:text-lg font-bold text-white group-hover:text-[#8B5CF6] transition-colors flex items-center justify-between">
              <span>in/notsomohit</span>
              <ArrowUpRight className="w-5 h-5 text-[#8B5CF6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>
      </div>

      {/* Minimal Footer Row */}
      <div className="pt-24 border-t border-neutral-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs sm:text-sm font-mono text-neutral-500 uppercase tracking-widest">
        <span>© 2026 MOHIT. ALL RIGHTS RESERVED.</span>
        <span>DESIGNED WITH RESTRAINT & PRECISION</span>
      </div>
    </section>
  );
}
