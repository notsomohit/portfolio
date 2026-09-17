import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import HorizontalSkills from "./components/HorizontalSkills";
import StickyProjects from "./components/StickyProjects";
import GithubStats from "./components/GithubStats";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import TerminalModal, { TerminalCornerHint } from "./components/TerminalModal";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const lenisRef = useRef(null);

  // Global keyboard shortcut listener for terminal (` or Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle on backtick (` or ~) when not actively typing in an input/textarea outside terminal
      if (e.key === "`" || e.key === "~") {
        const activeTag = document.activeElement?.tagName?.toLowerCase();
        if (activeTag !== "input" && activeTag !== "textarea") {
          e.preventDefault();
          setIsTerminalOpen((prev) => !prev);
        }
      }

      // Toggle on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }

      // Close on Escape
      if (e.key === "Escape" && isTerminalOpen) {
        setIsTerminalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTerminalOpen]);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // 2. Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 3. Section ScrollTriggers for navigation (Hero, About, Skills, Projects, Github, Contact)
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const sections = ["hero", "about", "skills", "projects", "github", "contact"];
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: "top 45%",
            end: "bottom 45%",
            onEnter: () => setActiveSection(id),
            onEnterBack: () => setActiveSection(id),
          });
        }
      });
    });

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      window.__lenis = null;
      mm.revert();
    };
  }, []);

  const handleNavigate = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#FAFAFA] selection:bg-[#8B5CF6] selection:text-white overflow-x-clip">
      {/* Minimal Desktop Custom Cursor */}
      <CustomCursor />

      {/* Top Persistent Header (Monogram + Overlay Hamburger) */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Editorial Flow */}
      <main>
        <Hero onNavigate={handleNavigate} />
        <About />
        <HorizontalSkills />
        <StickyProjects />
        <GithubStats />
        <Contact />
      </main>

      {/* Full-width Expanded Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* CLI Easter Egg Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Persistent Floating Corner Hint */}
      <TerminalCornerHint onOpen={() => setIsTerminalOpen(true)} />
    </div>
  );
}

