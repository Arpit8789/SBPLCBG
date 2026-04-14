'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const timelineSteps = [
  { time: '2-3 weeks', title: 'Project Discussion', icon: 'Plan' },
  { time: '4-6 weeks', title: 'Agreement Signing', icon: 'Deal' },
  { time: '4-6 weeks', title: 'Project Initiation', icon: 'Build' },
  { time: '2-3 weeks', title: 'Execution and Commissioning', icon: 'Launch' },
];

const partnerReasons = [
  'Comprehensive execution support from a proven delivery team',
  'Expertise in integrated multi-energy infrastructure planning',
  'ROI-focused business models with faster payback visibility',
  'In-depth regulatory support and compliance guidance',
  'A clear sustainability story backed by green energy solutions'
];

const investmentReasons = [
  'Rising fuel demand across diversified energy formats',
  'Growth in EV adoption and charging infrastructure',
  'Recurring revenue from multiple energy streams',
  'Long-term alignment with clean mobility expansion'
];

export default function WhySbplSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding section-divider relative overflow-hidden bg-[#020603]" ref={ref}>
      <div className="grid-container relative">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <div className="section-label mx-auto">Why SBPL</div>
          <h2 className="section-title text-white">A clearer path to a stronger fuel business</h2>
          <p className="section-subtitle mx-auto">
            The business case is stronger when execution support, infrastructure planning, and long-term market demand all line up.
          </p>
        </div>

        <div className="mb-20 grid gap-8 md:grid-cols-2 xl:gap-10">
          <div className="premium-card h-full">
            <h3 className="mb-8 font-['Outfit'] text-[30px] font-bold text-white">A Future-Ready Energy Partner</h3>
            <ul className="space-y-6">
              {partnerReasons.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <div className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20 text-[14px] font-bold text-green-400">
                    OK
                  </div>
                  <span className="text-[17px] leading-[1.85] text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="premium-card h-full">
            <h3 className="mb-8 font-['Outfit'] text-[30px] font-bold text-white">Why Invest in Multi-Energy Stations</h3>
            <ul className="space-y-6">
              {investmentReasons.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <div className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20 text-[14px] font-bold text-green-400">
                    OK
                  </div>
                  <span className="text-[17px] leading-[1.85] text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h3 className="mb-12 font-['Outfit'] text-[32px] font-bold text-white md:mb-16">Next Steps</h3>

          <div className="relative flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-6">
            <div className="absolute left-[10%] right-[10%] top-[44px] hidden h-[2px] bg-green-900/50 md:block" />

            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.18 }}
                className="relative z-10 flex w-full flex-col items-center"
              >
                <div className="mb-6 flex h-[88px] w-[88px] items-center justify-center rounded-full border-4 border-[#020603] bg-gradient-to-br from-green-400 to-green-600 text-[13px] font-bold uppercase tracking-[0.14em] text-[#021406] shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  {step.icon}
                </div>
                <h4 className="mb-4 max-w-[220px] text-center text-[20px] font-bold text-white">{step.title}</h4>
                <div className="rounded-full border border-green-500/30 bg-green-500/10 px-6 py-2.5 text-[13px] font-bold uppercase tracking-[0.16em] text-green-400">
                  {step.time}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
