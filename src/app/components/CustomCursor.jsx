"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;

    if (!ring || !dot) return;

    const moveCursor = (e) => {
      // Dot mengikuti mouse lebih cepat
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power3.out",
      });

      // Ring mengejar dengan delay
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-9998 hidden size-12 -translate-x-1/2 -translate-y-1/2 cursor-auto rounded-full border-2 border-dotted border-white mix-blend-difference md:block"
      />

      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-9999 hidden size-2 -translate-x-1/2 -translate-y-1/2 cursor-auto rounded-full bg-white mix-blend-difference md:block"
      />
    </>
  );
}
