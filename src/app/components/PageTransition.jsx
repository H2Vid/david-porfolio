"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();

  const overlayRef = useRef(null);
  const textRef = useRef(null);

  const pendingTargetRef = useRef(null);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const getTargetLabel = (target) => {
    const [targetPath, targetHash] = target.split("#");

    if (targetHash) {
      return targetHash.charAt(0).toUpperCase() + targetHash.slice(1);
    }

    if (targetPath === "/projects") {
      return "Projects";
    }

    return "Home";
  };

  const transitionTo = (target) => {
    if (isTransitioning) return;

    const overlay = overlayRef.current;
    const text = textRef.current;

    if (!overlay || !text) return;

    setIsTransitioning(true);

    pendingTargetRef.current = target;

    text.textContent = getTargetLabel(target);

    gsap.set(overlay, {
      display: "flex",
      clipPath: "circle(0% at 0% 0%)",
    });

    gsap.set(text, {
      opacity: 0,
      y: 25,
    });

    const tl = gsap.timeline();

    tl.to(overlay, {
      clipPath: "circle(150% at 0% 0%)",
      duration: 1,
      ease: "power4.inOut",
    });

    tl.to(
      text,
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
      },
      "-=0.45",
    );

    tl.call(() => {
      const [path, hash] = target.split("#");

      if (path === pathname || (path === "" && pathname === "/")) {
        if (hash) {
          window.history.pushState(null, "", `/#${hash}`);

          requestAnimationFrame(() => {
            const element = document.getElementById(hash);

            if (element) {
              window.scrollTo({
                top: element.getBoundingClientRect().top + window.scrollY,
                behavior: "instant",
              });
            }

            ScrollTrigger.refresh();
          });
        } else {
          window.history.pushState(null, "", "/");

          window.scrollTo({
            top: 0,
            behavior: "instant",
          });

          ScrollTrigger.refresh();
        }

        return;
      }

      router.push(target);
    });

    tl.to(
      {},
      {
        duration: 0.25,
      },
    );

    tl.to(text, {
      opacity: 0,
      y: -25,
      duration: 0.3,
      ease: "power3.in",
    });

    tl.to(overlay, {
      clipPath: "circle(0% at 0% 0%)",
      duration: 1,
      ease: "power4.inOut",

      onComplete: () => {
        finishTransition();
      },
    });
  };

  useEffect(() => {
    const target = pendingTargetRef.current;

    if (!target) return;

    const [targetPath, targetHash] = target.split("#");

    if (targetPath !== pathname) {
      return;
    }

    if (pathname === "/" && targetHash) {
      let attempts = 0;
      const maxAttempts = 30;

      const findSection = () => {
        const element = document.getElementById(targetHash);

        if (!element && attempts < maxAttempts) {
          attempts++;

          requestAnimationFrame(findSection);

          return;
        }

        if (!element) {
          openTransition();

          return;
        }

        ScrollTrigger.refresh();

        requestAnimationFrame(() => {
          const targetTop =
            element.getBoundingClientRect().top + window.scrollY;

          window.scrollTo({
            top: targetTop,
            behavior: "instant",
          });

          requestAnimationFrame(() => {
            ScrollTrigger.refresh();

            openTransition();
          });
        });
      };

      requestAnimationFrame(findSection);

      return;
    }

    if (pathname === "/" && !targetHash) {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });

      ScrollTrigger.refresh();

      requestAnimationFrame(() => {
        openTransition();
      });

      return;
    }

    if (pathname === "/projects") {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });

      requestAnimationFrame(() => {
        openTransition();
      });
    }
  }, [pathname]);

  const openTransition = () => {
    const overlay = overlayRef.current;
    const text = textRef.current;

    if (!overlay || !text) return;

    const tl = gsap.timeline();

    tl.to(text, {
      opacity: 0,
      y: -25,
      duration: 0.25,
      ease: "power2.in",
    });

    tl.to(
      overlay,
      {
        clipPath: "circle(0% at 0% 0%)",
        duration: 1,
        ease: "power4.inOut",

        onComplete: () => {
          finishTransition();
        },
      },
      "-=0.05",
    );
  };

  const finishTransition = () => {
    const overlay = overlayRef.current;
    const text = textRef.current;

    if (!overlay || !text) return;

    gsap.set(overlay, {
      display: "none",
      clipPath: "circle(0% at 0% 0%)",
    });

    gsap.set(text, {
      opacity: 0,
      y: 25,
    });

    pendingTargetRef.current = null;

    setIsTransitioning(false);
  };

  useEffect(() => {
    window.__pageTransition = transitionTo;

    return () => {
      delete window.__pageTransition;
    };
  }, [pathname, isTransitioning]);

  useEffect(() => {
    const overlay = overlayRef.current;

    if (!overlay) return;

    gsap.set(overlay, {
      display: "none",
      clipPath: "circle(0% at 0% 0%)",
    });
  }, []);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-9999 hidden items-center justify-center overflow-hidden bg-[#111111]"
      aria-hidden="true"
    >
      <span
        ref={textRef}
        className="relative z-10 text-4xl font-semibold tracking-tight text-[#f1f1f1] md:text-6xl"
      >
        Home
      </span>
    </div>
  );
}
