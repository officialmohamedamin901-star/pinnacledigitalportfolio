import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, User, Edit2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const Testimonials: React.FC = () => {
  const { testimonials, setIsAdminOpen, isAdminAuthenticated } = useCms();

  return (
    <section className="py-32 lg:py-44 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-blue-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>CLIENT TESTIMONIALS</span>
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white font-heading leading-none">
              Words From <span className="text-gradient">Visionary Clients</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-sm text-sm sm:text-base font-light leading-relaxed">
            Real feedback from founders, agency directors, and business owners who elevated their digital presence.
          </p>
        </div>

        {/* Editorial Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/10 h-full"
            >
              <div>
                {/* Header Quote Icon & Rating */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Quote size={20} />
                  </div>
                  <div className="flex gap-1">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Quote Content */}
                <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-light mb-8 italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Client Profile Footer */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/20 shadow-md flex items-center justify-center text-zinc-300 font-bold overflow-hidden ring-2 ring-blue-500/20 shrink-0">
                    {item.avatarUrl ? (
                      <img src={item.avatarUrl} alt={item.clientName} className="w-full h-full object-cover" />
                    ) : (
                      <User size={18} className="text-blue-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                      {item.clientName}
                    </h4>
                    <p className="text-xs text-zinc-400 font-light">
                      {item.roleCompany}
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-blue-300 bg-blue-500/10 border border-blue-500/20">
                  {item.projectType}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CMS Edit Trigger */}
        {isAdminAuthenticated && (
          <div className="text-center mt-12">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-xs text-zinc-400 hover:text-white underline font-mono inline-flex items-center gap-1.5"
            >
              <Edit2 size={12} /> Edit testimonials in CMS Admin
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
