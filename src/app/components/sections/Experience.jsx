"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { experiences } from "@/app/data/experiences";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const experienceRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const header = headerRef.current;
      const experience = experienceRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;

      if (!section || !header || !experience || !track || !progress) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const NAVBAR_HEIGHT = 50;
        const PROGRESS_GAP = 10;

        const getHeaderHeight = () => {
          return header.offsetHeight;
        };

        const getScrollAmount = () => {
          return Math.max(0, track.scrollWidth - window.innerWidth);
        };

        const getCardOffset = () => {
          return Math.max(0, getHeaderHeight() - NAVBAR_HEIGHT);
        };

        const getProgressOffset = () => {
          return getCardOffset() + PROGRESS_GAP;
        };

        gsap.set(header, {
          y: 0,
        });

        gsap.set(experience, {
          y: 0,
        });

        gsap.set(track, {
          x: 0,
        });

        gsap.set(progress, {
          scaleX: 0,
          transformOrigin: "left center",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",

            end: () => {
              return `+=${getCardOffset() + getScrollAmount()}`;
            },

            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        timeline.to(
          header,
          {
            y: () => -getHeaderHeight(),
            ease: "none",
            duration: 1,
          },
          0,
        );

        timeline.to(
          experience,
          {
            y: () => -getCardOffset(),
            ease: "none",
            duration: 1,
          },
          0,
        );

        timeline.to(
          track,
          {
            x: () => -getScrollAmount(),
            ease: "none",
            duration: 3,
          },
          1,
        );

        timeline.to(
          progress,
          {
            scaleX: 1,
            ease: "none",
            duration: 3,
          },
          1,
        );
      });

      return () => {
        mm.revert();
      };
    },
    {
      scope: sectionRef,
    },
  );

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === experiences.length - 1 ? 0 : prev + 1));
  };

  const previousSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? experiences.length - 1 : prev - 1));
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute inset-0 z-0 flex items-center overflow-hidden"
        aria-hidden="true"
      >
        <span className="text-[14.6vw] leading-none font-black whitespace-nowrap text-black/30 uppercase dark:text-white/20">
          Experiences
        </span>
      </div>

      {/* Header */}
      <div
        ref={headerRef}
        className="relative z-10 mx-auto flex w-full max-w-7xl items-end justify-between px-6 py-12 md:px-10 md:py-16"
      >
        <div>
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-neutral-700 uppercase dark:text-neutral-300">
            02
          </p>

          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Experience
          </h2>
        </div>

        <div className="flex gap-2 md:hidden">
          <button
            onClick={previousSlide}
            aria-label="Previous experience"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700 text-neutral-950 transition hover:bg-neutral-950 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:border-neutral-300 dark:text-white dark:hover:bg-white dark:hover:text-neutral-950 dark:focus-visible:outline-white"
          >
            ←
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next experience"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700 text-neutral-950 transition hover:bg-neutral-950 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:border-neutral-300 dark:text-white dark:hover:bg-white dark:hover:text-neutral-950 dark:focus-visible:outline-white"
          >
            →
          </button>
        </div>
      </div>

      {/* Desktop */}
      <div ref={experienceRef} className="relative z-10 hidden md:block">
        <div ref={trackRef} className="flex w-max gap-6 px-6 md:px-30">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>

        <div className="mx-auto mt-5 w-full max-w-7xl px-6 md:px-10">
          <div className="relative h-0.75 w-full overflow-hidden bg-neutral-300 dark:bg-neutral-700">
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-neutral-950 dark:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="relative z-10 px-6 md:hidden">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {experiences.map((experience) => (
              <div key={experience.id} className="w-full shrink-0">
                <ExperienceCard experience={experience} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm font-medium text-neutral-700 dark:text-neutral-300">
          <span>
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(experiences.length).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-2">
            {experiences.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to experience ${index + 1}`}
                aria-current={index === currentIndex ? "step" : undefined}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white"
              >
                <span
                  aria-hidden="true"
                  className={`block rounded-full transition-all ${
                    index === currentIndex
                      ? "h-1 w-8 bg-neutral-950 dark:bg-white"
                      : "h-1 w-2 bg-neutral-400 dark:bg-neutral-600"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ experience }) {
  return (
    <article className="flex w-full flex-col bg-[#111111] text-[#f1f1f1] transition-colors duration-500 md:h-125 md:w-270 md:flex-row dark:bg-[#f1f1f1] dark:text-[#111111]">
      <div className="flex h-1/2 w-full shrink-0 flex-col justify-between p-5 md:h-full md:w-[55%]">
        <div>
          <div className="mb-10 flex items-start justify-between gap-4">
            <span className="text-sm text-neutral-300 dark:text-neutral-700">
              {experience.period}
            </span>

            <span className="text-sm text-neutral-300 dark:text-neutral-700">
              {String(experience.id).padStart(2, "0")}
            </span>
          </div>

          <h3 className="max-w-md text-3xl font-medium tracking-tight md:text-4xl">
            {experience.role}
          </h3>

          <p className="mt-2 text-lg text-neutral-300 dark:text-neutral-700">
            {experience.company}
          </p>

          <p className="mt-8 text-sm leading-relaxed text-neutral-300 md:text-base dark:text-neutral-700">
            {experience.description}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2 md:mt-0">
          {experience.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-neutral-400 px-3 py-1.5 text-xs text-neutral-200 dark:border-neutral-600 dark:text-neutral-800"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="h-1/2 w-full shrink-0 overflow-hidden md:h-full md:w-[45%]">
        <img
          src={experience.image}
          alt={experience.company}
          className="block h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 hover:grayscale-0 md:grayscale"
        />
      </div>
    </article>
  );
}
