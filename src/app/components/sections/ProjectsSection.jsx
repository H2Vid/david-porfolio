"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/app/data/projects";
import { MoveUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const projectRefs = useRef([]);
  const imageRefs = useRef([]);

  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 4);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        projectRefs.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (index) => {
    gsap.to(imageRefs.current[index], {
      scale: 1.03,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (index) => {
    gsap.to(imageRefs.current[index], {
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
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
                ref={(el) => {
                  projectRefs.current[index] = el;
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                className="group block"
              >
                {/* Project */}
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
                      ref={(el) => {
                        imageRefs.current[index] = el;
                      }}
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Footer */}
                  <div className="flex h-12 items-center justify-between border-t border-[#111111] px-3 md:h-14 md:px-4 dark:border-[#f1f1f1]">
                    <span className="text-xs">
                      DEV.
                      <span className="text-blue-600">
                        {String(index + 1).padStart(3, "0")}
                      </span>
                    </span>

                    <span className="flex items-center gap-3 rounded-full bg-[#111111] px-4 py-1.5 text-[14px] tracking-wide text-[#f1f1f1] uppercase transition-transform duration-300 group-hover:scale-105 dark:bg-[#f1f1f1] dark:text-[#111111]">
                      <span>View</span>
                      <MoveUpRight size={16} />
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
