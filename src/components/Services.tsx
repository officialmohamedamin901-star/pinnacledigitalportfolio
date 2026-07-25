import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Search, Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { DynamicIcon } from './DynamicIcon';

export const Services: React.FC = () => {
  const { services, setIsProjectModalOpen, setSelectedServiceForModal } = useCms();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceForModal(serviceTitle);
    setIsProjectModalOpen(true);
  };

  // Staggered Reveal Animation Variants for Service Cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 45, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <section id="services" className="py-28 lg:py-36 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-blue-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>CAPABILITIES & ARCHITECTURE</span>
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white font-heading leading-none">
              Bespoke Digital <span className="text-gradient">Services</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-sm text-sm sm:text-base font-light leading-relaxed">
            From industry-specific corporate web flagships to custom AI automation engines, CRM dashboards, and e-commerce platforms.
          </p>
        </div>

        {/* Minimal Search & Filter Input */}
        <div className="max-w-md mb-14 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search capabilities (e.g. Real Estate, AI, E-commerce)..."
            className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/[0.03] text-sm text-white placeholder-zinc-500 border border-white/10 focus:border-blue-500 focus:outline-none transition-all"
          />
        </div>

        {/* Services Editorial List with Staggered Scroll Reveal */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredServices.map((service, index) => {
            const formattedIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/15 h-full overflow-hidden"
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-blue-300 bg-blue-500/20 border border-blue-500/30 flex items-center gap-1 z-10">
                    <Sparkles size={10} /> FEATURED
                  </div>
                )}

                <div>
                  {/* Service Number & Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <DynamicIcon name={service.iconName} size={24} />
                    </div>
                    <span className="text-sm font-mono text-zinc-500 font-bold">
                      /{formattedIndex}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold font-heading text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  {service.deliverables && service.deliverables.length > 0 && (
                    <div className="space-y-2 mb-8 pt-4 border-t border-white/5">
                      {service.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-zinc-400">
                          <CheckCircle2 size={14} className="text-blue-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Request CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  onClick={() => handleSelectService(service.title)}
                  className="w-full py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-blue-600 text-xs font-semibold text-zinc-200 hover:text-white border border-white/10 hover:border-blue-500 flex items-center justify-center gap-2 transition-all duration-300 mt-auto group/btn cursor-pointer min-h-[44px]"
                >
                  <span>Select Capability</span>
                  <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-white/[0.02] border border-white/10 rounded-3xl max-w-lg mx-auto">
            <p className="text-sm text-zinc-400">No capabilities matched "{searchQuery}".</p>
          </div>
        )}

      </div>
    </section>
  );
};
