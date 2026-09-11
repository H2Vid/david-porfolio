"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", section: "home" },
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "Projects", href: "/projects", section: "projects" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [showNav, setShowNav] = useState(true);

  // =========================================================
  // Show navbar when scrolling up
  // =========================================================
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setShowNav(true);
      } else if (currentScrollY < lastScrollY) {
        setShowNav(true);
      } else {
        setShowNav(false);
        setIsOpen(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================================================
  // Detect active section
  // =========================================================
  useEffect(() => {
    // Jika bukan homepage, Projects menjadi active
    if (pathname !== "/") {
      setActive("Projects");
      return;
    }

    const sections = navItems
      .map((item) => document.getElementById(item.section))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          const currentSection = visibleSections[0].target.id;

          const currentItem = navItems.find(
            (item) => item.section === currentSection,
          );

          if (currentItem) {
            setActive(currentItem.label);
          }
        }
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-20% 0px -50% 0px",
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  // =========================================================
  // Navigation with PageTransition
  // =========================================================
  const handleNavigation = (item) => {
    setActive(item.label);
    setIsOpen(false);

    // PageTransition akan menangani:
    // - curtain animation
    // - page navigation
    // - section navigation
    // - hash navigation
    if (window.__pageTransition) {
      window.__pageTransition(item.href);
      return;
    }

    // Fallback jika PageTransition belum tersedia
    if (item.section === "projects") {
      window.location.href = "/projects";
      return;
    }

    window.location.href = item.href;
  };

  return (
    <header
      className={`sticky top-0 z-50 px-4 transition-transform duration-300 ease-out ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="mx-auto flex w-full flex-col rounded-2xl p-3 text-[#1e1e1e] shadow-lg shadow-black/5 backdrop-blur-xl md:mt-4 md:w-fit md:min-w-125 md:flex-row md:items-center md:justify-center md:rounded-full md:bg-transparent md:p-1.5 md:shadow-none md:backdrop-blur-md dark:bg-black/50 dark:text-[#f1f1f1] dark:md:bg-transparent">
        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 hover:scale-105 hover:bg-black/5 active:scale-95 md:hidden dark:hover:bg-white/10"
        >
          {isOpen ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <Menu size={22} aria-hidden="true" />
          )}
        </button>

        {/* =====================================================
            Navigation
            ===================================================== */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 md:block ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          } md:opacity-100`}
        >
          <div className="min-h-0 overflow-hidden md:overflow-visible">
            <div className="flex w-full flex-col gap-2 pt-3 text-center md:flex-row md:items-center md:justify-center md:gap-1 md:pt-0">
              {navItems.map((item) => {
                const isActive = active === item.label;

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleNavigation(item)}
                    className={`group relative rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 md:rounded-full md:px-4 md:py-2 ${
                      isActive
                        ? `border-black/20 text-[#1e1e1e] dark:border-white/20 dark:text-[#f1f1f1]`
                        : `border-transparent hover:border-black/15 hover:text-[#1e1e1e] dark:hover:border-white/15 dark:hover:text-[#f1f1f1]`
                    } `}
                  >
                    {item.label}

                    {/* Active Indicator */}
                    <span
                      className={`absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-current transition-all duration-300 ${
                        isActive
                          ? "w-3 opacity-100"
                          : `w-0 opacity-0 group-hover:w-3 group-hover:opacity-100`
                      } `}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
