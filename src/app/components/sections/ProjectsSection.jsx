"use client";

import Link from "next/link";
import { projects } from "@/app/data/projects";
import CardProjects from "../ui/cardProjects";

export default function ProjectsSection() {
  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 4);

  return (
    <section
      id="projects"
      className="px-6 py-24 text-[#111111] md:px-10 md:py-32 lg:px-16 dark:text-[#f1f1f1]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between md:mb-16">
          <div>
            <p className="mb-3 text-sm tracking-[0.2em] text-neutral-500 uppercase">
              03
            </p>

            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Projects
            </h2>
          </div>

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
          {featuredProjects.map((project, index) => (
            <CardProjects key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
