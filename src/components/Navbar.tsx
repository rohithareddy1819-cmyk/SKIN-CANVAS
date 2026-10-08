import { useEffect, useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import logoImg from '../assets/logo-transparent.png';

const navLinks = [
  { label: 'Analyze', href: '#analysis' },
  { label: 'My Skin', href: '#profile' },
  { label: 'Routine', href: '#routine' },
  { label: 'Discover', href: '#discover' },
  { label: 'Compare', href: '#compare' },
  { label: 'AI Advisor', href: '#advisor' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-md py-3'
            : 'bg-white/80 backdrop-blur-md shadow-sm py-4'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">

          {/* Logo */}
          <a href="#top" className="flex items-center select-none group" aria-label="SkinCanvas Home">
            <img
              src={logoImg}
              alt="SkinCanvas Logo"
              className="h-24 sm:h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative font-sans text-base font-semibold text-charcoal-700 transition-colors duration-200 hover:text-[#b97379] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-[#b97379] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden items-center lg:flex">
            <a
              href="#analysis"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#302625] px-8 py-3.5 font-sans text-base font-semibold text-white shadow-lg shadow-[#6e4a4a]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#453534] hover:shadow-xl active:scale-95"
            >
              <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
              Analyze My Skin
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex items-center justify-center rounded-full border border-charcoal-200 bg-white p-2.5 text-charcoal-800 shadow-sm transition-colors hover:bg-ivory-100 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Mobile menu drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[82%] max-w-sm bg-white px-8 py-7 shadow-2xl transition-transform duration-500 ease-editorial ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-ivory-200 pb-5">
            <img src={logoImg} alt="SkinCanvas Logo" className="h-16 w-auto object-contain" />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="rounded-full border border-charcoal-200 p-2 text-charcoal-700 hover:bg-ivory-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-2xl font-light text-charcoal-800 transition-colors hover:text-[#b97379]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#analysis"
            onClick={() => setMenuOpen(false)}
            className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#302625] px-6 py-3.5 font-sans text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#453534]"
          >
            <Sparkles className="h-4 w-4" />
            Analyze My Skin
          </a>
        </div>
      </div>
    </>
  );
}
