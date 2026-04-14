'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function GalleryPage() {
  // Use the images we copied into the public folder
  const images = [
    '/gallery/gallery-1.jpeg',
    '/gallery/gallery-2.jpeg',
    '/gallery/gallery-3.jpeg',
    '/gallery/gallery-4.jpeg',
    '/gallery/gallery-5.jpeg',
    '/gallery/gallery-6.jpeg',
  ];

  return (
    <div className="page-shell">
      <div className="page-header">
        <div className="grid-container">
          <h1 className="mb-6 font-['Outfit'] text-5xl font-bold text-white glow-text md:text-6xl">Infrastructure Gallery</h1>
          <p className="mx-auto max-w-3xl text-[18px] leading-[1.9] text-green-100/60 md:text-[20px]">
            Explore our state-of-the-art facilities and fuel stations.
          </p>
        </div>
      </div>
      
      <div className="grid-container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
          {images.map((src, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card group relative aspect-[1.15] overflow-hidden rounded-[28px] cursor-pointer md:aspect-video"
            >
              <Image 
                src={src} 
                alt={`SBPL Facility ${idx + 1}`} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
