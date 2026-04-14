'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Energy ring */}
            <div className="relative">
              <div className="energy-ring" />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(34,197,94,0.3) 0%, transparent 70%)',
                }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Brand */}
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-wider" style={{ fontFamily: 'Outfit' }}>
                <span className="gradient-text">SBPL</span>
              </h1>
              <p className="text-xs text-green-500/60 tracking-[0.3em] uppercase mt-2">
                Shivay BioIndhan
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-[2px] bg-green-900/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #22c55e, #4ade80)',
                  width: `${Math.min(progress, 100)}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <p className="text-[10px] text-green-600/40 tracking-[0.2em] uppercase">
              Powering the Future
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
