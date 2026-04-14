import WhySBPLSection from '@/components/WhySBPLSection';

export default function WhySBPLPage() {
  return (
    <div className="page-shell">
      <div className="page-header">
        <div className="grid-container">
          <h1 className="mb-6 font-['Outfit'] text-5xl font-bold text-white glow-text md:text-6xl">Why Choose Us?</h1>
          <p className="mx-auto max-w-3xl text-[18px] leading-[1.9] text-green-100/60 md:text-[20px]">
            Unmatched ROI, complete legal support, and a future-proof multi-energy model.
          </p>
        </div>
      </div>
      <WhySBPLSection />
    </div>
  );
}
