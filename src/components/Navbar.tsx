import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Sun, Moon, Shield, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const Navbar: React.FC = () => {
  const {
    profile,
    theme,
    toggleTheme,
    setIsAdminOpen,
    setIsProjectModalOpen
  } = useCms();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Vibrant Electric Blue Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 origin-left shadow-[0_0_10px_rgba(59,130,246,0.8)] z-50 pointer-events-none"
        style={{ scaleX }}
      />

      <div className={`transition-all duration-300 ${isScrolled ? 'py-3 bg-black/85 backdrop-blur-xl border-b border-white/10' : 'py-5 sm:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            
            {/* Editorial Brand / Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold font-heading text-sm flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                {profile.fullName ? profile.fullName.charAt(0) : 'M'}
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-base tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  {profile.fullName || 'Mateo Sanchez'}
                </span>
                <span className="text-[9px] text-zinc-400 font-mono tracking-widest uppercase flex items-center gap-1">
                  <Sparkles size={8} className="text-blue-400" /> AI WEB DESIGNER
                </span>
              </div>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ y: -1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="px-3.5 py-1 text-xs font-semibold text-zinc-300 hover:text-white transition-colors relative"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Action CTAs Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme Switcher */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-zinc-400 hover:text-white bg-white/[0.03] border border-white/10 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-400" />}
              </motion.button>

              {/* Admin CMS Trigger */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={() => setIsAdminOpen(true)}
                className="px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 flex items-center gap-1.5 transition-all cursor-pointer min-h-[44px]"
                title="Open CMS Admin"
              >
                <Shield size={13} className="text-blue-400" />
                <span>CMS Admin</span>
              </motion.button>

              {/* Start Project CTA */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={() => setIsProjectModalOpen(true)}
                className="px-4 py-2.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all flex items-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                <span>Initiate Project</span>
                <ArrowUpRight size={14} />
              </motion.button>
            </div>

            {/* Mobile & Tablet Hamburger Menu Trigger */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Quick Theme Switcher on Header */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-zinc-300 bg-white/[0.05] border border-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Toggle Theme"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-400" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-white bg-white/[0.05] border border-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile & Tablet Nav Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-[#0a0a0c]/98 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-6 py-6 shadow-2xl overflow-hidden max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-zinc-200 hover:text-blue-400 py-2.5 border-b border-white/5 flex items-center justify-between transition-colors min-h-[44px]"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight size={14} className="text-zinc-500" />
                </a>
              ))}

              <div className="pt-3 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminOpen(true);
                  }}
                  className="w-full py-3 text-xs font-mono text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl border border-blue-500/30 flex items-center justify-center gap-2 transition-all min-h-[44px]"
                >
                  <Shield size={15} />
                  <span>CMS Admin Dashboard</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsProjectModalOpen(true);
                  }}
                  className="w-full py-3.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all min-h-[44px]"
                >
                  <span>Initiate Project</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
