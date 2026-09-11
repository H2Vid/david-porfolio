"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="flex w-full flex-col items-end justify-end gap-4 rounded-sm bg-gray-800 p-5 text-[#f1f1f1] md:mx-auto md:mt-3 md:w-[50%] md:justify-center md:bg-transparent md:text-[#111111] md:backdrop-blur-xl dark:text-[#f1f1f1]">
        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden"
        >
          {isOpen ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>
        <div
          className={`${isOpen ? "flex" : "hidden"} w-full flex-col gap-4 text-center md:flex md:flex-row md:justify-center md:gap-10`}
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
