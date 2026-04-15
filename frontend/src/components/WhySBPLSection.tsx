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

/* ─── News / Media coverage articles ─── */
const newsArticles = [
  {
    source: 'Jagran',
    title: 'GAIL to Boost CNG Supply with New Mother Stations in Patna',
    desc: 'GAIL is setting up new CNG mother stations in Patna to meet the surging demand for compressed natural gas across Bihar.',
    url: 'https://www.jagran.com/bihar/patna-city-patna-city-news-gail-to-boost-cng-supply-with-new-mother-stations-23984537.html',
    tag: 'CNG Infrastructure',
  },
  {
    source: 'Aaj Tak',
    title: 'Ethanol Blended E20 Fuel — Nitin Gadkari Backs Green Transition',
    desc: 'Union Minister Nitin Gadkari champions E20 ethanol-blended petrol as India\'s clean fuel future at the BT India@100 Summit.',
    url: 'https://www.aajtak.in/business/story/ethanol-blended-fuel-e20-petrol-can-reduce-mileage-says-morth-minister-nitin-gadkari-at-bt-india-at-100-summit-ntc-2044564-2024-01-27',
    tag: 'Green Fuel Policy',
  },
  {
    source: 'Jagran',
    title: 'Bihar Launches Special Economic Package for New Businesses',
    desc: 'Bihar\'s industrial incentive package is attracting fresh investment in energy, manufacturing, and infrastructure sectors.',
    url: 'https://www.jagran.com/bihar/patna-city-bihar-industries-special-economic-package-for-new-businesses-in-patna-24015314.html',
    tag: 'Business Policy',
  },
  {
    source: 'Hindustan',
    title: '₹1.80 Lakh Crore Investment as 17 New Industrial Parks Approved',
    desc: 'Bihar govt approves 17 new industrial parks with ₹3,500 cr land acquisition budget — projected to bring ₹1.80 lakh crore in investments.',
    url: 'https://www.livehindustan.com/bihar/story-land-acquisition-for-17-new-industrial-parks-approved-rs-1-80-lakh-crore-investment-will-come-203629820.html',
    tag: 'Industrial Growth',
  },
  {
    source: 'Jagran',
    title: 'Bettiah: Land Identified for Piped Gas Supply Control Station',
    desc: 'West Champaran gears up for city gas distribution — land identified for piped natural gas control station in Bettiah.',
    url: 'https://www.jagran.com/bihar/west-champaran-bettiah-piped-gas-supply-control-station-land-identified-hindi-news-40115993.html',
    tag: 'Gas Distribution',
  },
  {
    source: 'Aaj Tak',
    title: 'Napier Grass for Dairy — Waste-to-Value Bio Energy Cycle',
    desc: 'Experts highlight how dairy waste water can be used to cultivate Napier grass, creating a self-sustaining bio-energy ecosystem.',
    url: 'https://www.aajtak.in/agriculture/story/dairy-waste-water-for-napier-grass-know-the-benefits-animal-husbandry-milk-production-szlbs-2298179-2025-01-03',
    tag: 'Bio Energy',
  },
  {
    source: 'Navbharat Times',
    title: 'Paddy Straw (Parali) Is Now Generating Power — Here\'s the Math',
    desc: 'Parali is no longer just animal fodder — it is powering bioenergy plants. Punjab\'s declining stubble burning proves the shift.',
    url: 'https://navbharattimes.indiatimes.com/business/business-news/paddy-straw-is-not-only-animal-chara-it-also-useful-in-electrity-generation/articleshow/115199193.cms',
    tag: 'Biomass Power',
  },
  {
    source: 'YouTube',
    title: 'CBG & Biofuel — India\'s Next Energy Revolution (Short)',
    desc: 'A quick visual explainer on how Compressed Biogas is becoming India\'s most promising alternative fuel source.',
    url: 'https://youtube.com/shorts/IVSsrN19DBM?si=yoa5zhv_H-Ct_pAu',
    tag: 'Video',
  },
  {
    source: 'Hindustan',
    title: 'CNG from Sugarcane — Bihar\'s First Factory Planned in Bettiah',
    desc: 'Bihar is set to produce domestic gas and CNG from sugarcane — the first factory is being planned in Bettiah, West Champaran.',
    url: 'https://www.livehindustan.com/bihar/story-domestic-gas-and-cng-production-from-sugarcane-in-bihar-first-factory-will-establish-in-bettiah-lpg.html',
    tag: 'CBG Production',
  },
  {
    source: 'Jagran',
    title: 'Patna to Get 12 New CNG Stations — Shorter Queues Ahead',
    desc: 'GAIL is rapidly expanding the CNG network with 12 new stations in the Patna region to ease pressure on existing outlets.',
    url: 'https://www.jagran.com/bihar/patna-city-patna-to-get-12-new-cng-stations-shorter-queues-for-drivers-40170381.html',
    tag: 'CNG Expansion',
  },
  {
    source: 'Jansatta',
    title: 'Green Energy Push — India\'s Biofuel & CBG Policy Roadmap',
    desc: 'National policy accelerates CBG adoption with incentives for bio-energy entrepreneurs and sustainable fuel infrastructure.',
    url: 'https://www.jansatta.com/',
    tag: 'Energy Policy',
  },
];

