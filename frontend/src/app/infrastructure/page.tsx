import InfrastructureSection from '@/components/InfrastructureSection';

export default function InfrastructurePage() {
  return (
    <div className="page-shell">
      <div className="page-header">
        <div className="grid-container">
          <h1 className="mb-6 font-['Outfit'] text-5xl font-bold text-white glow-text md:text-6xl">Our Infrastructure</h1>
          <p className="mx-auto max-w-3xl text-[18px] leading-[1.9] text-green-100/60 md:text-[20px]">
            State-of-the-art multi-energy stations designed for maximum efficiency, safety, and profitability.
          </p>
        </div>
      </div>
      <InfrastructureSection />
    </div>
  );
}
