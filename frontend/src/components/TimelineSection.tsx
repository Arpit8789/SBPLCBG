'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    phase: '01',
    title: 'Initial Discussion',
    description: 'Submit your application and our team reviews your profile, location, and investment capacity before assigning a relationship manager.',
    duration: 'Week 1-2',
    icon: 'Call',
    details: ['Application review', 'Profile assessment', 'Location analysis', 'Initial consultation']
  },
  {
    phase: '02',
    title: 'Agreement and Planning',
    description: 'The partnership agreement is finalized while station design, layout planning, and regulatory documentation move forward together.',
    duration: 'Week 3-4',
    icon: 'Plan',
    details: ['Partnership agreement', 'Station design', 'Layout planning', 'Regulatory filing']
  },
  {
    phase: '03',
    title: 'Setup and Construction',
    description: 'SBPL manages civil work, equipment installation, safety systems, and technical integration from end to end.',
    duration: 'Month 2-4',
    icon: 'Build',
    details: ['Civil construction', 'Equipment installation', 'Safety systems', 'Tech integration']
  },
  {
    phase: '04',
    title: 'Commissioning and Launch',
    description: 'Final inspections, government approvals, staff training, and launch readiness bring the station online.',
    duration: 'Month 5-6',
    icon: 'Go',
    details: ['Final inspection', 'Govt. approvals', 'Staff training', 'Grand launch']
  }
];

export default function TimelineSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding section-divider relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
      </div>

      <div className="grid-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="section-label mx-auto">Execution Timeline</div>
          <h2 className="section-title">
            From Application to <span className="gradient-text">Launch</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Shivay BioIndhan follows a staged rollout so progress feels visible, structured, and easier to follow from day one.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute bottom-0 left-6 top-0 hidden w-px bg-gradient-to-b from-green-500/30 via-green-500/10 to-transparent md:block md:left-1/2" />

          {steps.map((step, i) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, y: 40, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.16 }}
              className={`relative mb-16 flex flex-col gap-8 md:flex-row md:items-start md:gap-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <div className="glass-card inline-block w-full max-w-xl p-8 md:p-10">
                  <div
                    className="mb-5 flex items-center gap-4"
                    style={{ flexDirection: i % 2 === 0 ? 'row-reverse' : 'row' }}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/15 text-[12px] font-bold uppercase tracking-[0.14em] text-green-300">
                      {step.icon}
                    </span>
                    <div>
                      <div className="mb-1 text-[12px] uppercase tracking-[0.18em] text-green-400/60">{step.duration}</div>
                      <h3 className="text-[24px] font-bold text-green-200" style={{ fontFamily: 'Outfit' }}>
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mb-5 text-[15px] leading-[1.85] text-green-100/45">
                    {step.description}
                  </p>

                  <div className={`flex flex-wrap gap-2.5 ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    {step.details.map((detail) => (
                      <span
                        key={detail}
                        className="rounded-full bg-green-500/10 px-3.5 py-1.5 text-[12px] text-green-400/70"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden md:flex md:flex-col md:items-center md:justify-start">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.16 + 0.3 }}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-500/40 bg-green-500/20"
                >
                  <span className="text-sm font-bold text-green-400" style={{ fontFamily: 'Outfit' }}>
                    {step.phase}
                  </span>
                </motion.div>
              </div>

              <div className="hidden flex-1 md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
