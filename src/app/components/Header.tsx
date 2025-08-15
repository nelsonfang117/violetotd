import Link from 'next/link'
import { ReactNode } from 'react'

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => (
  <Link
    href={href}
    className="hover:text-violet-600 transition-colors"
  >
    {children}
  </Link>
);

export default function Header() {
  return (
    <header className="w-full border-b border-violet-100 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="text-xl font-bold text-violet-700"
          >
            VIOLETOTD
          </Link>
        </div>

        <div className="flex items-center gap-6">
            <NavLink href="/">Home</NavLink>
            <div className="flex gap-6 font-bold">
                <NavLink href="/brands/kia">KIA</NavLink>
                <NavLink href="/brands/hyundai">Hyundai</NavLink>
            </div>
            <NavLink href="/about">About</NavLink>
            {/* <NavLink href="/features">Features</NavLink> */}
            <NavLink href="/contact">Contact</NavLink>
            <button className="rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700">
                Sign In
            </button>
            <button className="rounded-full bg-purple-400 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500">
                Register
            </button>
          <button className="md:hidden">☰</button>
        </div>
      </div>
    </header>
  );
}