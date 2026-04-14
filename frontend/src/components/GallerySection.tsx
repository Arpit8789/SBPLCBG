'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import Image from 'next/image';

const galleryImages = [
  { src: '/gallery/gallery-1.jpeg', alt: 'SBPL Premium Fuel Station by Shivay BioIndhan', title: 'SBPL Premium Station', category: 'station' },
  { src: '/gallery/gallery-2.jpeg', alt: 'Shivay BioIndhan Night View Fuel Station', title: 'Night View Station', category: 'station' },
  { src: '/gallery/gallery-3.jpeg', alt: 'SBPL Investment Returns Dashboard', title: 'Investment Returns', category: 'data' },
  { src: '/gallery/gallery-4.jpeg', alt: 'Shivay BioIndhan CNG Production Plant', title: 'CNG Plant Infrastructure', category: 'plant' },
  { src: '/gallery/gallery-5.jpeg', alt: 'SBPL Multi-Energy Station with EV Charging', title: 'Revenue Dashboard', category: 'data' },
  { src: '/gallery/gallery-6.jpeg', alt: 'Shivay BioIndhan Pan-India Expansion Map', title: 'Pan-India Expansion', category: 'map' }
];

export default function GallerySection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-padding section-divider relative overflow-hidden" ref={ref}>
      <div className="grid-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="section-label mx-auto">Visual Gallery</div>
          <h2 className="section-title">
            See the <span className="gradient-text">SBPL</span> Vision
          </h2>
          <p className="section-subtitle mx-auto">
            Explore Shivay BioIndhan&apos;s world-class fuel station designs, infrastructure, and the future of multi-energy mobility.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setSelectedImage(i)}
              className={`glass-card group relative cursor-pointer overflow-hidden rounded-[28px] ${
                i === 0 || i === 3 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="relative h-56 overflow-hidden md:h-72">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h4 className="text-white font-semibold text-sm">{image.title}</h4>
                  <p className="text-green-400/60 text-xs mt-1">Click to expand</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 cursor-pointer"
        >
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={galleryImages[selectedImage].src}
            alt={galleryImages[selectedImage].alt}
            className="max-w-full max-h-[85vh] rounded-2xl object-contain"
          />
          <button className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl">✕</button>
          <div className="absolute bottom-8 text-center">
            <h4 className="text-white font-semibold">{galleryImages[selectedImage].title}</h4>
            <p className="text-green-400/40 text-sm mt-1">Shivay BioIndhan Pvt Ltd</p>
          </div>
        </motion.div>
      )}
    </section>
  );
}
