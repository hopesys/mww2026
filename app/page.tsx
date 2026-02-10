'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ExecutiveTeam from '@/components/about/ExecutiveTeam';
import AboutMWW from '@/components/about/AboutMWW';
import AboutMWWT from '@/components/about/AboutMWWT';
import HallOfFameGeneral from '@/components/halloffame/HallOfFameGeneral';
import HallOfFameMWW from '@/components/halloffame/HallOfFameMWW';
import HallOfFameMWWT2024 from '@/components/halloffame/HallOfFameMWWT2024';
import HallOfFameMWWT2025 from '@/components/halloffame/HallOfFameMWWT2025';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />

      {/* About Sections */}
      <section id="about" className="bg-white">
        <ExecutiveTeam />
        <AboutMWW />
        <AboutMWWT />
      </section>

      {/* Hall of Fame Sections */}
      <section id="hall-of-fame" className="bg-wellness-light">
        <HallOfFameGeneral />
        <HallOfFameMWW />
        <HallOfFameMWWT2024 />
        <HallOfFameMWWT2025 />
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Contact */}
      <section id="contact">
        <ContactSection />
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}
