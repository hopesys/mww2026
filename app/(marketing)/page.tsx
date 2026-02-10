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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-wellness-light">
      <HeroSection />

      {/* About Sections */}
      <ExecutiveTeam />
      <AboutMWW />
      <AboutMWWT />

      {/* Hall of Fame Sections */}
      <HallOfFameGeneral />
      <HallOfFameMWW />
      <HallOfFameMWWT2024 />
      <HallOfFameMWWT2025 />

      {/* Testimonials */}
      <Testimonials />

      {/* Contact */}
      <ContactSection />
    </main>
  );
}
