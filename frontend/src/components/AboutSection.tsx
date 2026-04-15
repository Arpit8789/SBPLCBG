'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const featureItems = [
  {
    icon: 'Plant',
    title: 'Biogas to CBG (CNG) Production',
    desc: 'Advanced internal production infrastructure keeps supply dependable and ready for scale.',
  },
  {
    icon: 'Legal',
    title: 'Federally Compliant',
    desc: 'Government registration and regulatory alignment are built into the operating model.',
  },
  {
    icon: 'Growth',
    title: 'Scalable Growth',
    desc: 'A turnkey franchise model designed around repeatable execution and strong ROI potential.',
  },
];

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' as const }
    })
  };

  return (
    <section id="about" className="section-padding section-divider relative overflow-hidden bg-[#020603]" ref={ref}>
      <div className="pointer-events-none absolute right-0 top-1/2 h-[800px] w-[800px] -translate-y-1/2 rounded-full bg-green-900/10 blur-[150px]" />

      <div className="grid-container relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 xl:gap-20">
          <div className="section-stack items-center text-center lg:col-span-5">
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className="section-label">About SBPL</div>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="heading-secondary text-white"
            >
              Powering India&apos;s
              <br />
              Clean Energy Revolution
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="subheading-prime mx-auto max-w-2xl"
            >
              <strong className="text-white">Shivay BioIndhan Pvt Ltd (SBPL)</strong> is a government-registered,
              future-ready company reshaping India&apos;s fuel infrastructure through a modern
              <strong className="text-white"> biogas-to-CBG (CNG) production platform</strong>.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="body-prime mx-auto max-w-2xl"
            >
              Shivay BioIndhan is more than a fuel company. It is a scalable business platform that helps investors
              and partners build profitable multi-energy stations with stronger operational support and clearer execution.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid w-full gap-5"
            >
              {featureItems.map((item) => (
                <div key={item.title} className="glass-card flex items-start gap-5 px-5 py-6 text-left md:px-6 md:py-7">
                  <div className="flex min-h-[56px] min-w-[80px] flex-shrink-0 items-center justify-center rounded-[18px] border border-white/10 bg-[#0a1a0a] px-4 text-[13px] font-bold uppercase tracking-[0.18em] text-green-300 shadow-inner">
                    {item.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[18px] font-semibold text-white">{item.title}</h4>
                    <p className="text-[15px] leading-[1.85] text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative lg:col-span-7 lg:pl-6 xl:pl-10"
          >
            <div className="relative min-h-[520px] overflow-hidden rounded-[36px] border border-white/8 bg-white/5 shadow-2xl sm:min-h-[580px]">
              <Image
                src="/gallery/gallery-1.jpeg"
                alt="SBPL station from the gallery"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-80 transition-transform duration-[2s] hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020603] via-transparent to-transparent opacity-80" />
            </div>

            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-5 left-5 max-w-[320px] rounded-[28px] border border-white/10 bg-[#0a140d]/95 p-6 text-left shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-md md:bottom-8 md:left-8 md:p-7"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-green-500/30 bg-green-500/20 text-green-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-[16px] font-bold text-white">Govt. Certified</div>
                  <div className="mt-1 text-[12px] tracking-wide text-gray-500">CIN: U40300BR...</div>
                </div>
              </div>
              <p className="text-[14px] leading-[1.8] text-gray-400">
                Structured for compliant growth with a supply-backed operating model and clearer investor confidence.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
