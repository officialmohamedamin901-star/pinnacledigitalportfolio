import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Clock } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const Process: React.FC = () => {
  const { processSteps } = useCms();

  return (
    <section id="process" className="py-28 lg:py-40 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 border-b border-white/10 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-blue-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>SYSTEMATIC EXECUTION</span>
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white font-heading leading-none">
              The Work <span className="text-gradient">Process</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-sm text-sm sm:text-base font-light leading-relaxed">
            A structured, 7-stage roadmap from initial discovery to high-impact production launch and ongoing growth.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 -translate-x-1/2 w-px bg-white/10" />

          <div className="space-y-10">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Center Stage Step Badge */}
                  <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 w-12 h-12 rounded-2xl bg-zinc-900 border border-white/20 flex items-center justify-center text-blue-400 font-bold font-heading text-base z-20 shrink-0 shadow-2xl">
                    {step.number}
                  </div>

                  {/* Card Box */}
                  <div className="w-full lg:w-[calc(50%-3rem)]">
                    <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-blue-500/40 transition-all duration-300 relative group">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold font-heading text-white group-hover:text-blue-400 transition-colors">
                          {step.title}
                        </h3>
                        <span className="px-3 py-1 rounded-full text-xs font-mono text-blue-300 bg-blue-500/10 border border-blue-500/20 flex items-center gap-1.5">
                          <Clock size={12} /> {step.duration}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light mb-6">
                        {step.description}
                      </p>

                      {step.details && step.details.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 border-t border-white/5">
                          {step.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-2 text-xs text-zinc-400 font-light">
                              <CheckCircle size={13} className="text-blue-400 shrink-0" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
