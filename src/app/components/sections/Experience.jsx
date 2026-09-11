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
        const NAVBAR_HEIGHT = 110;
        const PROGRESS_GAP = 20;

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
      {/* =========================================================
          BACKGROUND
          Tetap berada di belakang ketika section di-pin oleh GSAP.
          ========================================================= */}
      <div
        className="pointer-events-none absolute inset-0 z-0 flex items-center overflow-hidden"
        aria-hidden="true"
      >
        <span className="text-[14.6vw] leading-none font-black whitespace-nowrap text-black/30 uppercase dark:text-white/20">
          Experiences
        </span>
      </div>

      {/* =========================================================
          HEADER
          ========================================================= */}
      <div
        ref={headerRef}
        className="relative z-10 mx-auto flex w-full max-w-7xl items-end justify-between px-6 py-12 md:px-10 md:py-16"
      >
        <div>
          <p className="mb-3 text-sm tracking-[0.2em] text-neutral-500 uppercase">
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
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-black"
          >
            ←
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next experience"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-black"
          >
            →
          </button>
        </div>
      </div>

      {/* =========================================================
          DESKTOP EXPERIENCE
          ========================================================= */}
      <div ref={experienceRef} className="relative z-10 hidden md:block">
        <div ref={trackRef} className="flex w-max gap-6 px-6 md:px-10">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>

        <div className="mx-auto mt-5 w-full max-w-7xl px-6 md:px-10">
          <div className="relative h-0.75 w-full overflow-hidden bg-black/10 dark:bg-black/10">
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-[#111111] dark:bg-[#f1f1f1]"
            />
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE EXPERIENCE
          ========================================================= */}
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

        <div className="mt-6 flex items-center justify-between text-sm text-neutral-500">
          <span>
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(experiences.length).padStart(2, "0")}
          </span>

          <div className="flex gap-1">
            {experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to experience ${index + 1}`}
                className={`h-1 transition-all ${
                  index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/20"
                }`}
              />
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
            <span className="text-sm opacity-50">{experience.period}</span>

            <span className="text-sm opacity-50">
              {String(experience.id).padStart(2, "0")}
            </span>
          </div>

          <h3 className="max-w-md text-3xl font-medium tracking-tight md:text-4xl">
            {experience.role}
          </h3>

          <p className="mt-2 text-lg opacity-70">{experience.company}</p>

          <p className="mt-8 text-sm leading-relaxed opacity-60 md:text-base">
            {experience.description}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2 md:mt-0">
          {experience.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[#f1f1f1]/20 px-3 py-1.5 text-xs opacity-70 dark:border-[#111111]/20"
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
