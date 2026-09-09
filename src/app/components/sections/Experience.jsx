"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { experiences } from "@/app/data/experiences";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  /*
   * DESKTOP
   * Vertical scroll -> horizontal movement
   */
  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;

      if (!section || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const getScrollAmount = () => {
          return track.scrollWidth - window.innerWidth;
        };

        gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  /*
   * MOBILE
   */
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === experiences.length - 1 ? 0 : prev + 1));
  };

  const previousSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? experiences.length - 1 : prev - 1));
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* =========================
          DESKTOP / HEADER
      ========================== */}

      <div className="mx-auto flex w-full max-w-7xl items-end justify-between px-6 py-12 md:px-10 md:py-16">
        <div>
          <p className="mb-3 text-sm tracking-[0.2em] text-neutral-500 uppercase">
            02
          </p>

          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Experience
          </h2>
        </div>

        {/* Mobile navigation */}
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

      {/* =========================
          DESKTOP TRACK
      ========================== */}

      <div ref={trackRef} className="hidden w-max gap-6 px-6 md:flex md:px-10">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>

      {/* =========================
          MOBILE CAROUSEL
      ========================== */}

      <div className="px-6 md:hidden">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {experiences.map((experience) => (
              <div key={experience.id} className="w-full shrink-0 pr-0">
                <ExperienceCard experience={experience} />
              </div>
            ))}
          </div>
        </div>

        {/* Counter */}
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

/*
 * EXPERIENCE CARD
 */

function ExperienceCard({ experience }) {
  return (
    <article className="group flex w-full shrink-0 flex-col gap-2 bg-[#111111] text-[#f1f1f1] transition-colors duration-500 md:h-[700px] md:w-[900px] md:flex-row md:gap-0 dark:bg-[#f1f1f1] dark:text-[#111111]">
      <div className="flex h-1/2 w-full flex-col justify-between p-5 md:h-full md:w-[60%]">
        <div>
          {/* Header */}
          <div className="mb-10 flex items-start justify-between gap-4">
            <span className="text-sm opacity-50">{experience.period}</span>

            <span className="text-sm opacity-50">
              {String(experience.id).padStart(2, "0")}
            </span>
          </div>

          {/* Role */}
          <h3 className="max-w-md text-3xl font-medium tracking-tight md:text-4xl">
            {experience.role}
          </h3>

          {/* Company */}
          <p className="mt-2 text-lg opacity-70">{experience.company}</p>

          {/* Description */}
          <p className="mt-8 max-w-md text-sm leading-relaxed opacity-60 md:text-base">
            {experience.description}
          </p>
        </div>

        {/* Skills */}
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

      <div className="h-1/2 w-full shrink-0 overflow-hidden md:h-full md:w-[40%]">
        <img
          src={experience.image}
          alt={experience.company}
          className="h-full w-full object-cover grayscale transition-[filter,scale] duration-1300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 hover:grayscale-0"
        />
      </div>
    </article>
  );
}