/* ─── Source Logo Color Map ─── */
const sourceColors: Record<string, string> = {
  Jagran: '#e53935',
  'Aaj Tak': '#f44336',
  Hindustan: '#1565c0',
  'Navbharat Times': '#ff6f00',
  Jansatta: '#6d4c41',
  YouTube: '#ff0000',
};

export default function WhySbplSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [newsRef, newsInView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section className="section-padding section-divider relative overflow-hidden bg-[#020603]" ref={ref}>
      <div className="grid-container relative">
        {/* ─── Hero Header ─── */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <div className="section-label mx-auto">Why SBPL</div>
          <h2 className="section-title text-white">A clearer path to a stronger fuel business</h2>
          <p className="section-subtitle mx-auto">
            The business case is stronger when execution support, infrastructure planning, and long-term market demand all line up.
          </p>
        </div>

        {/* ─── Reason Cards ─── */}
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

        {/* ═══════════════════════════════════════════════════
           NEWS / MEDIA COVERAGE — "The World Is Shifting"
           ═══════════════════════════════════════════════════ */}
        <div ref={newsRef} className="news-section">
          {/* Decorative top border */}
          <div className="news-section__divider" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={newsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="news-header"
          >
            <div className="section-label mx-auto">In The Headlines</div>
            <h2 className="news-header__title">
              The World Is <span className="gradient-text-gold">Shifting</span> Toward Us
            </h2>
            <p className="news-header__subtitle">
              India's biggest newsrooms are reporting it. Governments are funding it. The biofuel &amp; CBG revolution isn't coming — <strong style={{ color: 'var(--green-300)' }}>it's already here.</strong>
            </p>
          </motion.div>

          {/* Articles grid */}
          <div className="news-grid">
            {newsArticles.map((article, i) => (
              <motion.a
                key={article.title}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                animate={newsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="news-card"
              >
                {/* Tag */}
                <div className="news-card__tag">{article.tag}</div>

                {/* Source */}
                <div className="news-card__source">
                  <span
                    className="news-card__source-dot"
                    style={{ background: sourceColors[article.source] || 'var(--green-500)' }}
                  />
                  {article.source}
                </div>

                {/* Title */}
                <h4 className="news-card__title">{article.title}</h4>

                {/* Description */}
                <p className="news-card__desc">{article.desc}</p>

                {/* Read link */}
                <span className="news-card__link">
                  {article.source === 'YouTube' ? 'Watch Now' : 'Read Article'}
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </motion.a>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={newsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="news-bottom-cta"
          >
            <div className="news-bottom-cta__inner glass-card glow-border">
              <div className="news-bottom-cta__icon">📰</div>
              <div>
                <h4 className="news-bottom-cta__title">Every Major Newsroom Is Covering This Shift</h4>
                <p className="news-bottom-cta__desc">
                  Jagran, Aaj Tak, Hindustan, Navbharat Times, Jansatta — when every credible publication reports the same trend, it's not speculation. <strong style={{ color: 'var(--green-300)' }}>It's opportunity.</strong>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Timeline: Next Steps ─── */}
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
                <div className="rounded-[20px] border border-green-500/30 bg-green-500/10 px-8 py-3.5 text-[14px] font-bold uppercase tracking-[0.18em] text-green-400">
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
