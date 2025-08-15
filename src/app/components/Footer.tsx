import Link from 'next/link'
import { ReactNode } from 'react'

interface FooterLinkProps {
    href: string
    children: ReactNode
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <Link
    href={href}
    className="text-black hover:text-violet-800 hover:underline underline-offset-4 transition-colors"
  >
    {children}
  </Link>
);

export default function Footer() {
  return (
    <footer className="border-t border-violet-100 bg-white/50 py-8 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-violet-800">VIOLETOTD</h3>
            <p className="text-sm text-black">
              Buy cars. Transparent and hassle-free.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-violet-800">
              Links
            </h4>
            <nav className="flex flex-col space-y-2 ">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              {/* <FooterLink href="/features">Features</FooterLink> */}
              <FooterLink href="/contact">Contact</FooterLink>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-violet-800">
              Brands
            </h4>
            <nav className="flex flex-col space-y-2">
              <FooterLink href="/brands/kia">KIA</FooterLink>
              <FooterLink href="/brands/hyundai">Hyundai</FooterLink>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-violet-800">
              Legal
            </h4>
            <nav className="flex flex-col space-y-2">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/cookies">Cookie Policy</FooterLink>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-violet-800">
              Connect
            </h4>
            <div className="flex space-x-4">
              {/* Social icons would go here */}
              <span className="h-6 w-6 rounded-full bg-violet-200"></span>
              <span className="h-6 w-6 rounded-full bg-violet-200"></span>
              <span className="h-6 w-6 rounded-full bg-violet-200"></span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-violet-100 pt-6 text-center text-sm text-violet-600">
          © {new Date().getFullYear()} VIOLETOTD. All rights reserved.
        </div>
      </div>
    </footer>
  );
}