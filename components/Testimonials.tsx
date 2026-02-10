'use client';

import Image from 'next/image';
import { Section } from '@/components/ui/Section';

const testimonials = [
    {
        name: 'Ms. Kirana Yaninrujana (Nonnie)',
        title: 'Miss Wellness World China 2025',
        quote: "IT WAS SUCH A FUN EXPERIENCE! I'VE LEARNED SO MUCH AND DISCOVERED NEW THINGS ABOUT MY OWN POTENTIAL. EVEN THOUGH THE PAGEANT IS OVER, THE BEST PART IS THAT WE ALL STAYED FRIENDS. I'M COMING HOME WITH A HEART FULL OF BEAUTIFUL FRIENDSHIPS.",
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    },
    {
        name: 'Ms. Nanthida Mettapharuay (Nancy)',
        title: 'Miss Wellness World Hindustan 2025',
        quote: "THE MISS WELLNESS WORLD EXPERIENCE TRANSFORMED MY PERSPECTIVE ON BEAUTY AND HEALTH. I LEARNED THAT TRUE WELLNESS COMES FROM BALANCE AND SELF-LOVE. THIS JOURNEY HAS EMPOWERED ME TO INSPIRE OTHERS.",
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    },
    {
        name: 'Ms. Joann Tiong (Joann)',
        title: 'Miss Wellness World Malaysia 2025',
        quote: "BEING PART OF MISS WELLNESS WORLD HAS BEEN AN INCREDIBLE JOURNEY OF SELF-DISCOVERY. I'VE GAINED CONFIDENCE, MADE LIFELONG CONNECTIONS, AND LEARNED THE TRUE MEANING OF HOLISTIC WELLNESS.",
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
    },
];

export default function Testimonials() {
  return (
    <Section className="bg-wellness-green text-white">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 fade-in-up">
        Voices of the Journey
      </h2>
      <p className="text-center text-white/90 mb-16 max-w-2xl mx-auto fade-in-up">
        Miss Wellness World &amp; Miss Wellness World Thailand
      </p>

      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="fade-in-scale rounded-lg bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20"
          >
            <div className="mb-4 flex items-center">
              <div className="relative mr-4 h-16 w-16 overflow-hidden rounded-full border-2 border-wellness-gold">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-white">{testimonial.name}</h4>
                <p className="text-sm text-wellness-gold">{testimonial.title}</p>
              </div>
            </div>
            <blockquote className="text-sm italic leading-relaxed text-white/90">
              “{testimonial.quote}”
            </blockquote>
          </div>
        ))}
      </div>
    </Section>
  );
}
