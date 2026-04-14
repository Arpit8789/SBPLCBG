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
    icon: 'Launch',
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

        <div className="mx-auto flex max-w-5xl flex-col gap-8 md:gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="glass-card rounded-[32px] px-6 py-8 text-center md:px-10 md:py-10"
            >
              <div className="mb-5 flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-green-500/40 bg-green-500/18 text-[15px] font-bold tracking-[0.12em] text-green-300">
                  {step.phase}
                </div>
                <div className="space-y-2">
                  <div className="text-[13px] uppercase tracking-[0.22em] text-green-400/70">{step.duration}</div>
                  <h3 className="font-['Outfit'] text-[28px] font-bold text-white md:text-[34px]">{step.title}</h3>
                </div>
              </div>

              <p className="mx-auto mb-6 max-w-3xl text-[16px] leading-[1.9] text-green-100/50 md:text-[18px]">
                {step.description}
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {step.details.map((detail) => (
                  <span
                    key={detail}
                    className="rounded-full bg-green-500/10 px-4 py-2 text-[13px] text-green-400/80"
                  >
                    {detail}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
