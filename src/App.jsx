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
import Contact from "./components/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const lenisRef = useRef(null);

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

    // 3. Section ScrollTriggers for navigation (Hero, About, Skills, Projects, Contact)
    const sections = ["hero", "about", "skills", "projects", "contact"];
    const triggers = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top 45%",
          end: "bottom 45%",
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });
        triggers.push(trigger);
      }
    });

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      window.__lenis = null;
      triggers.forEach((t) => t.kill());
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
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#FAFAFA] selection:bg-[#8B5CF6] selection:text-white overflow-x-hidden">
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
        <Contact />
      </main>
    </div>
  );
}
