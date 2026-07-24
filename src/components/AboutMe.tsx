import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Code2, Cpu, Globe, Award, Briefcase, Terminal, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';
// @ts-ignore
import mateoPortrait from '../assets/images/mateo_sanchez_portrait_1784819046879.jpg';

export const AboutMe: React.FC = () => {
  const { profile, setIsAdminOpen, isAdminAuthenticated } = useCms();

  const careerMilestones = [
    { year: '2024–Present', role: 'Lead AI Web Designer', highlight: 'Pioneering AI-powered web systems & custom React frontends.' },
    { year: '2021–2024', role: 'Senior UX Architect', highlight: 'Designed digital flagships generating $12M+ in client revenue.' },
    { year: '2018–2021', role: 'Full-Stack Developer', highlight: 'Crafted high-speed web apps & custom headless platforms.' },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-blue-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>THE PERSON BEHIND THE CRAFT</span>
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white font-heading leading-none">
              Personal Story & <span className="text-gradient">Design Philosophy</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-sm text-sm sm:text-base font-light leading-relaxed">
            I build websites that aren't just pretty screens, but strategic digital tools engineered to grow businesses.
          </p>
        </div>

        {/* Asymmetrical Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Photo Showcase & Integrated Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              
              {/* Background Glow & Soft Ambient Lighting */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-blue-600/20 via-blue-500/10 to-transparent rounded-[40px] blur-3xl pointer-events-none" />

              {/* Luxury Bezel & Multi-Layer Outer Frame */}
              <div className="relative rounded-[32px] p-[3px] bg-gradient-to-b from-white/25 via-white/10 to-blue-500/20 border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden group">
                <div className="aspect-[4/5] rounded-[28px] overflow-hidden bg-zinc-950 relative shadow-inner">
                  <img
                    src={profile.profileImageUrl || mateoPortrait}
                    alt={profile.fullName || "Mateo Sanchez"}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  {/* Soft Vignette & Lighting Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 pointer-events-none" />
                  
                  {/* Fine Bevel Ring */}
                  <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/15 pointer-events-none" />

                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <span className="text-[10px] font-mono uppercase text-blue-400 tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 backdrop-blur-md">
                      CREATIVE MAESTRO
                    </span>
                    <h3 className="text-2xl font-bold text-white font-heading mt-2">
                      {profile.fullName || 'Mateo Sanchez'}
                    </h3>
                    <p className="text-xs text-zinc-300 font-light mt-1">
                      {profile.tagline || 'AI Web Designer • Website Developer • Digital Creator'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-2 px-5 py-3.5 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/15 shadow-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <Award size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{profile.awardsWon || 'Awwwards / FWA Winner'}</div>
                  <div className="text-[10px] text-zinc-400 font-mono">Bespoke Design Craft</div>
                </div>
              </div>

            </div>
          </div>

          {/* Story Narrative & Mindset */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading leading-tight mb-4 max-w-[28ch]">
                "Great web design is where art meets strategic architecture."
              </h3>
              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light mb-4 max-w-[58ch]">
                {profile.bio || 'I am an AI Web Designer, Website Developer, and Digital Creator with over 8 years of craft. I partner with ambitious founders, high-end brands, and industry leaders to design websites that captivate audiences and drive measurable business growth.'}
              </p>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light max-w-[58ch]">
                Every project I take on receives meticulous attention: from the initial user journey mapping to custom motion interactions, responsive typography, and lightning-fast full-stack code execution.
              </p>
            </div>

            {/* Skills & Masteries */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
                <Code2 size={14} />
                <span>CORE COMPETENCIES & STACK</span>
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {profile.skills && profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-200 bg-white/[0.03] border border-white/10 hover:border-blue-500/40 hover:text-white transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Vision & Design Philosophy */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2 flex items-center gap-2 font-semibold">
                <Sparkles size={14} />
                <span>VISION & CREATIVE MANIFESTO</span>
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                "Digital experiences should never feel disposable. I envision a web where technical speed, emotional resonance, and strategic conversion exist in perfect harmony—creating digital flagships that endure."
              </p>
            </div>

            {/* Career Timeline */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
                <Briefcase size={14} />
                <span>EXPERIENCE & MILESTONES</span>
              </h4>
              <div className="space-y-3">
                {careerMilestones.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="text-xs font-bold text-white font-heading">{item.role}</div>
                      <div className="text-xs text-zinc-400 font-light">{item.highlight}</div>
                    </div>
                    <div className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 shrink-0 self-start sm:self-auto">
                      {item.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin CMS Trigger */}
            {isAdminAuthenticated && (
              <div className="pt-2">
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="text-xs font-mono text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1.5"
                >
                  <span>Edit Profile Story, Vision & Details in CMS</span>
                  <ArrowUpRight size={12} />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
