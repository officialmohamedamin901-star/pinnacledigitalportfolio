import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Dribbble,
  Globe,
  Compass
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const Contact: React.FC = () => {
  const { contactInfo, addInquiry, services } = useCms();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    serviceNeeded: services[0]?.title || 'Business Websites',
    budgetRange: '$5,000 - $10,000',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const budgetOptions = [
    '< $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      addInquiry(formData);
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        businessName: '',
        serviceNeeded: services[0]?.title || 'Business Websites',
        budgetRange: '$5,000 - $10,000',
        message: ''
      });
    }, 600);
  };

  return (
    <section id="contact" className="py-36 lg:py-48 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-blue-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>INITIATE COMMISSION</span>
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white font-heading leading-none">
              Let's Create <span className="text-gradient">Together</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-sm text-sm sm:text-base font-light leading-relaxed">
            Have a project vision or want to elevate your existing brand platform? Submit a brief below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Details & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 relative overflow-hidden space-y-6">
              
              <h3 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
                <Sparkles size={20} className="text-blue-400" />
                <span>Direct Contact</span>
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${contactInfo.email || 'pinnacledigital701@gmail.com'}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/40 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 font-mono uppercase">Direct Email</div>
                    <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {contactInfo.email || 'pinnacledigital701@gmail.com'}
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${(contactInfo.phone || '+254119731229').replace(/\s+/g, '')}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/40 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 font-mono uppercase">Direct Phone</div>
                    <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {contactInfo.phone || '+254 119 731 229'}
                    </div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${(contactInfo.whatsapp || '254119731229').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/40 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform shrink-0">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 font-mono uppercase">WhatsApp Direct</div>
                    <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {contactInfo.whatsapp || '+254 119 731 229'}
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="w-11 h-11 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center border border-blue-500/20 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 font-mono uppercase">Studio HQ</div>
                    <div className="text-sm font-semibold text-white">
                      {contactInfo.location || 'New York, USA // Remote Worldwide'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mb-3">
                  Digital Platforms
                </div>
                <div className="flex items-center gap-3">
                  <a href={contactInfo.twitterUrl} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-300 hover:text-blue-400 hover:border-blue-500/40 transition-all" aria-label="Twitter">
                    <Twitter size={18} />
                  </a>
                  <a href={contactInfo.linkedinUrl} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-300 hover:text-blue-400 hover:border-blue-500/40 transition-all" aria-label="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                  <a href={contactInfo.githubUrl} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-300 hover:text-blue-400 hover:border-blue-500/40 transition-all" aria-label="GitHub">
                    <Github size={18} />
                  </a>
                  <a href={contactInfo.instagramUrl} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-300 hover:text-blue-400 hover:border-blue-500/40 transition-all" aria-label="Instagram">
                    <Instagram size={18} />
                  </a>
                  <a href={contactInfo.dribbbleUrl} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-300 hover:text-blue-400 hover:border-blue-500/40 transition-all" aria-label="Dribbble">
                    <Dribbble size={18} />
                  </a>
                </div>
              </div>

            </div>

            {/* Artistic Low-Poly Stylized Global Coverage Map Visual */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
              <div className="flex items-center justify-between mb-4 z-10 relative">
                <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-blue-400 uppercase font-semibold">
                  <Globe size={14} className="animate-spin-slow" />
                  <span>Global Service Reach</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ACTIVE 28+ COUNTRIES
                </span>
              </div>

              {/* Low-Poly World Map SVG Visual with CSS Dark Theme Filters */}
              <div className="relative w-full aspect-[16/9] rounded-2xl bg-zinc-950/80 border border-white/10 overflow-hidden flex items-center justify-center p-2 shadow-inner">
                {/* Grid Background Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

                <svg viewBox="0 0 800 400" className="w-full h-full filter drop-shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                  <defs>
                    <linearGradient id="lowPolyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#2563eb" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.08" />
                    </linearGradient>
                    <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {/* Low-Poly Triangulated Continents Mesh */}
                  <g fill="url(#lowPolyGrad)" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.4" className="transition-all duration-700 group-hover:stroke-opacity-70">
                    {/* North America Mesh */}
                    <polygon points="120,80 180,70 240,110 210,160 150,150 110,120" />
                    <polygon points="180,70 260,80 280,130 240,110" />
                    <polygon points="240,110 280,130 230,190 190,170 210,160" />
                    <polygon points="150,150 210,160 190,170 140,170" />

                    {/* South America Mesh */}
                    <polygon points="260,220 300,240 280,310 240,330 230,260" />
                    <polygon points="300,240 330,270 280,310" />

                    {/* Europe & Middle East Mesh */}
                    <polygon points="420,90 470,80 500,120 460,140 410,120" />
                    <polygon points="470,80 520,90 540,130 500,120" />
                    <polygon points="460,140 500,120 520,170 470,180" />

                    {/* Africa Mesh */}
                    <polygon points="430,170 510,160 540,220 480,280 440,240" />
                    <polygon points="510,160 550,210 540,220" />

                    {/* Asia Mesh */}
                    <polygon points="540,90 620,80 680,120 630,160 560,140" />
                    <polygon points="620,80 710,90 730,150 680,120" />
                    <polygon points="560,140 630,160 610,210 550,180" />

                    {/* Australia Mesh */}
                    <polygon points="660,260 720,250 740,300 680,320 650,290" />
                  </g>

                  {/* Curved Arc Flight / Connection Network Lines from NYC HQ */}
                  {/* NYC HQ: (220, 130) */}
                  <path d="M 220 130 Q 330 70 450 110" fill="none" stroke="url(#arcGrad)" strokeWidth="1.5" strokeDasharray="4 3" />
                  <path d="M 220 130 Q 350 200 480 180" fill="none" stroke="url(#arcGrad)" strokeWidth="1.5" strokeDasharray="4 3" />
                  <path d="M 220 130 Q 420 50 640 110" fill="none" stroke="url(#arcGrad)" strokeWidth="1.5" strokeDasharray="4 3" />

                  {/* Pulsing Location Nodes */}
                  {/* NYC HQ (Primary Node) */}
                  <g transform="translate(220, 130)">
                    <circle r="9" fill="#3b82f6" fillOpacity="0.3" className="animate-ping" />
                    <circle r="5" fill="#38bdf8" />
                    <circle r="2" fill="#ffffff" />
                  </g>
                  {/* London Node */}
                  <g transform="translate(450, 110)">
                    <circle r="6" fill="#06b6d4" fillOpacity="0.3" className="animate-ping" />
                    <circle r="3.5" fill="#22d3ee" />
                  </g>
                  {/* Dubai Node */}
                  <g transform="translate(510, 160)">
                    <circle r="3.5" fill="#22d3ee" />
                  </g>
                  {/* Tokyo Node */}
                  <g transform="translate(670, 120)">
                    <circle r="6" fill="#06b6d4" fillOpacity="0.3" className="animate-ping" />
                    <circle r="3.5" fill="#38bdf8" />
                  </g>
                  {/* Sydney Node */}
                  <g transform="translate(700, 280)">
                    <circle r="3.5" fill="#22d3ee" />
                  </g>
                </svg>

                {/* HQ Badge Overlay */}
                <div className="absolute bottom-2 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-zinc-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>NYC HQ // Global Digital Architect</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Craft Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 relative">
              <h3 className="text-2xl font-bold font-heading text-white mb-6">
                Submit A Direct Project Inquiry
              </h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-blue-600/10 border border-blue-500/30 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/40">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-xl font-bold text-white font-heading">Inquiry Received</h4>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed font-light">
                    Thank you. Your project brief has been recorded. I review all inquiries personally and will respond via email within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-all"
                  >
                    Submit Another Brief
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sarah Jenkins"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] text-sm text-white placeholder-zinc-500 border border-white/10 focus:border-blue-500 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@brand.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] text-sm text-white placeholder-zinc-500 border border-white/10 focus:border-blue-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="Nexus Ventures"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] text-sm text-white placeholder-zinc-500 border border-white/10 focus:border-blue-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                      Selected Capability
                    </label>
                    <select
                      value={formData.serviceNeeded}
                      onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 text-sm text-white border border-white/10 focus:border-blue-500 focus:outline-none transition-all"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                      Estimated Budget Range
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetOptions.map((opt) => (
                        <motion.button
                          key={opt}
                          type="button"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          onClick={() => setFormData({ ...formData, budgetRange: opt })}
                          className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            formData.budgetRange === opt
                              ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/25'
                              : 'bg-white/[0.03] text-zinc-400 border-white/5 hover:text-white'
                          }`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                      Project Vision & Scope Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your goals, target audience, timeline, and design inspirations..."
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] text-sm text-white placeholder-zinc-500 border border-white/10 focus:border-blue-500 focus:outline-none transition-all"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <span>Recording Brief...</span>
                    ) : (
                      <>
                        <span>Send Project Brief</span>
                        <Send size={16} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
