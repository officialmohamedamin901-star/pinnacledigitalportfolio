import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        const diff = Math.floor(Math.random() * 18) + 12;
        return Math.min(prev + diff, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-white select-none overflow-hidden"
        >
          {/* Ambient Background Aura */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/30 via-purple-600/20 to-cyan-500/20 blur-[140px] rounded-full pointer-events-none"
          />

          {/* Central Logo Container */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-4">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-purple-600 shadow-2xl shadow-blue-500/30 border border-white/20"
            >
              <div className="w-10 h-10 rounded-full bg-[#050505] flex items-center justify-center border border-white/10">
                <div className="w-4 h-4 rounded-full bg-blue-500 animate-ping" />
              </div>
            </motion.div>

            {/* Brand Title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-extrabold tracking-tighter text-3xl font-heading text-gradient">
                AXON // AGENCY
              </h1>
              <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-semibold mt-1">
                ARTISTIC DIGITAL EXPERIENCES
              </p>
            </motion.div>

            {/* Loading Bar & Progress */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col items-center gap-2.5 w-60 sm:w-72 mt-2"
            >
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative p-0.5 border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-full shadow-lg shadow-blue-500/50"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between w-full text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
                <span>INITIALIZING ENGINE</span>
                <span className="text-blue-400 font-bold">{progress}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
