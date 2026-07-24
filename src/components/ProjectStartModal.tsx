import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const ProjectStartModal: React.FC = () => {
  const {
    isProjectModalOpen,
    setIsProjectModalOpen,
    selectedServiceForModal,
    services,
    addInquiry
  } = useCms();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    serviceNeeded: selectedServiceForModal || services[0]?.title || 'Business Websites',
    budgetRange: '$5,000 - $10,000',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isProjectModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      addInquiry(formData);
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const handleClose = () => {
    setIsProjectModalOpen(false);
    setSubmitted(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl glass-panel-glow rounded-3xl overflow-hidden border border-white/15 z-10 my-8 shadow-2xl max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                <Sparkles size={16} />
              </div>
              <h3 className="text-lg font-bold font-heading text-white">
                Start Your Web Project
              </h3>
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white glass-panel border border-white/10"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form / Success Body */}
          <div className="p-6 sm:p-8 overflow-y-auto">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/40">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-2xl font-bold font-heading text-white">
                  Project Request Submitted!
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you! Your project request has been logged into the agency management portal. I will analyze your requirements and follow up via email within 24 hours.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all"
                >
                  Close & Return To Website
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-2.5 rounded-xl glass-panel text-xs text-white placeholder-slate-500 border border-white/10 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-2.5 rounded-xl glass-panel text-xs text-white placeholder-slate-500 border border-white/10 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="Global Brands Co"
                    className="w-full px-4 py-2.5 rounded-xl glass-panel text-xs text-white placeholder-slate-500 border border-white/10 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Service Focus
                  </label>
                  <select
                    value={formData.serviceNeeded}
                    onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-panel text-xs text-white bg-slate-900 border border-white/10 focus:border-cyan-400 focus:outline-none"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Budget Expectation
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['< $5k', '$5k - $10k', '$10k - $25k', '$25k+'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData({ ...formData, budgetRange: opt })}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                          formData.budgetRange === opt
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60'
                            : 'glass-panel text-slate-400 border-white/5'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Brief Overview & Timeline *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your brand goals, target audience, key features..."
                    className="w-full px-4 py-2.5 rounded-xl glass-panel text-xs text-white placeholder-slate-500 border border-white/10 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-xs shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting Request...' : 'Send Project Proposal Request'}
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
