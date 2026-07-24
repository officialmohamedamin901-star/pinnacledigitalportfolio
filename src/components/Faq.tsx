import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Search, Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const Faq: React.FC = () => {
  const { faqs } = useCms();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-32 relative z-10 bg-[#050505]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 uppercase tracking-widest inline-block mb-4">
            Got Questions?
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading text-white tracking-tighter leading-none">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-base sm:text-lg font-light max-w-lg mx-auto">
            Everything you need to know about initiating a project commission.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.03] text-sm text-white placeholder-zinc-500 border border-white/10 focus:border-blue-500 focus:outline-none transition-all shadow-lg"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="rounded-2xl bg-white/[0.02] overflow-hidden border border-white/10 transition-all duration-300 hover:border-blue-500/30"
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={20} className="text-blue-400 shrink-0" />
                    <span className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-blue-300 transition-colors">
                      {item.question}
                    </span>
                  </div>
                  <div className={`p-2 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-300 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-500/20 text-blue-400' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 pt-0 border-t border-white/5 text-xs sm:text-sm text-zinc-300 leading-relaxed font-light"
                    >
                      <div className="pt-4">{item.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
