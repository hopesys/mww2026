'use client';

import Image from 'next/image';

const executives = [
    {
        name: 'Dr. Kriengsak Chareonwongsak',
        title: 'Founder & Chairman',
        subtitle: 'MISS WELLNESS WORLD',
        description: 'Senior Fellow, Harvard University, USA. Chairman of the Nation-Building Institute (NBI). 22nd Prime Ministerial Advisor, Thailand.',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    },
    {
        name: 'Ms. Sakuna Rojanapanich',
        title: 'Managing Director',
        subtitle: 'MISS WELLNESS WORLD',
        description: 'Leading the global vision of Miss Wellness World pageant',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    },
    {
        name: 'Ms. Montakarn Jaiareebamrung',
        title: 'Managing Director',
        subtitle: 'MISS WELLNESS WORLD & MISS WELLNESS WORLD THAILAND',
        description: 'Overseeing both international and Thailand pageant operations',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    },
    {
        name: 'Ms. Pirawan Pasayamart',
        title: 'Director of PR & Marketing',
        subtitle: 'THE OFFICIAL COPYRIGHT HOLDER AND ORGANIZER',
        description: 'Managing public relations, marketing, events and sponsorships for MWW and MWWT pageants',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
    },
];

export default function ExecutiveTeam() {
    return (
        <div className="section-padding bg-white">
            <div className="container mx-auto max-w-7xl">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-wellness-green mb-4 fade-in-up">
                    Our Executive Team
                </h2>
                <p className="text-center text-wellness-text mb-16 max-w-2xl mx-auto fade-in-up">
                    Meet the visionary leaders behind Miss Wellness World
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {executives.map((exec, index) => (
                        <div
                            key={index}
                            className="fade-in-scale text-center group"
                        >
                            <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-wellness-gold shadow-lg group-hover:scale-105 transition-transform duration-300">
                                <Image
                                    src={exec.image}
                                    alt={exec.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-wellness-green mb-2">
                                {exec.name}
                            </h3>
                            <p className="text-wellness-gold font-semibold mb-1">
                                {exec.title}
                            </p>
                            <p className="text-sm text-wellness-text/70 mb-3 font-medium">
                                {exec.subtitle}
                            </p>
                            <p className="text-sm text-wellness-text/80">
                                {exec.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
