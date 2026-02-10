'use client';

import Image from 'next/image';
import { Section } from '@/components/ui/Section';

export default function AboutMWW() {
  return (
    <Section className="bg-wellness-light">
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

      <div className="grid gap-12 items-center md:grid-cols-2">
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
              To establish Thailand as the <strong>Global Wellness Capital</strong> and
              inspire people worldwide to embrace a balanced, sustainable lifestyle
              through the power of wellness ambassadors.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-wellness-green mb-3">
              Mission
            </h3>
            <p className="text-wellness-text leading-relaxed">
              To select <strong>Wellness Ambassadors</strong> who promote holistic
              health from within to without, embodying the concept of{' '}
              <strong className="text-wellness-gold">Beauty with Wellness</strong> through
              balance of body, mind, and spirit.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-wellness-green mb-4">
              The Crown Symbolism
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-wellness-green" />
                <div>
                  <p className="font-semibold text-wellness-green">Emerald Green</p>
                  <p className="text-sm text-wellness-text">Nature &amp; Healing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-wellness-gold" />
                <div>
                  <p className="font-semibold text-wellness-gold">Pearl</p>
                  <p className="text-sm text-wellness-text">Wisdom &amp; Compassion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

