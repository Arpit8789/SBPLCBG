'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const certifications = [
  {
    icon: 'MCA',
    title: 'MCA Registered',
    description: 'Registered under the Ministry of Corporate Affairs, Government of India.',
    detail: 'CIN: U40300BR2024PTC077233'
  },
  {
    icon: 'PNG',
    title: 'PNGRB Compliant',
    description: 'Operational planning aligned with petroleum and natural gas regulatory expectations.',
    detail: 'Full regulatory compliance'
  },
  {
    icon: 'SAFE',
    title: 'Safety Standards',
    description: 'Equipment and safety systems are planned around strong compliance baselines.',
    detail: 'ISO safety standards'
  },
  {
    icon: 'GREEN',
    title: 'Environmental Clearance',
    description: 'Biogas-to-CBG (CNG) operations are positioned around cleaner energy commitments.',
    detail: 'Green energy certified'
  },
  {
    icon: 'FIRE',
    title: 'Fire Safety',
    description: 'Fire safety approvals and recurring audit readiness strengthen investor confidence.',
    detail: 'Annual compliance'
  },
  {
    icon: 'LEGAL',
    title: 'Legal Protection',
    description: 'Transparent partnership documentation helps create a safer, more predictable relationship.',
    detail: 'Investor protection'
  }
];

export default function TrustSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding section-divider relative overflow-hidden bg-[#020603]" ref={ref}>
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-green-500/5 blur-[150px]" />

      <div className="grid-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="section-label mx-auto">Trust and Compliance</div>
          <h2 className="section-title text-white">
            Government Backed. <span className="text-green-400">Fully Compliant.</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Shivay BioIndhan operates with a stronger compliance story so the business feels more credible, separated, and easier to trust.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="premium-card group h-full"
            >
              <div className="flex h-full flex-col">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-[#0a140d] text-[11px] font-bold uppercase tracking-[0.12em] text-green-300 shadow-inner">
                  {cert.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-[22px] font-bold text-white" style={{ fontFamily: 'Outfit' }}>
                    {cert.title}
                  </h3>
                  <p className="text-[15px] leading-[1.85] text-gray-400">
                    {cert.description}
                  </p>
                  <span className="inline-block rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-[12px] font-medium text-green-400">
                    {cert.detail}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="premium-card mt-16 text-center"
        >
          <div className="flex flex-col gap-8 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-12">
            <div className="space-y-2">
              <div className="text-[40px] font-bold text-white" style={{ fontFamily: 'Outfit' }}>100%</div>
              <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-green-400">Legal Compliance</div>
            </div>
            <div className="hidden h-16 w-px bg-white/10 md:block" />
            <div className="space-y-2">
              <div className="text-[40px] font-bold text-white" style={{ fontFamily: 'Outfit' }}>Govt.</div>
              <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-green-400">Registered Entity</div>
            </div>
            <div className="hidden h-16 w-px bg-white/10 md:block" />
            <div className="space-y-2">
              <div className="text-[40px] font-bold text-white" style={{ fontFamily: 'Outfit' }}>ISO</div>
              <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-green-400">Safety Standards</div>
            </div>
            <div className="hidden h-16 w-px bg-white/10 md:block" />
            <div className="space-y-2">
              <div className="text-[40px] font-bold text-white" style={{ fontFamily: 'Outfit' }}>24/7</div>
              <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-green-400">Partner Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
