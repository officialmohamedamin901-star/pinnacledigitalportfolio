import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Compass, ArrowDown, Sparkles } from 'lucide-react';
import { HeroCanvas } from './HeroCanvas';
import { useCms } from '../context/CmsContext';
// @ts-ignore
import mateoPortrait from '../assets/images/mateo_sanchez_portrait_1784819046879.jpg';

export const Hero: React.FC = () => {
  const { profile, setIsProjectModalOpen } = useCms();

  const professionRoles = [
    'AI Web Designer',
    'Website Developer',
    'Digital Creator',
  ];

  // Motion variants for magazine entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section 
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#050505]"
    >
      {/* Subtle Background Interactive Canvas */}
      <HeroCanvas />

      {/* Soft Ambient Lighting Accent - Pure Electric Blue */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-blue-600/[0.07] rounded-full blur-[180px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full my-auto">
        {/* Asymmetrical Split-Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT SIDE: Portrait Image with Elegant Framing & Natural Proportions */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md group"
            >
              {/* Outer Magazine Frame Border */}
              <div className="relative rounded-2xl p-2.5 bg-zinc-900/90 border border-white/10 shadow-2xl transition-all duration-700 hover:border-blue-500/40">
                {/* Photo Container - Maintains original aspect ratio & full head/shoulders */}
                <div className="w-full aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden relative bg-zinc-950">
                  <img
                    src={profile.profileImageUrl || mateoPortrait}
                    alt={profile.fullName || "Mateo Sanchez"}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-102"
                  />

                  {/* Vignette Lighting overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />

                  {/* Magazine Cover Corner Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white tracking-wider uppercase font-heading">
                        {profile.fullName || 'Mateo Sanchez'}
                      </div>
                      <div className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
                        CREATIVE DIRECTOR & ARCHITECT
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20 uppercase tracking-widest">
                      EST. 2018
                    </span>
                  </div>
                </div>
              </div>

              {/* Minimal Decorative Corner Lines */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-blue-500/60 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-blue-500/60 pointer-events-none" />
            </motion.div>
          </div>

          {/* RIGHT SIDE: Magazine Cover Oversized Typography & Story */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Live Commission Availability Status */}
            <motion.div variants={itemVariants} className="mb-6 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-medium">
                AVAILABLE FOR Q3/Q4 COMMISSIONS
              </span>
            </motion.div>

            {/* Oversized Headline */}
            <motion.div variants={itemVariants} className="space-y-2 mb-6">
              <div className="text-xs sm:text-sm font-mono tracking-widest text-blue-400 uppercase font-semibold flex items-center gap-2">
                <span className="w-6 h-px bg-blue-500" />
                <span>{profile.fullName || 'MATEO SANCHEZ'}</span>
              </div>

              {/* Roles baseline */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-zinc-400 pt-1">
                {professionRoles.map((role, idx) => (
                  <React.Fragment key={idx}>
                    <span className="text-zinc-200 font-medium">{role}</span>
                    {idx < professionRoles.length - 1 && <span className="text-blue-500/60">•</span>}
                  </React.Fragment>
                ))}
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-[6.25rem] font-black tracking-tighter text-white leading-[0.9] font-heading pt-2">
                CRAFTING <br />
                <span className="text-gradient font-serif italic font-normal">DIGITAL</span> FLAGSHIPS.
              </h1>
            </motion.div>

            {/* Narrative Story (Instead of generic paragraph) */}
            <motion.div variants={itemVariants} className="space-y-5 mb-8 max-w-xl">
              <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-[55ch]">
                I bridge human-centered design with high-performance web architecture. Instead of generic corporate templates, I build bespoke platforms engineered to elevate brand authority and convert visitors into loyal clients.
              </p>

              {/* Memorable Personal Sentence */}
              <div className="border-l-2 border-blue-500 pl-4 py-1.5">
                <p className="text-sm sm:text-base text-zinc-200 font-serif italic font-normal leading-relaxed max-w-[50ch]">
                  "Design is not just how it looks—it is the single highest-leverage asset for ambitious founders."
                </p>
              </div>
            </motion.div>

            {/* Minimal Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-5 w-full sm:w-auto mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                onClick={() => setIsProjectModalOpen(true)}
                className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/25 transition-all duration-300 flex items-center justify-center gap-2.5 group border border-blue-400/30 cursor-pointer"
              >
                <span>Initiate Project Brief</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                href="#portfolio"
                className="px-6 py-4 rounded-xl text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-2 group"
              >
                <span>Explore Selected Works</span>
                <Compass size={16} className="text-zinc-500 group-hover:text-blue-400 transition-colors" />
              </motion.a>
            </motion.div>

            {/* Clean Keyframe Metrics */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-8 pt-6 border-t border-white/10 w-full max-w-xl"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-black font-heading text-white">8+ Yrs</div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1">Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-heading text-blue-400">140+</div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1">Commissions</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-heading text-white">100%</div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-1">Custom Craft</div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>

      {/* Smooth Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-20 flex flex-col items-center justify-center pt-8"
      >
        <a
          href="#services"
          className="group flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 hover:text-blue-400 transition-colors"
        >
          <span>SCROLL TO DISCOVER</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1 group-hover:border-blue-400/50"
          >
            <div className="w-1 h-2 rounded-full bg-blue-500" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};
