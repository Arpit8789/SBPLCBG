import Link from 'next/link';
import Image from 'next/image';

const footerSections = [
  {
    title: 'Company',
    links: [
      { name: 'About SBPL', href: '/about' },
      { name: 'Infrastructure', href: '/infrastructure' },
      { name: 'Investment Plan', href: '/investment' },
      { name: 'Why SBPL', href: '/why-sbpl' },
      { name: 'Gallery', href: '/gallery' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Partnership Guide', href: '/contact' },
      { name: 'ROI Calculator', href: '/investment' },
      { name: 'Station Designs', href: '/gallery' },
      { name: 'FAQ', href: '#' },
      { name: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Refund Policy', href: '#' },
      { name: 'Disclaimer', href: '#' },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-[#020603]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_42%)]" />

      <div className="grid-container relative py-16 md:py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex w-full flex-col items-center justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-[620px] text-center lg:text-left">
              <h3 className="font-['Outfit'] text-[2.1rem] font-extrabold leading-[1.04] tracking-tight text-white sm:text-[2.7rem] md:text-[3.15rem]">
                Ready to build your fuel empire?
              </h3>
              <p className="mt-5 text-[0.98rem] leading-8 text-gray-300 sm:text-[1.04rem]">
                Join India&apos;s fast-growing multi-energy infrastructure network with a cleaner, smarter path to expansion.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-[60px] min-w-[240px] items-center justify-center rounded-[20px] bg-gradient-to-r from-green-600 to-green-400 px-9 py-4.5 text-[17px] font-bold text-white shadow-[0_12px_28px_rgba(34,197,94,0.22)] transition-all duration-300 hover:scale-[1.02] hover:from-green-500 hover:to-green-300"
              >
                Apply for Partnership
              </Link>
              <Link
                href="/investment"
                className="inline-flex min-h-[60px] min-w-[240px] items-center justify-center rounded-[20px] border border-white/20 bg-white/[0.03] px-9 py-4.5 text-[16px] font-bold text-gray-300 transition-all duration-300 hover:border-green-400/50 hover:text-white"
              >
                View Investment Plan
              </Link>
            </div>
          </div>

          <div className="mt-14 border-t border-white/8 pt-12">
            <div className="grid grid-cols-1 gap-12 text-center lg:grid-cols-[1.2fr_repeat(3,0.8fr)] lg:items-start lg:gap-8">
              <div className="mx-auto flex max-w-[360px] flex-col items-center">
                <Link href="/" className="flex items-center gap-4">
                  <Image
                    src="/logo.png"
                    alt="SBPL Logo"
                    width={64}
                    height={64}
                    className="object-contain"
                    sizes="64px"
                  />
                  <div className="text-left">
                    <span className="block font-['Outfit'] text-[1.95rem] font-black leading-none tracking-tight">
                      <span className="text-white">SB</span>
                      <span className="text-green-500">PL</span>
                    </span>
                    <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.24em] text-green-300/90">
                      Shivay BioIndhan Pvt Ltd
                    </span>
                  </div>
                </Link>

                <p className="mt-5 text-[14px] leading-7 text-gray-400 sm:text-[15px]">
                  India&apos;s multi-energy infrastructure company for investors building cleaner and more scalable fuel businesses.
                </p>
              </div>

              {footerSections.map((section) => (
                <div key={section.title} className="mx-auto flex w-full max-w-[200px] flex-col items-center">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/95">
                    {section.title}
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-[13px] leading-6 text-gray-400 transition-colors duration-300 hover:text-green-300 sm:text-[14px]"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 border-t border-white/8 pt-8">
              <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/95">
                  Contact
                </h4>
                <Link
                  href="mailto:shivaybioindhan@gmail.com"
                  className="mt-4 text-[14px] leading-7 text-gray-300 transition-colors duration-300 hover:text-green-300 sm:text-[15px]"
                >
                  shivaybioindhan@gmail.com
                </Link>
                <p className="mt-2 max-w-[620px] text-[13px] leading-7 text-gray-400 sm:text-[14px]">
                  Khasra No.-738/2, 2nd Floor, 100 Futa Main Road, Burari, Delhi-110084
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 border-t border-white/8 pt-6 text-center lg:flex-row lg:justify-between">
              <p className="text-[12px] leading-6 text-gray-500 sm:text-[13px]">
                &copy; {currentYear} Shivay BioIndhan Pvt Ltd. All rights reserved. CIN: U40300BR2024PTC077233
              </p>
              <p className="text-[12px] leading-6 text-gray-500 sm:text-[13px]">
                Building India&apos;s clean energy future
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
