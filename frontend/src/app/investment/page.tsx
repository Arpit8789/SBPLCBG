import InvestmentSection from '@/components/InvestmentSection';

export default function InvestmentPage() {
  return (
    <div className="page-shell">
      <div className="page-header">
        <div className="grid-container">
          <h1 className="mb-6 font-['Outfit'] text-5xl font-bold text-white glow-text md:text-6xl">Investment &amp; ROI</h1>
          <p className="mx-auto max-w-3xl text-[18px] leading-[1.9] text-green-100/60 md:text-[20px]">
            Detailed breakdown of setup costs, profit margins, and return on investment for your multi-energy station.
          </p>
        </div>
      </div>
      <InvestmentSection />
    </div>
  );
}
