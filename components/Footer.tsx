'use client';

import Image from 'next/image';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-wellness-dark text-white">
            <div className="container mx-auto max-w-7xl px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <Image
                                src="/images/mww-logo.png"
                                alt="Miss Wellness World"
                                width={50}
                                height={50}
                                className="object-contain"
                            />
                            <span className="font-bold text-xl">MISS WELLNESS WORLD</span>
                        </div>
                        <p className="text-white/70 leading-relaxed">
                            Promoting holistic wellness and beauty from within.
                            Join us in inspiring positive change and sustainable living worldwide.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-wellness-gold">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#home" className="text-white/70 hover:text-wellness-gold transition-colors">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="text-white/70 hover:text-wellness-gold transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#hall-of-fame" className="text-white/70 hover:text-wellness-gold transition-colors">
                                    Hall of Fame
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-white/70 hover:text-wellness-gold transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-wellness-gold">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-white/70 hover:text-wellness-gold transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/70 hover:text-wellness-gold transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-white/70 hover:text-wellness-gold transition-colors">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/10 pt-8 text-center">
                    <p className="text-white/70">
                        © {currentYear} Miss Wellness World. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
