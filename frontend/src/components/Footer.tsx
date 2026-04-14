'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  company: [
    { name: 'About SBPL', href: '/about' },
    { name: 'Infrastructure', href: '/infrastructure' },
    { name: 'Investment Plan', href: '/investment' },
    { name: 'Why SBPL', href: '/why-sbpl' },
    { name: 'Gallery', href: '/gallery' },
  ],
  resources: [
    { name: 'Partnership Guide', href: '/contact' },
    { name: 'ROI Calculator', href: '/investment' },
    { name: 'Station Designs', href: '/gallery' },
    { name: 'FAQ', href: '#' },
    { name: 'Blog', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Refund Policy', href: '#' },
    { name: 'Disclaimer', href: '#' },
  ]
};

export default function Footer() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <footer className="relative overflow-hidden border-t border-white/5" ref={ref}>
      <div className="border-b border-white/5 bg-[#030804] py-24 md:py-28">
        <div className="grid-container">
          <div className="mx-auto flex w-full max-w-[860px] flex-col items-center justify-center text-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="mb-6 font-['Outfit'] text-[36px] font-bold tracking-tight text-white md:text-[52px]"
            >
              Ready to Build Your Fuel Empire?
            </motion.h3>
            <p className="mb-10 max-w-2xl text-[18px] leading-[1.9] text-gray-400 md:text-[20px]">
              Join India&apos;s fastest-growing multi-energy infrastructure network. Limited territories available.
            </p>
            <Link
              href="/contact"
              className="btn-primary inline-flex min-w-[220px] items-center justify-center"
            >
              Apply for Partnership
            </Link>
          </div>
        </div>
      </div>

      <div className="py-20 md:py-24">
        <div className="grid-container">
          <div className="grid grid-cols-1 gap-16 text-center md:grid-cols-2 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div className="flex flex-col items-center lg:col-span-4 lg:pr-10">
              <Link href="/" className="mb-8 flex items-center gap-4">
                <div className="relative h-14 w-14">
                  <Image src="/logo.png" alt="SBPL Logo" fill className="object-contain" />
                </div>
                <div>
                  <span className="block font-['Outfit'] text-2xl font-black leading-none tracking-wide">
                    <span className="text-white">SB</span><span className="text-green-500">PL</span>
                  </span>
                  <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
                    Shivay BioIndhan Pvt Ltd
                  </span>
                </div>
              </Link>

              <p className="mx-auto max-w-md text-[15px] leading-[1.9] text-gray-500 md:text-[16px]">
                India&apos;s premier multi-energy fuel infrastructure company, enabling investors to build highly profitable multi-energy stations across the nation.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4 xl:gap-12">
              <div>
                <h4 className="mb-6 text-[13px] font-semibold uppercase tracking-[0.2em] text-white">Company</h4>
                <ul className="space-y-4">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-[15px] text-gray-500 transition-colors hover:text-green-400">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-6 text-[13px] font-semibold uppercase tracking-[0.2em] text-white">Resources</h4>
                <ul className="space-y-4">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-[15px] text-gray-500 transition-colors hover:text-green-400">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-6 text-[13px] font-semibold uppercase tracking-[0.2em] text-white">Legal</h4>
                <ul className="space-y-4">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-[15px] text-gray-500 transition-colors hover:text-green-400">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-6 text-[13px] font-semibold uppercase tracking-[0.2em] text-white">Contact</h4>
                <ul className="space-y-4 text-[15px] text-gray-500">
                  <li>shivaybioindhan@gmail.com</li>
                  <li className="leading-relaxed">Khsra No.-738/2,<br />2nd Floor, 100 Futa,<br />Main Road, Burari,<br />Delhi-110084</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-center md:flex-row">
            <p className="text-[13px] leading-relaxed text-gray-600">
              &copy; {new Date().getFullYear()} Shivay BioIndhan Pvt Ltd (SBPL). All rights reserved.<br className="md:hidden" /> CIN: U40300BR2024PTC077233
            </p>
            <p className="text-[13px] text-gray-600">
              Building India&apos;s Clean Energy Future
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
