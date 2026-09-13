"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/app/data/projects";
import CardProjects from "../components/ui/cardProjects";

const categories = ["All", "Web", "Design", "Case Studies"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) =>
          project.categories?.includes(activeCategory),
        );

  return (
    <main className="flex w-full flex-col p-4 text-[#111111] md:p-20 dark:text-[#f1f1f1]">
      <div className="mx-auto max-w-7xl">
        {/* Back */}
        <Link
          href="/"
          className="group mb-20 inline-flex items-center gap-2 text-sm text-[#111111]/50 transition-colors hover:text-[#111111] dark:text-[#f1f1f1]/50 dark:hover:text-[#f1f1f1]"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-6xl font-medium tracking-[-0.06em] uppercase md:text-7xl lg:text-8xl">
            Projects
          </h1>

          {/* Tabs */}
          <div className="mt-10 flex flex-wrap items-center gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-5 py-2 text-sm transition-all duration-300 ${
                    isActive
                      ? "border-[#111111] bg-[#111111] text-[#f1f1f1] dark:border-[#f1f1f1] dark:bg-[#f1f1f1] dark:text-[#111111]"
                      : "border-[#111111]/20 text-[#111111]/50 hover:border-[#111111] hover:text-[#111111] dark:border-[#f1f1f1]/20 dark:text-[#f1f1f1]/50 dark:hover:border-[#f1f1f1] dark:hover:text-[#f1f1f1]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <CardProjects key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="flex min-h-60 items-center justify-center border border-[#111111]/20 dark:border-[#f1f1f1]/20">
            <p className="text-sm text-[#111111]/50 dark:text-[#f1f1f1]/50">
              No projects found.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
