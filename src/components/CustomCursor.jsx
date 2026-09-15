import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable if pointer is fine (desktop mouse)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (!isFinePointer || isTouch) return;

    setIsEnabled(true);
    const dot = dotRef.current;
    if (!dot) return;

    // Use gsap.quickTo for instant 60fps tracking without lag
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });

    const onMouseMove = (e) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest("a, button, [data-cursor], input, textarea");
      if (target) {
        gsap.to(dot, { scale: 3.2, backgroundColor: "#FFFFFF", duration: 0.2, ease: "power2.out" });
      } else {
        gsap.to(dot, { scale: 1, backgroundColor: "#FFFFFF", duration: 0.2, ease: "power2.out" });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference will-change-transform"
      style={{ transform: "translate(-100px, -100px)" }}
    />
  );
}
