'use client';

import { Section } from '@/components/layout/Section';

export default function HallOfFameGeneral() {
  return (
    <Section id="hall-of-fame" className="bg-wellness-light">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-bold text-wellness-green mb-6 fade-in-up">
          HALL OF FAME
        </h2>
        <p className="mx-auto max-w-3xl text-xl text-wellness-text fade-in-up">
          Celebrating our wellness ambassadors who inspire the world with their
          dedication to holistic health and beauty
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-12">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="fade-in-scale aspect-[4/3] overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <img
              src={`https://images.unsplash.com/photo-${
                i === 1
                  ? '1469854523530-876a74c6e7e2'
                  : i === 2
                  ? '1515886657613-9d3515e0ce13'
                  : '1524504388940-b1c1722653e1'
              }?w=800&h=600&fit=crop`}
              alt={`Hall of Fame ${i}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="fade-in-up mx-auto max-w-3xl rounded-lg bg-white p-8 text-center shadow-lg">
        <blockquote className="text-xl md:text-2xl text-wellness-text italic">
          &quot;True beauty radiates from within, nurtured by wellness, compassion, and
          a commitment to inspire positive change in the world.&quot;
        </blockquote>
        <p className="mt-4 font-semibold text-wellness-gold">
          — Miss Wellness World Philosophy
        </p>
      </div>
    </Section>
  );
}

