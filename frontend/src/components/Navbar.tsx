'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Infrastructure', href: '/infrastructure' },
  { name: 'Investment', href: '/investment' },
  { name: 'Why SBPL', href: '/why-sbpl' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] border-b border-white/6 transition-all duration-300 ${
        scrolled ? 'bg-black/92 backdrop-blur-xl shadow-2xl shadow-green-950/20' : 'bg-[#020603]/55 backdrop-blur-md'
      }`}>
        <div className="grid-container flex min-h-[var(--navbar-height)] items-center justify-between gap-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 md:gap-5">
            <div className="relative h-[76px] w-[76px] shrink-0 md:h-[90px] md:w-[90px]">
              <Image src="/logo.png" alt="SBPL Logo" fill loading="eager" sizes="(max-width: 768px) 76px, 90px" className="object-contain" />
            </div>
            <div>
              <span className="block font-['Outfit'] text-[2rem] font-black leading-none tracking-wide md:text-[2.35rem]">
                <span className="text-white">SB</span><span className="text-green-500">PL</span>
              </span>
              <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.23em] text-green-400 md:text-[12px]">
                Shivay BioIndhan Pvt Ltd
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group relative px-1 py-3 text-[15px] font-bold tracking-[0.04em] transition-all duration-300 xl:text-[16px] ${
                    isActive ? 'text-green-400' : 'text-gray-300 hover:text-white'
                  }`}
                  style={{ fontFamily: 'Plus Jakarta Sans' }}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-green-500 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              );
            })}
          </div>

          {/* Connect & Mobile Toggle */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="/contact"
              className="hidden lg:inline-flex min-h-[48px] items-center justify-center rounded-xl bg-green-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-400"
            >
              Apply Now
            </Link>
            
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5 rounded-full border border-white/10 bg-white/5 p-3 lg:hidden"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-5 h-[2px] bg-green-400 block transition-all"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-[2px] bg-green-400 block transition-all"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-5 h-[2px] bg-green-400 block transition-all"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="fixed top-[var(--navbar-height)] right-0 bottom-0 left-0 z-40 flex flex-col bg-black/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block w-full rounded-[20px] px-4 py-3 text-center text-lg font-medium transition-all sm:px-6 sm:py-4 sm:text-xl ${
                      pathname === link.href
                        ? 'text-white bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-3 w-full"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full rounded-[20px] bg-gradient-to-r from-green-600 to-green-400 px-4 py-3 text-center text-base font-bold text-white shadow-[0_0_30px_rgba(34,197,94,0.4)] sm:px-6 sm:py-4 sm:text-lg"
                >
                  Apply for Partnership
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
