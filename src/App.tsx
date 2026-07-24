import React from 'react';
import { CmsProvider } from './context/CmsContext';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { AnimatedSection } from './components/AnimatedSection';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Process } from './components/Process';
import { WhyChooseMe } from './components/WhyChooseMe';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ProjectStartModal } from './components/ProjectStartModal';
import { AdminCmsModal } from './components/AdminCmsModal';

export default function App() {
  return (
    <CmsProvider>
      <div className="min-h-screen bg-[#050505] text-white relative selection:bg-blue-600 selection:text-white font-sans overflow-x-hidden">
        {/* Subtle Grain / Film Noise Overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-30 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        {/* Initial Brand Loading Screen */}
        <LoadingScreen />

        {/* Custom Magnetic Cursor */}
        <CustomCursor />

        {/* Sticky Glass Navbar */}
        <Navbar />

        {/* Main Content Layout with Framer Motion Section Transitions */}
        <main>
          {/* 1. Hero Section */}
          <Hero />

          {/* 2. About Me / Profile */}
          <AnimatedSection>
            <AboutMe />
          </AnimatedSection>

          {/* 3. Services (14 Categories) */}
          <AnimatedSection>
            <Services />
          </AnimatedSection>

          {/* 4. Industry Portfolio Showcase */}
          <AnimatedSection>
            <Portfolio />
          </AnimatedSection>

          {/* 5. Process Timeline */}
          <AnimatedSection>
            <Process />
          </AnimatedSection>

          {/* 6. Why Choose Me */}
          <AnimatedSection>
            <WhyChooseMe />
          </AnimatedSection>

          {/* 7. Testimonials */}
          <AnimatedSection>
            <Testimonials />
          </AnimatedSection>

          {/* 8. FAQ Accordion */}
          <AnimatedSection>
            <Faq />
          </AnimatedSection>

          {/* 9. Contact & Brief Form */}
          <AnimatedSection>
            <Contact />
          </AnimatedSection>
        </main>

        {/* 10. Footer */}
        <Footer />

        {/* Interactive Modals */}
        <ProjectModal />
        <ProjectStartModal />
        <AdminCmsModal />
      </div>
    </CmsProvider>
  );
}
