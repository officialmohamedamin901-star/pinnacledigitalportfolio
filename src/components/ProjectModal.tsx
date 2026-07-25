import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Monitor, Tag, Calendar, User, Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const ProjectModal: React.FC = () => {
  const { selectedProject, setSelectedProject, setIsProjectModalOpen, setSelectedServiceForModal } = useCms();

  if (!selectedProject) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl glass-panel-glow rounded-3xl overflow-hidden border border-white/15 z-10 my-8 shadow-2xl max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20">
                {selectedProject.category}
              </span>
              <h3 className="text-xl font-bold font-heading text-white">
                {selectedProject.title}
              </h3>
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              className="p-2 rounded-xl text-slate-400 hover:text-white glass-panel border border-white/10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Screenshot Area / Luxury Mock Frame */}
            <div className="relative aspect-video rounded-2xl bg-zinc-950 overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
              {selectedProject.imageUrl ? (
                <>
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_25px_rgba(0,0,0,0.5)]" />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950">
                  <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4">
                    <Monitor size={40} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Large Screenshot Area (Website Placeholder)
                  </h4>
                  <p className="text-xs text-slate-400 max-w-md">
                    Replace this placeholder with your high-resolution live website mockup via the Admin CMS Editor.
                  </p>
                </div>
              )}
            </div>

            {/* Project Overview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center gap-3">
                <User size={18} className="text-cyan-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Client Name</div>
                  <div className="text-xs font-semibold text-white">{selectedProject.clientName || 'Client Placeholder'}</div>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center gap-3">
                <Calendar size={18} className="text-purple-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Completion Year</div>
                  <div className="text-xs font-semibold text-white">{selectedProject.year || '2026'}</div>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center gap-3">
                <Tag size={18} className="text-blue-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Industry</div>
                  <div className="text-xs font-semibold text-white">{selectedProject.category}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                Project Scope & Results
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Tech Stack Tags */}
            {selectedProject.tags && selectedProject.tags.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono mb-3">
                  Technologies & Architecture
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-medium text-slate-200 glass-panel border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-6 border-t border-white/10 bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            {selectedProject.liveUrl ? (
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>Visit Live Site</span>
                <ExternalLink size={14} />
              </a>
            ) : (
              <span className="text-xs text-slate-400 font-mono text-center sm:text-left">
                [Live URL Placeholder]
              </span>
            )}

            <button
              onClick={() => {
                setSelectedProject(null);
                setSelectedServiceForModal(selectedProject.category);
                setIsProjectModalOpen(true);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg min-h-[44px]"
            >
              <span>Build Similar Website For My Business</span>
              <Sparkles size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
