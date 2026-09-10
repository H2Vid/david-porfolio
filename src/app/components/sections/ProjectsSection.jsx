"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { projects } from "@/app/data/projects";
import { MoveUpRight } from "lucide-react";

export default function ProjectsSection() {
  const sectionRef = useRef(null);

  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 4);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {}, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (card) => {
    const arrow = card.querySelector("[data-arrow]");
    const digits = card.querySelectorAll("[data-digit-track]");

    if (arrow) {
      gsap.killTweensOf(arrow);

      const arrowTl = gsap.timeline();

      arrowTl
        // Keluar ke atas + fade
        .to(arrow, {
          x: 25,
          y: -25,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
        })

        // Pindahkan ke bawah dalam keadaan invisible
        .set(arrow, {
          x: -25,
          y: 25,
          opacity: 0,
        })

        // Masuk dari bawah ke posisi awal
        .to(arrow, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        });
    }

    digits.forEach((track, index) => {
      const digit = Number(track.dataset.digit);

      gsap.killTweensOf(track);

      const tl = gsap.timeline({
        delay: index * 0.25,
      });

      tl.fromTo(
        track,
        {
          yPercent: 0,
        },
        {
          yPercent: -50,
          duration: 0.55,
          ease: "power2.inOut",
        },
      ).to(track, {
        yPercent: 0,
        duration: 0.55,
        ease: "power2.out",
      });
    });
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="px-6 py-24 text-[#111111] md:px-10 md:py-32 lg:px-16 dark:text-[#f1f1f1]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between md:mb-16">
          <h2 className="text-5xl font-medium tracking-[-0.05em] md:text-6xl lg:text-7xl">
            Projects
          </h2>

          <Link
            href="/projects"
            className="group flex items-center gap-2 text-sm text-[#111111]/50 transition-colors dark:text-[#f1f1f1]/50"
          >
            More
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {featuredProjects.map((project, index) => {
            const number = String(index + 1).padStart(3, "0");

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block"
                onMouseEnter={(event) => handleMouseEnter(event.currentTarget)}
              >
                <div className="overflow-hidden border border-[#111111] dark:border-[#f1f1f1]">
                  {/* Title */}
                  <div className="flex h-12 items-center justify-center border-b border-[#111111] px-4 md:h-14 dark:border-[#f1f1f1]">
                    <h3 className="text-base font-medium tracking-[-0.02em] uppercase md:text-lg">
                      {project.title}
                    </h3>
                  </div>

                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden bg-[#f1f1f1] dark:bg-[#111111]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover grayscale transition-[filter] duration-700 ease-out group-hover:grayscale-0"
                    />
                  </div>

                  {/* Footer */}
                  <div className="flex h-12 items-center justify-between border-t border-[#111111] px-3 md:h-14 md:px-4 dark:border-[#f1f1f1]">
                    {/* DEV NUMBER */}
                    <span className="flex items-center text-xs">
                      DEV.
                      <span className="ml-1 flex h-[1em] overflow-hidden text-blue-600">
                        {number.split("").map((digit, digitIndex) => {
                          return (
                            <span
                              key={digitIndex}
                              className="relative h-[1em] w-[0.65em] overflow-hidden"
                            >
                              <span
                                data-digit-track
                                data-digit={digit}
                                className="absolute top-0 left-0 flex flex-col"
                              >
                                {/* Digit asli */}
                                <span className="flex h-[1em] shrink-0 items-center justify-center">
                                  {digit}
                                </span>

                                {/* Clone untuk rolling */}
                                <span className="flex h-[1em] shrink-0 items-center justify-center">
                                  {digit}
                                </span>
                              </span>
                            </span>
                          );
                        })}
                      </span>
                    </span>

                    {/* VIEW */}
                    <span className="flex items-center gap-3 rounded-full bg-[#111111] px-4 py-1.5 text-[14px] tracking-wide text-[#f1f1f1] uppercase transition-transform duration-300 group-hover:scale-105 dark:bg-[#f1f1f1] dark:text-[#111111]">
                      <span>View</span>

                      <span className="relative h-4 w-4 overflow-visible">
                        <MoveUpRight
                          data-arrow
                          size={16}
                          className="absolute inset-0 will-change-transform"
                        />
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
