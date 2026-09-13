import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { projects } from "@/app/data/projects";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const project = projects.find((project) => project.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;

  const projectIndex = projects.findIndex((project) => project.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const projectNumber = String(projectIndex + 1).padStart(2, "0");

  return (
    <div className="p-2 md:p-20">
      {/* =====================================================
          BACK / NAVIGATION
      ====================================================== */}
      <div className="group mx-auto inline-flex max-w-7xl items-center gap-2 px-6 pt-5 text-sm text-[#111111]/50 transition-colors duration-300 hover:text-[#111111] md:px-10 lg:px-16 dark:text-[#f1f1f1]/50 dark:hover:text-[#f1f1f1]">
        <Link
          href="/projects"
          className="flex items-center justify-center gap-2"
        >
          <ArrowLeft
            size={16}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          <span>Back to projects</span>
        </Link>
      </div>

      {/* =====================================================
          PROJECT HERO
      ====================================================== */}
      <section className="px-6 pt-16 pb-16 md:px-10 md:pt-24 md:pb-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Meta */}
          <div className="mb-8 flex items-center justify-between border-b border-[#111111]/15 pb-4 dark:border-[#f1f1f1]/15">
            <p className="text-[11px] font-medium tracking-[0.2em] text-[#111111]/50 uppercase dark:text-[#f1f1f1]/50">
              {project.type === "case-study"
                ? "Case Study"
                : "Selected Project"}
            </p>

            <span className="font-mono text-xs text-[#111111]/50 dark:text-[#f1f1f1]/50">
              / {projectNumber}
            </span>
          </div>

          {/* Title */}
          <h1 className="max-w-6xl text-5xl leading-[0.9] font-medium tracking-[-0.055em] text-[#111111] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] dark:text-[#f1f1f1]">
            {project.title}
          </h1>
          {project.collaboration === "Freelance / White-Label" && (
            <div className="border-t border-[#111111] px-4 py-3 dark:border-[#f1f1f1]">
              <p className="text-[10px] leading-relaxed text-neutral-500 md:text-xs dark:text-neutral-400">
                <span className="font-medium text-red-500">DISCLAIMER:</span>
                This project is not my personal intellectual property. It was
                completed under a freelance, white-label arrangement for a
                digital agency and its client. All rights, ownership, and
                intellectual property related to the project remain with the
                respective agency and/or client. This portfolio entry only
                showcases the work I personally contributed to and does not
                imply ownership or authorship of the project as a whole.
              </p>
            </div>
          )}

          {/* Description */}
          <div className="mt-14 grid gap-8 md:grid-cols-[1fr_2fr] md:items-start">
            <div>
              <span className="text-xs font-medium tracking-[0.18em] text-[#111111]/50 uppercase dark:text-[#f1f1f1]/50">
                Overview
              </span>
            </div>

            <p className="max-w-3xl text-xl leading-[1.4] tracking-[-0.02em] text-[#111111]/70 md:text-2xl lg:text-3xl dark:text-[#f1f1f1]/70">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECT IMAGE
      ====================================================== */}
      <section className="px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="group relative overflow-hidden rounded-sm border border-[#111111]/15 dark:border-[#f1f1f1]/15">
            <div className="absolute inset-0 z-10 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:bg-white/5" />

            <img
              src={project.image}
              alt={project.title}
              className="aspect-16/10 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECT DETAILS
      ====================================================== */}
      <section className="px-6 py-24 md:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            {/* Section Label */}
            <div>
              <div className="sticky top-10">
                <div className="mb-4 h-px w-10 bg-[#111111] dark:bg-[#f1f1f1]" />

                <p className="text-xs font-medium tracking-[0.18em] text-[#111111]/50 uppercase dark:text-[#f1f1f1]/50">
                  Project Details
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="divide-y divide-[#111111]/15 border-y border-[#111111]/15 dark:divide-[#f1f1f1]/15 dark:border-[#f1f1f1]/15">
              {/* Role */}
              <div className="grid gap-4 py-7 md:grid-cols-[180px_1fr] md:gap-10">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#111111]/40 dark:text-[#f1f1f1]/40">
                    01
                  </span>

                  <span className="text-xs font-medium tracking-[0.15em] text-[#111111]/50 uppercase dark:text-[#f1f1f1]/50">
                    Role
                  </span>
                </div>

                <p className="text-lg leading-relaxed text-[#111111] md:text-xl dark:text-[#f1f1f1]">
                  {project.role}
                </p>
              </div>

              {/* Contribution */}
              <div className="grid gap-4 py-7 md:grid-cols-[180px_1fr] md:gap-10">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#111111]/40 dark:text-[#f1f1f1]/40">
                    02
                  </span>

                  <span className="text-xs font-medium tracking-[0.15em] text-[#111111]/50 uppercase dark:text-[#f1f1f1]/50">
                    Contribution
                  </span>
                </div>

                <p className="max-w-3xl text-lg leading-[1.6] text-[#111111]/70 md:text-xl dark:text-[#f1f1f1]/70">
                  {project.contribution}
                </p>
              </div>

              {/* Technologies */}
              <div className="grid gap-5 py-7 md:grid-cols-[180px_1fr] md:gap-10">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#111111]/40 dark:text-[#f1f1f1]/40">
                    03
                  </span>

                  <span className="text-xs font-medium tracking-[0.15em] text-[#111111]/50 uppercase dark:text-[#f1f1f1]/50">
                    Stack
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-[#111111]/20 px-4 py-2 text-sm text-[#111111] transition-colors duration-300 hover:bg-[#111111] hover:text-white dark:border-[#f1f1f1]/20 dark:text-[#f1f1f1] dark:hover:bg-[#f1f1f1] dark:hover:text-[#111111]"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VIEW PROJECT
      ====================================================== */}
      {project.viewProject?.url && project.viewProject.url !== "#" && (
        <section className="px-6 pb-32 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <a
              href={project.viewProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-between border-y border-[#111111]/15 py-6 transition-colors duration-300 hover:bg-[#111111] md:px-6 md:py-8 dark:border-[#f1f1f1]/15 dark:hover:bg-[#f1f1f1]"
            >
              <div>
                <span className="mb-2 block text-[10px] font-medium tracking-[0.18em] text-[#111111]/50 uppercase transition-colors duration-300 group-hover:text-white dark:text-[#f1f1f1]/50 dark:group-hover:text-[#111111]">
                  External Link
                </span>

                <span className="block text-2xl font-medium tracking-tight text-[#111111] transition-colors duration-300 group-hover:text-white md:text-3xl dark:text-[#f1f1f1] dark:group-hover:text-[#111111]">
                  {project.viewProject.type === "github"
                    ? "View on GitHub"
                    : "View project"}
                </span>
              </div>

              <ArrowUpRight
                size={28}
                strokeWidth={1.5}
                className="text-[#111111] transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white dark:text-[#f1f1f1] dark:group-hover:text-[#111111]"
              />
            </a>
          </div>
        </section>
      )}

      {/* =====================================================
          NEXT PROJECT
      ====================================================== */}
      <section className="border-t border-[#111111]/15 dark:border-[#f1f1f1]/15">
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group block px-6 py-24 transition-colors duration-500 hover:bg-[#111111] md:px-10 md:py-40 lg:px-16 dark:hover:bg-[#f1f1f1]"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#111111]/40 transition-colors duration-500 group-hover:bg-white/40 dark:bg-[#f1f1f1]/40 dark:group-hover:bg-[#111111]/40" />

                <p className="text-xs font-medium tracking-[0.2em] text-[#111111]/50 uppercase transition-colors duration-500 group-hover:text-white/50 dark:text-[#f1f1f1]/50 dark:group-hover:text-[#111111]/50">
                  Next project
                </p>
              </div>

              <ArrowUpRight
                size={24}
                strokeWidth={1.5}
                className="text-[#111111] transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white dark:text-[#f1f1f1] dark:group-hover:text-[#111111]"
              />
            </div>

            <h2 className="max-w-6xl text-5xl leading-[0.9] font-medium tracking-[-0.055em] text-[#111111] transition-colors duration-500 group-hover:text-white sm:text-6xl md:text-8xl lg:text-9xl dark:text-[#f1f1f1] dark:group-hover:text-[#111111]">
              {nextProject.title}
            </h2>

            <div className="mt-10 flex items-center gap-3 text-sm text-[#111111]/50 transition-colors duration-500 group-hover:text-white/50 dark:text-[#f1f1f1]/50 dark:group-hover:text-[#111111]/50">
              <span className="font-mono">
                {String(((projectIndex + 1) % projects.length) + 1).padStart(
                  2,
                  "0",
                )}
              </span>

              <span>Explore next project</span>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
