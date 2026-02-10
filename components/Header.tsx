'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'hall-of-fame', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinkBase =
    'font-medium whitespace-nowrap transition-colors duration-150';

  const navColor = (section: string) => {
    if (activeSection === section) return 'text-wellness-gold';
    if (isScrolled) return 'text-wellness-text hover:text-wellness-gold';
    return 'text-white hover:text-wellness-gold';
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/mww-logo.png"
              alt="Miss Wellness World"
              width={60}
              height={60}
              className="object-contain"
            />
            <span
              className={`hidden text-lg font-bold md:block ${
                isScrolled ? 'text-wellness-green' : 'text-white text-shadow-lg'
              }`}
            >
              MISS WELLNESS WORLD
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className={`${navLinkBase} ${navColor('home')}`}
            >
              Home
            </button>

            <div className="group relative">
              <button className={`${navLinkBase} ${navColor('about')}`}>
                About Us
              </button>
              <div className="invisible absolute left-0 top-full z-50 mt-2 w-48 rounded-lg bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {['Executive Team', 'Miss Wellness World', 'Miss Wellness World Thailand'].map(
                  (label) => (
                    <button
                      key={label}
                      onClick={() => scrollToSection('about')}
                      className="block w-full px-4 py-2 text-left text-wellness-text transition-colors hover:bg-wellness-light hover:text-wellness-gold"
                    >
                      {label}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="group relative">
              <button className={`${navLinkBase} ${navColor('hall-of-fame')}`}>
                Hall of Fame
              </button>
              <div className="invisible absolute left-0 top-full z-50 mt-2 w-48 rounded-lg bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {['MWW 2025', 'MWWT 2024', 'MWWT 2025'].map((label, idx) => (
                  <button
                    key={label}
                    onClick={() => scrollToSection('hall-of-fame')}
                    className={`block w-full px-4 py-2 text-left text-wellness-text transition-colors hover:bg-wellness-light hover:text-wellness-gold ${
                      idx === 0
                        ? 'rounded-t-lg'
                        : idx === 2
                        ? 'rounded-b-lg'
                        : ''
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => scrollToSection('contact')}
              className={`${navLinkBase} ${navColor('contact')}`}
            >
              Contact
            </button>

            <Link href="/apply" className="ml-2">
              <Button>Apply Now</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 lg:hidden"
          >
            <div className="space-y-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block h-0.5 w-6 ${
                    isScrolled ? 'bg-wellness-green' : 'bg-white'
                  }`}
                />
              ))}
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 rounded-lg bg-white p-4 shadow-lg lg:hidden">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Us' },
              { id: 'hall-of-fame', label: 'Hall of Fame' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full py-2 text-left text-wellness-text transition-colors hover:text-wellness-gold"
              >
                {item.label}
              </button>
            ))}
            <Link href="/apply" className="mt-2 block">
              <Button fullWidth>Apply Now</Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

