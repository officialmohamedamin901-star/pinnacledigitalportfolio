import React from 'react';
import { motion } from 'motion/react';
import { useCms } from '../context/CmsContext';
import { DynamicIcon } from './DynamicIcon';

export const WhyChooseMe: React.FC = () => {
  const { whyChooseItems } = useCms();

  return (
    <section id="why-us" className="py-20 lg:py-28 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-blue-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>THE CRAFT STANDARDS</span>
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white font-heading leading-none">
              Why Ambitious Brands <span className="text-gradient">Choose My Craft</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-sm text-sm sm:text-base font-light leading-relaxed">
            Uncompromising technical precision, bespoke aesthetics, and measurable conversion architecture built into every pixel.
          </p>
        </div>

        {/* Editorial Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseItems.map((item, index) => {
            const formattedIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/10 h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <DynamicIcon name={item.iconName} size={22} />
                    </div>
                    <span className="text-xs font-mono text-zinc-500 font-bold">
                      /{formattedIndex}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono uppercase text-blue-400/80">
                  <span>STANDARD FEATURE</span>
                  <span>{formattedIndex}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
