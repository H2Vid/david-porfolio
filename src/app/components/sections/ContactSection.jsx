"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const contentRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, {
        y: 80,
        opacity: 0,
      });

      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(contentRef.current, {
        y: 40,
        opacity: 0,
      });

      gsap.set(linksRef.current?.children, {
        y: 25,
        opacity: 0,
      });

      gsap.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(lineRef.current, {
        scaleX: 1,
        duration: 1.2,
        delay: 0.15,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(linksRef.current?.children, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-[85vh] overflow-hidden bg-white text-neutral-950 transition-colors duration-500 dark:bg-neutral-950 dark:text-white"
    >
      <div className="mx-auto flex min-h-[85vh] w-full max-w-[1600px] flex-col justify-between px-6 py-16 sm:px-8 md:px-12 lg:px-16 lg:py-20">
        {/* Top label */}
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-medium tracking-[0.2em] text-neutral-700 uppercase dark:text-neutral-300">
            Contact
          </div>

          <div className="hidden text-[11px] font-medium tracking-[0.18em] text-neutral-600 uppercase sm:block dark:text-neutral-300">
            Get in touch
          </div>
        </div>

        {/* Main content */}
        <div className="mt-20">
          <div className="overflow-hidden">
            <h2
              ref={titleRef}
              className="max-w-275 text-[clamp(3.5rem,9vw,9rem)] leading-[0.88] font-medium tracking-[-0.065em]"
            >
              Let's Work
              <br />
              <span className="text-neutral-600 dark:text-neutral-300">
                Together
              </span>
            </h2>
          </div>

          {/* Divider */}
          <div
            ref={lineRef}
            className="mt-12 h-px w-full bg-neutral-300 dark:bg-neutral-700"
          />

          {/* Bottom content */}
          <div
            ref={contentRef}
            className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
          >
            {/* Email */}
            <div>
              <p className="mb-3 text-[11px] font-medium tracking-[0.18em] text-neutral-700 uppercase dark:text-neutral-300">
                Have a project in mind?
              </p>

              <a
                href="mailto:dstmpl17@gmail.com"
                className="group inline-flex items-center gap-3 text-lg font-medium tracking-[-0.02em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 sm:text-xl md:text-2xl dark:focus-visible:outline-white"
              >
                <span className="border-b border-neutral-400 pb-1 transition-colors duration-300 group-hover:border-neutral-950 dark:border-neutral-600 dark:group-hover:border-white">
                  dstmpl17@gmail.com
                </span>

                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  ↗
                </span>
              </a>
            </div>

            {/* Social links */}
            <div
              ref={linksRef}
              className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              <a
                href="https://github.com/H2Vid"
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-300 hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 dark:hover:text-white dark:focus-visible:outline-white"
              >
                Github
              </a>

              <a
                href="https://wa.me/6289678391472"
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-300 hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 dark:hover:text-white dark:focus-visible:outline-white"
              >
                Whatsapp
              </a>

              <a
                href="mailto:dstmpl17@gmail.com"
                className="transition-colors duration-300 hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 dark:hover:text-white dark:focus-visible:outline-white"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 flex flex-col gap-2 border-t border-neutral-300 pt-5 text-[10px] font-medium tracking-[0.15em] text-neutral-600 lowercase sm:flex-row sm:items-center sm:justify-between dark:border-neutral-700 dark:text-neutral-400">
          <span>© {new Date().getFullYear()} its_viids</span>

          <span>All rights reserved.</span>
        </div>
      </div>
    </section>
  );
}
