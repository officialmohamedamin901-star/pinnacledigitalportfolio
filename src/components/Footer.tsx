import React from 'react';
import { ArrowUp, Shield } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const Footer: React.FC = () => {
  const { profile, contactInfo, setIsAdminOpen, isAdminAuthenticated } = useCms();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#050505] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Logo & Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold font-heading text-base flex items-center justify-center">
                {profile.fullName ? profile.fullName.charAt(0) : 'M'}
              </div>
              <span className="font-heading font-extrabold text-xl text-white">
                {profile.fullName || 'Mateo Sanchez'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm font-light">
              {profile.bio || 'AI Web Designer, Website Developer, and Digital Creator crafting bespoke digital platforms worldwide.'}
            </p>

            {isAdminAuthenticated && (
              <div className="pt-2">
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="text-xs text-blue-400 hover:text-blue-300 font-mono flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20"
                >
                  <Shield size={12} />
                  <span>Admin CMS Editor</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-light">
              <li><a href="#portfolio" className="hover:text-blue-400 transition-colors">Portfolio Showcase</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About & Story</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Capabilities</a></li>
              <li><a href="#process" className="hover:text-blue-400 transition-colors">Work Process</a></li>
              <li><a href="#why-us" className="hover:text-blue-400 transition-colors">Why Choose Us</a></li>
              <li><a href="#faq" className="hover:text-blue-400 transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Industry Focus */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
              Industries
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-light">
              <li><a href="#portfolio" className="hover:text-blue-400 transition-colors">Real Estate & Property</a></li>
              <li><a href="#portfolio" className="hover:text-blue-400 transition-colors">Restaurants & Dining</a></li>
              <li><a href="#portfolio" className="hover:text-blue-400 transition-colors">Landscaping & Outdoor</a></li>
              <li><a href="#portfolio" className="hover:text-blue-400 transition-colors">Medical & Wellness</a></li>
              <li><a href="#portfolio" className="hover:text-blue-400 transition-colors">Construction & Contracting</a></li>
              <li><a href="#portfolio" className="hover:text-blue-400 transition-colors">E-Commerce Platforms</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-light">
              <li><a href={contactInfo.twitterUrl} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">X / Twitter</a></li>
              <li><a href={contactInfo.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">LinkedIn</a></li>
              <li><a href={contactInfo.githubUrl} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">GitHub</a></li>
              <li><a href={contactInfo.dribbbleUrl} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">Dribbble</a></li>
              <li><a href={`mailto:${contactInfo.email}`} className="hover:text-blue-400 transition-colors">Direct Email</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div>
            © {new Date().getFullYear()} {profile.fullName || 'Mateo Sanchez'}. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-300 hover:text-white hover:border-blue-500/40 transition-all flex items-center gap-1.5"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
