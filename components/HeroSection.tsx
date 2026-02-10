'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070)',
        }}
      >
        <div className="wellness-gradient-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center animate-hero-fade">
        <h1 className="mb-6 text-4xl font-bold text-white text-shadow-lg md:text-6xl lg:text-7xl">
          WHO Will Be The First
          <br />
          <span className="text-wellness-gold">Miss Wellness World</span>
        </h1>
        <p className="mb-8 text-xl text-white md:text-2xl text-shadow">
          Beauty with Wellness
        </p>
        <p className="mx-auto mb-12 max-w-3xl text-lg text-white/90 md:text-xl text-shadow">
          การประกวดความงามระดับโลกที่มุ่งเน้นสุขภาวะที่ยั่งยืน
          <br />
          เพื่อสร้างทูตสุขภาพที่เป็นแรงบันดาลใจให้กับผู้คน
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/apply">
            <Button className="px-8 py-3 text-lg">Apply Now</Button>
          </Link>
          <Button
            variant="outline"
            className="border-white bg-white/10 px-8 py-3 text-lg text-white hover:bg-white/20"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

