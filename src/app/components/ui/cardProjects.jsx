"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { MoveUpRight } from "lucide-react";

export default function CardProjects({ project, index }) {
  const cardRef = useRef(null);

  const number = String(index + 1).padStart(3, "0");

  const handleMouseEnter = () => {
    const card = cardRef.current;

    if (!card) return;

    const arrow = card.querySelector("[data-arrow]");
    const digits = card.querySelectorAll("[data-digit-track]");

    // Arrow animation
    if (arrow) {
      gsap.killTweensOf(arrow);

      const arrowTl = gsap.timeline();

      arrowTl
        .to(arrow, {
          x: 25,
          y: -25,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
        })
        .set(arrow, {
          x: -25,
          y: 25,
          opacity: 0,
        })
        .to(arrow, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        });
    }

    // Number rolling animation
    digits.forEach((track, digitIndex) => {
      gsap.killTweensOf(track);

      const tl = gsap.timeline({
        delay: digitIndex * 0.25,
      });

      tl.fromTo(
        track,
        {
          yPercent: 0,
        },
        {
          yPercent: -100,
          duration: 0.75,
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
    <Link
      ref={cardRef}
      href={`/projects/${project.slug}`}
      className="group block"
      onMouseEnter={handleMouseEnter}
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
              {number.split("").map((digit, digitIndex) => (
                <span
                  key={digitIndex}
                  className="relative h-[1em] w-[0.65em] overflow-hidden"
                >
                  <span
                    data-digit-track
                    data-digit={digit}
                    className="absolute top-0 left-0 flex flex-col"
                  >
                    <span className="flex h-[1em] shrink-0 items-center justify-center">
                      {digit}
                    </span>

                    <span className="flex h-[1em] shrink-0 items-center justify-center">
                      {digit}
                    </span>
                  </span>
                </span>
              ))}
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
}
