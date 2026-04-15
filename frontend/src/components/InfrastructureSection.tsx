'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const facilityComponents = [
  'CBG (CNG) dispensing bays and fuel dispensers for petrol and diesel',
  'EV fast DC charging zones with dedicated charging capacity',
  'Operator office, control room, and separate utilities',
  'Tanker access bay with dedicated rear movement access',
  'Wide driveway planning for smoother vehicle flow',
  'Safety compliance aligned with PESO and regulatory distance standards'
];

export default function InfrastructureSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.1, ease: 'easeOut' as const }
    })
  };

  return (
    <section id="infrastructure" className="section-padding section-divider relative overflow-hidden bg-[#000401]" ref={ref}>
      <div className="pointer-events-none absolute right-0 top-0 h-[800px] w-[800px] rounded-full bg-green-500/10 blur-[150px]" />

      <div className="grid-container relative">
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mx-auto mb-16 max-w-3xl text-center md:mb-20"
        >
          <div className="section-label mx-auto">Infrastructure Overview</div>
          <h2 className="section-title text-white">Integrated Multi-Energy Retail Station</h2>
          <p className="section-subtitle mx-auto">
            Every station layout is planned to feel operationally clean, customer-friendly, and expansion-ready across multiple energy streams.
          </p>
        </motion.div>

        <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:items-stretch xl:gap-20">
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="w-full lg:flex-1"
          >
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-[38px] border border-white/8 bg-white/5 shadow-[0_20px_60px_rgba(34,197,94,0.15)] sm:min-h-[520px]">
              <Image
                src="/gallery/gallery-4.jpeg"
                alt="SBPL Multi-Energy Fuel Station Infrastructure"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-90 transition-transform duration-[2s] hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="w-full lg:flex-1"
          >
            <div className="premium-card h-full">
              <div className="mb-8 space-y-3 md:mb-10">
                <h3 className="font-['Outfit'] text-[30px] font-bold text-white md:text-[34px]">
                  Facility Components
                </h3>
                <p className="text-[16px] leading-[1.85] text-gray-400">
                  The station layout is designed to avoid congestion and support a smoother customer and operator experience.
                </p>
              </div>

              <div className="space-y-7">
                {facilityComponents.map((component, i) => (
                  <motion.div
                    key={component}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.25 + (i * 0.08) }}
                    className="flex items-start gap-5"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-green-500/40 bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                      <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[17px] leading-[1.8] text-gray-200 md:text-[19px]">{component}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
