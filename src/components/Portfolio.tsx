import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  Sparkles,
  Monitor,
  Plus,
  Edit2,
  ArrowUpRight,
  Layers,
  Compass
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { PORTFOLIO_CATEGORIES } from '../data/initialData';
import { PortfolioProject } from '../types';

interface ParallaxMediaProps {
  project: PortfolioProject;
  isFeatured: boolean;
  isSecondaryFirst: boolean;
  isSecondarySecond: boolean;
  projectNum: string;
}

const ParallaxShowcaseMedia: React.FC<ParallaxMediaProps> = ({
  project,
  isFeatured,
  isSecondaryFirst,
  isSecondarySecond,
  projectNum
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 22 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Layer 1: Background & Image shift (Moves slightly backward)
  const bgX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const bgY = useTransform(smoothY, [-1, 1], [-8, 8]);

  // Layer 2: Wireframe background grid
  const wireframeX = useTransform(smoothX, [-1, 1], [-14, 14]);
  const wireframeY = useTransform(smoothY, [-1, 1], [-14, 14]);

  // Layer 3: Foreground central elements (Moves forward)
  const fgX = useTransform(smoothX, [-1, 1], [16, -16]);
  const fgY = useTransform(smoothY, [-1, 1], [16, -16]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xVal = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const yVal = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full overflow-hidden bg-zinc-950 border-b lg:border-b-0 ${
        isFeatured
          ? 'lg:w-7/12 lg:border-r border-white/10 min-h-[380px] lg:min-h-[460px]'
          : isSecondaryFirst
          ? 'aspect-[16/10] min-h-[280px]'
          : isSecondarySecond
          ? 'aspect-[4/5] min-h-[320px]'
          : 'aspect-[16/10] min-h-[260px]'
      }`}
    >
      {/* Top Chrome Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-9 bg-black/85 backdrop-blur-md z-30 px-4 flex items-center justify-between border-b border-white/10 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
        </div>
        <div className="text-[10px] text-zinc-400 font-mono tracking-tight truncate max-w-[180px]">
          {project.title.toLowerCase().replace(/\s+/g, '')}.com
        </div>
        <div className="text-[9px] text-blue-400 font-mono uppercase tracking-wider font-semibold">
          {isFeatured ? '01 // MAIN SHOWCASE' : `${projectNum} // ${project.category}`}
        </div>
      </div>

      {/* Image or Placeholder Media Container */}
      {project.imageUrl ? (
        <div className="w-full h-full pt-9 overflow-hidden relative">
          <motion.img
            style={{ x: bgX, y: bgY }}
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover brightness-95 group-hover:brightness-105 transition-all duration-300 ease-out"
          />
          {/* High Quality Soft Lighting Vignette & Inset Shadow Frame */}
          <div className="absolute inset-0 pt-9 pointer-events-none shadow-[inset_0_0_35px_rgba(0,0,0,0.65)] ring-1 ring-inset ring-white/10" />
        </div>
      ) : (
        <div className="w-full h-full pt-9 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-blue-950/30 relative overflow-hidden">
          {/* Depth Layer 1: Editorial Wireframe Grid */}
          <motion.div
            style={{ x: wireframeX, y: wireframeY }}
            animate={{ scale: isHovered ? 1.04 : 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="absolute inset-0 opacity-15 group-hover:opacity-35 transition-opacity"
          >
            <div className="w-full h-full p-8 grid grid-cols-3 gap-4">
              <div className="h-20 rounded-xl bg-blue-500/20 border border-blue-400/20 col-span-2" />
              <div className="h-20 rounded-xl bg-white/10 border border-white/10" />
              <div className="h-32 rounded-xl bg-white/10 border border-white/10 col-span-3" />
            </div>
          </motion.div>

          {/* Depth Layer 2: Parallax Floating Foreground Element */}
          <motion.div
            style={{ x: fgX, y: fgY }}
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-blue-400 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] transition-all duration-300">
              <Monitor size={26} />
            </div>
            <span className="text-sm font-bold text-white tracking-wide mb-1 font-heading group-hover:text-blue-300 transition-colors">
              {project.title}
            </span>
            <span className="text-[10px] text-blue-400 font-mono bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 flex items-center gap-1.5 shadow-sm">
              <Sparkles size={10} /> PARALLAX ARCHITECTURE PREVIEW
            </span>
          </motion.div>
        </div>
      )}

      {/* Hover Overlay with Action Button */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-6 z-20 backdrop-blur-[2px] pointer-events-none">
        <div className="flex justify-end pt-8">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-blue-300 bg-blue-600/30 border border-blue-500/40 backdrop-blur-md">
            {project.category}
          </span>
        </div>

        <div className="flex items-center justify-between transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2">
            {project.tags && project.tags.slice(0, 2).map((tag, tIdx) => (
              <span key={tIdx} className="text-[10px] text-zinc-300 font-mono bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                {tag}
              </span>
            ))}
          </div>

          <div className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-blue-600/40 border border-blue-400/30 group/btn transition-all pointer-events-auto">
            <span>Inspect Project</span>
            <ArrowUpRight size={15} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Number Overlay Badge in bottom corner */}
      <div className="absolute bottom-4 left-4 z-10 group-hover:opacity-0 transition-opacity pointer-events-none">
        <span className="px-3 py-1.5 rounded-lg text-[11px] font-mono text-zinc-300 bg-black/80 backdrop-blur-md border border-white/10 flex items-center gap-2">
          <span className="text-blue-400 font-bold">{projectNum}</span>
          <span className="text-zinc-600">|</span>
          <span className="uppercase tracking-widest text-[10px]">{project.category}</span>
        </span>
      </div>
    </div>
  );
};

export const Portfolio: React.FC = () => {
  const {
    portfolioProjects,
    setSelectedProject,
    setIsAdminOpen,
    isAdminAuthenticated
  } = useCms();

  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categoriesWithAll = ['All', ...PORTFOLIO_CATEGORIES];

  const filteredProjects = portfolioProjects
    .filter((p) => p.status !== 'Draft' || isAdminAuthenticated)
    .filter((p) => activeCategory === 'All' || p.category.toLowerCase() === activeCategory.toLowerCase())
    .sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return (a.displayOrder ?? 99) - (b.displayOrder ?? 99);
    });

  return (
    <section id="portfolio" className="py-32 lg:py-48 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Magazine Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 border-b border-white/10 pb-10 gap-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-blue-400 uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>SELECTED ARCHIVES // 2024–2026</span>
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white font-heading leading-none">
              Curated <span className="text-gradient font-serif italic font-normal">Gallery</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-sm text-sm sm:text-base font-light leading-relaxed">
            A bespoke showcase of digital flagships, interactive architectures, and high-conversion web platforms built for visionaries.
          </p>
        </div>

        {/* Industry Category Filter Pills */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 mb-16 max-w-full relative">
          {categoriesWithAll.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 flex items-center gap-2 z-10 ${
                  isActive ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-blue-600 border border-blue-500/50 rounded-full shadow-lg shadow-blue-600/30 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {isActive && <Sparkles size={13} className="text-blue-200" />}
                <span>{category}</span>
              </button>
            );
          })}
        </div>

        {/* Curated Editorial Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isFeatured = index === 0;
              const isSecondaryFirst = index === 1;
              const isSecondarySecond = index === 2;

              // Asymmetrical Layout Spanning
              let colSpanClass = 'lg:col-span-6';
              if (isFeatured) {
                colSpanClass = 'lg:col-span-12';
              } else if (isSecondaryFirst) {
                colSpanClass = 'lg:col-span-7';
              } else if (isSecondarySecond) {
                colSpanClass = 'lg:col-span-5';
              } else {
                colSpanClass = index % 3 === 0 ? 'lg:col-span-7' : 'lg:col-span-5';
              }

              // Index Number Formatter
              const projectNum = (index + 1).toString().padStart(2, '0');

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: (index % 5) * 0.08 }}
                  className={`${colSpanClass} flex flex-col`}
                >
                  <div
                    onClick={() => setSelectedProject(project)}
                    className={`group relative flex-1 rounded-3xl bg-[#0a0a0c] border border-white/10 hover:border-blue-500/50 transition-all duration-500 overflow-hidden flex ${
                      isFeatured ? 'flex-col lg:flex-row' : 'flex-col'
                    } justify-between cursor-pointer hover:shadow-2xl hover:shadow-blue-600/10`}
                  >
                    {/* Parallax Visual Media Showcase Area */}
                    <ParallaxShowcaseMedia
                      project={project}
                      isFeatured={isFeatured}
                      isSecondaryFirst={isSecondaryFirst}
                      isSecondarySecond={isSecondarySecond}
                      projectNum={projectNum}
                    />

                    {/* Editorial Content Info Box */}
                    <div className={`p-8 sm:p-10 flex flex-col justify-between flex-1 ${isFeatured ? 'lg:w-5/12' : ''}`}>
                      <div>
                        {/* Meta header */}
                        <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-4">
                          <span className="uppercase tracking-wider font-medium text-zinc-300">{project.clientName || 'Private Client'}</span>
                          <span className="text-blue-400 font-semibold">{project.year || '2026'}</span>
                        </div>

                        {/* Title */}
                        <h3 className={`${isFeatured ? 'text-2xl sm:text-4xl' : 'text-xl sm:text-2xl'} font-black text-white font-heading mb-4 group-hover:text-blue-400 transition-colors flex items-center justify-between`}>
                          <span>{project.title}</span>
                          <ArrowUpRight size={22} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-blue-400 shrink-0" />
                        </h3>

                        {/* Description */}
                        <p className={`text-zinc-300 font-light leading-relaxed mb-8 ${isFeatured ? 'text-sm sm:text-base line-clamp-4' : 'text-xs sm:text-sm line-clamp-3'}`}>
                          {project.description}
                        </p>
                      </div>

                      {/* Tag List & CMS Edit CTA */}
                      <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto gap-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tags && project.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-md text-[10px] font-mono text-zinc-400 bg-white/[0.04] border border-white/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {isAdminAuthenticated && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsAdminOpen(true);
                            }}
                            className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:bg-blue-500/20 text-xs flex items-center gap-1"
                            title="Edit project in CMS"
                          >
                            <Edit2 size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State Notice */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-white/[0.02] border border-white/10 rounded-3xl max-w-lg mx-auto">
            <Layers size={44} className="mx-auto text-zinc-500 mb-4" />
            <p className="text-white font-bold text-lg mb-2 font-heading">No Projects Found</p>
            <p className="text-xs text-zinc-400 mb-6">There are no showcase projects currently under this industry filter.</p>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-2"
            >
              <Plus size={14} /> Add Project via CMS
            </button>
          </div>
        )}

        {/* Bottom CTA for Project Inquiry */}
        <div className="mt-20 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-blue-950/20 via-zinc-950 to-transparent p-8 rounded-3xl border border-white/5">
          <div>
            <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">HAVE A VISION IN MIND?</div>
            <p className="text-xl font-bold text-white font-heading">Let's craft your custom digital flagship.</p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center gap-2 shrink-0"
          >
            <span>Request Proposal</span>
            <Compass size={14} />
          </a>
        </div>

      </div>
    </section>
  );
};
