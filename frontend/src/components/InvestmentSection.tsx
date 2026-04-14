'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const investmentData = [
  { stage: 'Booking Confirmation', amount: 'INR 12 Lakh', value: 12, icon: 'Book' },
  { stage: 'Licensing and Approvals', amount: 'INR 8 Lakh', value: 8, icon: 'Legal' },
  { stage: 'Equipment Procurement', amount: 'INR 65 Lakh', value: 65, icon: 'Equip' },
  { stage: 'Civil and Electrical Works', amount: 'INR 55 Lakh', value: 55, icon: 'Build' },
  { stage: 'Final Commissioning', amount: 'INR 20 Lakh', value: 20, icon: 'Launch' },
];

export default function InvestmentSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const chartData = {
    labels: investmentData.map((item) => item.stage),
    datasets: [
      {
        label: 'Investment (in Lakhs INR)',
        data: investmentData.map((item) => item.value),
        backgroundColor: 'rgba(74, 222, 128, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: 'rgba(255, 255, 255, 0.75)' }
      },
      title: {
        display: true,
        text: 'Investment Breakdown',
        color: '#fff',
        font: { size: 18 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: 'rgba(255, 255, 255, 0.7)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        ticks: { color: 'rgba(255, 255, 255, 0.7)' },
        grid: { display: false }
      }
    }
  };

  return (
    <section className="section-padding section-divider relative overflow-hidden bg-black" ref={ref}>
      <div className="absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-900/10 blur-[200px]" />

      <div className="grid-container relative">
        <div className="mx-auto mb-14 max-w-4xl text-center md:mb-16">
          <div className="section-label mx-auto">Investment Plan</div>
          <h2 className="section-title px-4 text-white">Investment Plan and Execution Schedule</h2>
          <p className="section-subtitle mx-auto">
            The layout below breaks the project into clear stages so the financial journey feels easier to understand and less compressed on every screen size.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          className="premium-card mx-auto w-full max-w-6xl !p-0 overflow-hidden"
        >
          <div className="hidden border-b border-green-500/30 bg-gradient-to-r from-green-900/80 to-green-800/80 md:grid md:grid-cols-[96px_minmax(0,1.4fr)_minmax(240px,0.8fr)] md:gap-6 md:px-10 md:py-8 lg:px-12">
            <div className="text-[15px] font-bold uppercase tracking-[0.16em] text-white">Code</div>
            <div className="text-[18px] font-bold uppercase tracking-[0.16em] text-white">Project Stage</div>
            <div className="text-right text-[18px] font-bold uppercase tracking-[0.16em] text-white">Investment Amount</div>
          </div>

          <div className="divide-y divide-white/5">
            {investmentData.map((item, index) => (
              <div
                key={index}
                className="grid gap-4 px-6 py-6 transition-colors hover:bg-white/[0.02] md:grid-cols-[96px_minmax(0,1.4fr)_minmax(240px,0.8fr)] md:items-center md:gap-6 md:px-10 md:py-7 lg:px-12"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-green-500/15 text-[11px] font-bold uppercase tracking-[0.16em] text-green-300 md:h-16 md:w-16">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gray-500 md:hidden">Project Stage</div>
                  <span className="block text-[18px] font-medium leading-[1.6] text-gray-200 md:text-[20px]">{item.stage}</span>
                </div>
                <div className="space-y-1 md:text-right">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gray-500 md:hidden">Investment Amount</div>
                  <div className="font-['Outfit'] text-[20px] font-bold text-green-400 md:text-[24px]">
                    {item.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-green-500/20 bg-gradient-to-r from-green-900/40 to-green-800/40 p-6 text-center md:p-8">
            <h3 className="font-['Outfit'] text-[22px] font-bold tracking-[0.08em] text-white md:text-[28px]">
              TOTAL PROJECT INVESTMENT: <span className="text-green-400 font-black">INR 1.6 CRORE</span>
            </h3>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.2 }}
          className="premium-card mx-auto mt-20 max-w-6xl overflow-hidden md:mt-24"
        >
          <div className="h-[420px] w-full p-2 md:h-[460px] md:p-4">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-20 grid w-full max-w-6xl grid-cols-1 gap-8 md:mt-24 md:grid-cols-3 lg:gap-12"
        >
          <div className="premium-card w-full text-center">
            <div className="mb-5 text-[13px] font-bold uppercase tracking-[0.18em] text-green-300">Income</div>
            <h4 className="mb-3 text-[18px] font-bold text-white uppercase tracking-[0.08em]">Monthly Net Income</h4>
            <p className="font-['Outfit'] text-[28px] font-black text-green-400 lg:text-[32px]">INR 9 - 13 Lakh</p>
          </div>
          <div className="premium-card w-full text-center">
            <div className="mb-5 text-[13px] font-bold uppercase tracking-[0.18em] text-green-300">Returns</div>
            <h4 className="mb-3 text-[18px] font-bold text-white uppercase tracking-[0.08em]">Annual ROI</h4>
            <p className="font-['Outfit'] text-[28px] font-black text-green-400 lg:text-[32px]">50% - 65%</p>
          </div>
          <div className="premium-card w-full text-center">
            <div className="mb-5 text-[13px] font-bold uppercase tracking-[0.18em] text-green-300">Timeline</div>
            <h4 className="mb-3 text-[18px] font-bold text-white uppercase tracking-[0.08em]">Payback Period</h4>
            <p className="font-['Outfit'] text-[28px] font-black text-green-400 lg:text-[32px]">18 - 24 Months</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
