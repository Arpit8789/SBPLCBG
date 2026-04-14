import AboutSection from '@/components/AboutSection';
import TimelineSection from '@/components/TimelineSection';

export default function AboutPage() {
  return (
    <div className="page-shell">
      <div className="page-header">
        <div className="grid-container">
          <h1 className="mb-6 font-['Outfit'] text-5xl font-bold text-white glow-text md:text-6xl">About SBPL</h1>
          <p className="mx-auto max-w-3xl text-[18px] leading-[1.9] text-green-100/60 md:text-[20px]">
            Shivay BioIndhan Pvt Ltd is committed to revolutionizing India&apos;s energy landscape through sustainable and highly profitable multi-energy fuel stations.
          </p>
        </div>
      </div>
      <AboutSection />
      <TimelineSection />
    </div>
  );
}
