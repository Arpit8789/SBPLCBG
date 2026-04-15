import GallerySection from '@/components/GallerySection';

export default function GalleryPage() {
  return (
    <div className="page-shell">
      <div className="page-header">
        <div className="grid-container">
          <h1 className="mb-6 font-['Outfit'] text-5xl font-bold text-white glow-text md:text-6xl">Media &amp; Gallery</h1>
          <p className="mx-auto max-w-3xl text-[18px] leading-[1.9] text-green-100/60 md:text-[20px]">
            Explore our infrastructure, news coverage, and on-ground progress across India.
          </p>
        </div>
      </div>
      <GallerySection />
    </div>
  );
}
