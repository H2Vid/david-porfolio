"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='fixed inset-x-0 top-0 z-50'>
      <nav className='flex flex-col justify-end items-end p-5 md:justify-center gap-4 bg-gray-800 md:bg-transparent md:backdrop-blur-xl md:mt-3 rounded-sm text-[#f1f1f1] md:text-[#111111] dark:text-[#f1f1f1] w-full md:w-[50%] md:mx-auto'>
        <button
          type='button'
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className='md:hidden'
        >
          {isOpen ? <X size={24} aria-hidden='true' /> : <Menu size={24} aria-hidden='true' />}
        </button>
        <div
          className={`${isOpen ? "flex" : "hidden"} flex-col gap-4 md:gap-10 md:flex md:flex-row md:justify-center w-full text-center  `}
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
