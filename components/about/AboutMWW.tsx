'use client';

import Image from 'next/image';

export default function AboutMWW() {
    return (
        <div className="section-padding bg-wellness-light">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <div className="w-32 h-32 mx-auto mb-6 relative">
                        <Image
                            src="/images/mww-logo.png"
                            alt="Miss Wellness World"
                            fill
                        className="object-contain animate-sparkle"
                        />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-wellness-green mb-6 fade-in-up">
                        Miss Wellness World
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Video */}
                    <div className="fade-in-left">
                        <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube-nocookie.com/embed/mKU1yO8CyVo"
                                title="Miss Wellness World"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="fade-in-right space-y-6">
                        <div>
                            <h3 className="text-2xl font-bold text-wellness-green mb-3">
                                Vision
                            </h3>
                            <p className="text-wellness-text leading-relaxed">
                                To establish Thailand as the <strong>Global Wellness Capital</strong> and inspire people worldwide to embrace a balanced, sustainable lifestyle through the power of wellness ambassadors.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-wellness-green mb-3">
                                Mission
                            </h3>
                            <p className="text-wellness-text leading-relaxed">
                                To select <strong>Wellness Ambassadors</strong> who promote holistic health from within to without, embodying the concept of <strong className="text-wellness-gold">Beauty with Wellness</strong> through balance of body, mind, and spirit.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-wellness-green mb-4">
                                The Crown Symbolism
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <div className="w-3 h-3 rounded-full bg-wellness-green mt-1.5 flex-shrink-0"></div>
                                    <div>
                                        <p className="font-semibold text-wellness-green">Emerald Green</p>
                                        <p className="text-sm text-wellness-text">Nature & Healing</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-3 h-3 rounded-full bg-wellness-gold mt-1.5 flex-shrink-0"></div>
                                    <div>
                                        <p className="font-semibold text-wellness-gold">Pearl</p>
                                        <p className="text-sm text-wellness-text">Wisdom & Compassion</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
