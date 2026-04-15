'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

/* ─── Gallery media items ─── */
type MediaItem = {
  type: 'image' | 'video' | 'news';
  src: string;
  poster?: string;
  alt: string;
  title: string;
  category: string;
  span?: string; // Tailwind col-span
};

const galleryMedia: MediaItem[] = [
  // Existing images
  { type: 'image', src: '/gallery/gallery-1.jpeg', alt: 'SBPL Premium Fuel Station', title: 'SBPL Premium Station', category: 'Station', span: 'md:col-span-2 lg:col-span-2' },
  { type: 'image', src: '/gallery/gallery-2.jpeg', alt: 'Shivay BioIndhan Night View', title: 'Night View Station', category: 'Station' },
  { type: 'image', src: '/gallery/gallery-3.jpeg', alt: 'SBPL Investment Returns', title: 'Investment Returns', category: 'Data' },
  { type: 'image', src: '/gallery/gallery-4.jpeg', alt: 'CBG CNG Production Plant', title: 'CBG (CNG) Plant', category: 'Plant', span: 'md:col-span-2 lg:col-span-2' },
  { type: 'image', src: '/gallery/gallery-5.jpeg', alt: 'Multi-Energy Station with EV', title: 'Revenue Dashboard', category: 'Data' },
  { type: 'image', src: '/gallery/gallery-6.jpeg', alt: 'Pan-India Expansion Map', title: 'Pan-India Expansion', category: 'Map' },

  // News articles (images)
  { type: 'news', src: '/gallery/news-1.jpeg', alt: 'Dainik Bhaskar: ₹160 Crore CBG-CNG Plant — Shivay BioIndhan', title: '₹160 Cr CBG-CNG Plant — Dainik Bhaskar', category: 'News', span: 'md:col-span-2 lg:col-span-2' },
  { type: 'news', src: '/gallery/news-2.jpeg', alt: 'Jagran: Sustainable Aviation Fuel from Cooking Oil', title: 'Aviation Fuel from Cooking Oil — Jagran', category: 'News' },

  // Videos
  { type: 'video', src: '/gallery/video-4.mp4', alt: 'SBPL Site Progress', title: 'SBPL Site Progress', category: 'Video' },
  { type: 'video', src: '/gallery/video-5.mp4', alt: 'CBG Plant Construction', title: 'CBG Plant Construction', category: 'Video', span: 'md:col-span-2 lg:col-span-2' },
  { type: 'video', src: '/gallery/video-6.mp4', alt: 'Infrastructure Development', title: 'Infrastructure Development', category: 'Video' },
  { type: 'video', src: '/gallery/video-1.mp4', alt: 'SBPL Operations Overview', title: 'SBPL Operations', category: 'Video' },
  { type: 'video', src: '/gallery/video-7.mp4', alt: 'Multi-Energy Station Walkthrough', title: 'Station Walkthrough', category: 'Video', span: 'md:col-span-2 lg:col-span-2' },
  { type: 'video', src: '/gallery/video-2.mp4', alt: 'Complete CBG Plant Tour', title: 'Full CBG Plant Tour', category: 'Video' },
  { type: 'video', src: '/gallery/video-3.mp4', alt: 'SBPL Company Showcase', title: 'Company Showcase', category: 'Video' },
];

const categories = ['All', 'Station', 'Data', 'Plant', 'Map', 'News', 'Video'];

export default function GallerySection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredMedia = activeFilter === 'All'
    ? galleryMedia
    : galleryMedia.filter((m) => m.category === activeFilter);

  const closeLightbox = useCallback(() => setSelectedItem(null), []);

  return (
    <section id="gallery" className="gallery-section" ref={ref}>
      <div className="grid-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <div className="section-label mx-auto">Visual Gallery</div>
          <h2 className="section-title">
            See the <span className="gradient-text">SBPL</span> Vision
          </h2>
          <p className="section-subtitle mx-auto">
            Explore Shivay BioIndhan&apos;s infrastructure, media coverage, and on-ground progress across India.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="gallery-filters"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`gallery-filter-btn ${activeFilter === cat ? 'gallery-filter-btn--active' : ''}`}
            >
              {cat}
              {activeFilter === cat && (
                <span className="gallery-filter-count">
                  {cat === 'All' ? galleryMedia.length : galleryMedia.filter((m) => m.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredMedia.map((item, i) => {
            const globalIndex = galleryMedia.indexOf(item);
            return (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                onClick={() => setSelectedItem(globalIndex)}
                className={`gallery-card group ${item.span || ''}`}
              >
                {item.type === 'video' ? (
                  <VideoCard item={item} />
                ) : (
                  <div className="gallery-card__img-wrap">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="gallery-card__image"
                    />
                  </div>
                )}

                {/* Category badge */}
                <div className={`gallery-card__badge ${item.type === 'news' ? 'gallery-card__badge--news' : ''} ${item.type === 'video' ? 'gallery-card__badge--video' : ''}`}>
                  {item.type === 'video' && (
                    <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  )}
                  {item.type === 'news' && (
                    <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" /></svg>
                  )}
                  {item.category}
                </div>

                {/* Hover overlay */}
                <div className="gallery-card__overlay">
                  <h4 className="gallery-card__title">{item.title}</h4>
                  <p className="gallery-card__action">
                    {item.type === 'video' ? '▶ Play Video' : 'Click to expand'}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {selectedItem !== null && (
        <Lightbox
          item={galleryMedia[selectedItem]}
          onClose={closeLightbox}
          onPrev={() => setSelectedItem((prev) => (prev! > 0 ? prev! - 1 : galleryMedia.length - 1))}
          onNext={() => setSelectedItem((prev) => (prev! < galleryMedia.length - 1 ? prev! + 1 : 0))}
        />
      )}
    </section>
  );
}

/* ─── Video Card (inline player on hover) ─── */
function VideoCard({ item }: { item: MediaItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="gallery-card__video-wrap">
      <video
        ref={videoRef}
        src={item.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="gallery-card__video"
        onMouseEnter={() => videoRef.current?.play()}
        onMouseLeave={() => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }}
      />
      {/* Play icon overlay */}
      <div className="gallery-card__play-icon group-hover:opacity-0">
        <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Lightbox ─── */
function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: MediaItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="gallery-lightbox"
      onClick={onClose}
    >
      {/* Close */}
      <button className="gallery-lightbox__close" onClick={onClose}>✕</button>

      {/* Prev / Next */}
      <button
        className="gallery-lightbox__nav gallery-lightbox__nav--prev"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        ‹
      </button>
      <button
        className="gallery-lightbox__nav gallery-lightbox__nav--next"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        ›
      </button>

      {/* Content */}
      <div className="gallery-lightbox__content" onClick={(e) => e.stopPropagation()}>
        {item.type === 'video' ? (
          <video
            src={item.src}
            controls
            autoPlay
            playsInline
            className="gallery-lightbox__video"
          />
        ) : (
          <motion.img
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            src={item.src}
            alt={item.alt}
            className="gallery-lightbox__image"
          />
        )}
      </div>

      {/* Caption */}
      <div className="gallery-lightbox__caption">
        <span className="gallery-lightbox__badge">{item.category}</span>
        <h4>{item.title}</h4>
        <p>Shivay BioIndhan Pvt Ltd</p>
      </div>
    </motion.div>
  );
}
