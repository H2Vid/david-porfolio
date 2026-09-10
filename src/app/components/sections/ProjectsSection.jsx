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
          {featuredProjects.map((project, index) => (
            <CardProjects key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
