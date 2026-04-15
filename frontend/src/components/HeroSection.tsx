'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex h-screen min-h-[860px] w-full items-center justify-center overflow-hidden bg-black">
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-70"
        >
          <source src="/SBPLVIDEO.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlays for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020603]/80 via-[#020603]/40 to-[#020603]" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="grid-container relative z-10 flex w-full flex-col items-center justify-center text-center">
        
        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mx-auto flex max-w-[1080px] flex-col items-center gap-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative mb-2 h-44 w-44 drop-shadow-[0_0_40px_rgba(34,197,94,0.4)] md:h-94 md:w-94"
          >
            <Image src="/logo.png" alt="SBPL Logo" fill priority sizes="(max-width: 768px) 176px, 256px" className="relative z-10 object-contain" />
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-[40px] z-0" />
          </motion.div>

          {/* Epic Scaled Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="heading-prime max-w-[980px] text-white leading-[1.05]"
          >
            The Future of Multi-Energy <br className="hidden md:block" /> Fuel Stations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="subheading-prime mx-auto max-w-[860px] text-gray-300"
          >
            Partner with Shivay BioIndhan Pvt Ltd (SBPL) and build a highly profitable CBG (CNG), Petrol, Diesel & EV charging empire with an estimated <strong className="text-white">50-65% ROI</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex w-full flex-col gap-5 sm:w-auto sm:flex-row"
          >
            <Link
              href="/contact"
              className="flex min-h-[72px] items-center justify-center gap-3 rounded-[20px] bg-green-500 px-12 py-6 text-center text-[18px] font-black text-black shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all hover:scale-[1.02] hover:bg-green-400 md:min-h-[80px] md:px-14 md:text-[19px]"
            >
              Apply for Partnership
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/investment"
              className="flex min-h-[72px] items-center justify-center rounded-[20px] border-2 border-white/20 bg-black/60 px-12 py-6 text-center text-[18px] font-bold text-white backdrop-blur-md transition-all hover:border-white/50 hover:bg-white/5 md:min-h-[80px] md:px-14 md:text-[19px]"
            >
              View Investment Plan
            </Link>
          </motion.div>
        </motion.div>
        
      </div>
      
    </section>
  );
}
