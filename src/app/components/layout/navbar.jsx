import Link from "next/link"

export default function Navbar() {
  return (
    <header>
      <nav className='flex justify-center gap-4 bg-red-500 p-4 text-white'>
        <Link href='/'>Home</Link>
        <Link href='#projects'>Projects</Link>
        <Link href='#exprience'>Experience</Link>
        <Link href='#contact'>Contact</Link>
      </nav>
    </header>
  )
}
