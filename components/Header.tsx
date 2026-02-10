'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position
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
                behavior: 'smooth'
            });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
                }`}
        >
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => scrollToSection('home')}
                        className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                    >
                        <Image
                            src="/images/mww-logo.png"
                            alt="Miss Wellness World"
                            width={60}
                            height={60}
                            className="object-contain"
                        />
                        <span className={`font-bold text-lg hidden md:block ${isScrolled ? 'text-wellness-green' : 'text-white text-shadow-lg'
                            }`}>
                            MISS WELLNESS WORLD
                        </span>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                        <button
                            onClick={() => scrollToSection('home')}
                            className={`font-medium transition-colors whitespace-nowrap ${activeSection === 'home'
                                ? 'text-wellness-gold'
                                : isScrolled
                                    ? 'text-wellness-text hover:text-wellness-gold'
                                    : 'text-white hover:text-wellness-gold'
                                }`}
                        >
                            Home
                        </button>

                        <div className="relative group">
                            <button
                                className={`font-medium transition-colors whitespace-nowrap ${activeSection === 'about'
                                    ? 'text-wellness-gold'
                                    : isScrolled
                                        ? 'text-wellness-text hover:text-wellness-gold'
                                        : 'text-white hover:text-wellness-gold'
                                    }`}
                            >
                                About Us
                            </button>
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                <button
                                    onClick={() => scrollToSection('about')}
                                    className="block w-full text-left px-4 py-2 text-wellness-text hover:bg-wellness-light hover:text-wellness-gold transition-colors"
                                >
                                    Executive Team
                                </button>
                                <button
                                    onClick={() => scrollToSection('about')}
                                    className="block w-full text-left px-4 py-2 text-wellness-text hover:bg-wellness-light hover:text-wellness-gold transition-colors"
                                >
                                    Miss Wellness World
                                </button>
                                <button
                                    onClick={() => scrollToSection('about')}
                                    className="block w-full text-left px-4 py-2 text-wellness-text hover:bg-wellness-light hover:text-wellness-gold transition-colors rounded-b-lg"
                                >
                                    Miss Wellness World Thailand
                                </button>
                            </div>
                        </div>

                        <div className="relative group">
                            <button
                                className={`font-medium transition-colors whitespace-nowrap ${activeSection === 'hall-of-fame'
                                    ? 'text-wellness-gold'
                                    : isScrolled
                                        ? 'text-wellness-text hover:text-wellness-gold'
                                        : 'text-white hover:text-wellness-gold'
                                    }`}
                            >
                                Hall of Fame
                            </button>
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                <button
                                    onClick={() => scrollToSection('hall-of-fame')}
                                    className="block w-full text-left px-4 py-2 text-wellness-text hover:bg-wellness-light hover:text-wellness-gold transition-colors rounded-t-lg"
                                >
                                    MWW 2025
                                </button>
                                <button
                                    onClick={() => scrollToSection('hall-of-fame')}
                                    className="block w-full text-left px-4 py-2 text-wellness-text hover:bg-wellness-light hover:text-wellness-gold transition-colors"
                                >
                                    MWWT 2024
                                </button>
                                <button
                                    onClick={() => scrollToSection('hall-of-fame')}
                                    className="block w-full text-left px-4 py-2 text-wellness-text hover:bg-wellness-light hover:text-wellness-gold transition-colors rounded-b-lg"
                                >
                                    MWWT 2025
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => scrollToSection('contact')}
                            className={`font-medium transition-colors whitespace-nowrap ${activeSection === 'contact'
                                ? 'text-wellness-gold'
                                : isScrolled
                                    ? 'text-wellness-text hover:text-wellness-gold'
                                    : 'text-white hover:text-wellness-gold'
                                }`}
                        >
                            Contact
                        </button>

                        <button className="px-6 py-2 bg-wellness-gold text-white font-semibold rounded-full hover:bg-opacity-90 transition-all hover:scale-105 whitespace-nowrap ml-2">
                            Apply Now
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2"
                    >
                        <div className="space-y-1.5">
                            <span className={`block w-6 h-0.5 ${isScrolled ? 'bg-wellness-green' : 'bg-white'}`}></span>
                            <span className={`block w-6 h-0.5 ${isScrolled ? 'bg-wellness-green' : 'bg-white'}`}></span>
                            <span className={`block w-6 h-0.5 ${isScrolled ? 'bg-wellness-green' : 'bg-white'}`}></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
                        <button
                            onClick={() => scrollToSection('home')}
                            className="block w-full text-left py-2 text-wellness-text hover:text-wellness-gold transition-colors"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection('about')}
                            className="block w-full text-left py-2 text-wellness-text hover:text-wellness-gold transition-colors"
                        >
                            About Us
                        </button>
                        <button
                            onClick={() => scrollToSection('hall-of-fame')}
                            className="block w-full text-left py-2 text-wellness-text hover:text-wellness-gold transition-colors"
                        >
                            Hall of Fame
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="block w-full text-left py-2 text-wellness-text hover:text-wellness-gold transition-colors"
                        >
                            Contact
                        </button>
                        <button className="w-full mt-2 px-6 py-2 bg-wellness-gold text-white font-semibold rounded-full hover:bg-opacity-90 transition-all">
                            Apply Now
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
}
