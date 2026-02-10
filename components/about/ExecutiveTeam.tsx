'use client';

import Image from 'next/image';
import { Section } from '@/components/ui/Section';

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
    <Section id="about" className="bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-wellness-green mb-3 fade-in-up">
          Our Executive Team
        </h2>
        <p className="text-base md:text-lg text-wellness-text max-w-2xl mx-auto fade-in-up">
          Meet the visionary leaders behind Miss Wellness World
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
        {executives.map((exec, index) => (
          <div
            key={index}
            className="fade-in-scale group flex flex-col items-center text-center md:items-start md:text-left"
          >
            <div className="relative mb-5 h-40 w-40 overflow-hidden rounded-full border-4 border-wellness-gold shadow-lg transition-transform duration-300 group-hover:scale-105">
              <Image
                src={exec.image}
                alt={exec.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mb-1 text-lg font-bold text-wellness-green md:text-xl">
              {exec.name}
            </h3>
            <p className="mb-1 text-sm font-semibold text-wellness-gold md:text-base">
              {exec.title}
            </p>
            <p className="mb-2 text-xs font-medium text-wellness-text/70 md:text-sm">
              {exec.subtitle}
            </p>
            <p className="text-xs text-wellness-text/80 md:text-sm">
              {exec.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
