'use client';

import Image from 'next/image';
import { Section } from '@/components/layout/Section';

export default function AboutMWWT() {
  return (
    <Section className="bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-wellness-green mb-4 fade-in-up">
          Miss Wellness World Thailand
        </h2>
        <p className="text-2xl text-wellness-gold font-semibold mb-6 fade-in-up">
          Beauty with Wellness
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="fade-in-left space-y-6">
                        <div className="bg-wellness-light p-6 rounded-lg">
                            <h3 className="text-2xl font-bold text-wellness-green mb-3">
                                Health Quotient (HQ)
                            </h3>
                            <p className="text-wellness-text leading-relaxed">
                                เราเชื่อว่าความงามที่แท้จริงเริ่มต้นจากสุขภาวะที่ดี ทั้งกาย ใจ และจิตวิญญาณ
                                Miss Wellness World Thailand มุ่งเน้นการพัฒนา <strong>Health Quotient (HQ)</strong>
                                เพื่อสร้างทูตสุขภาพที่เป็นแรงบันดาลใจให้กับสังคม
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-wellness-green text-white p-6 rounded-lg text-center">
                                <h4 className="text-3xl font-bold mb-2">18-32</h4>
                                <p className="text-sm">Age Range</p>
                            </div>
                            <div className="bg-wellness-gold text-white p-6 rounded-lg text-center">
                                <h4 className="text-3xl font-bold mb-2">500+</h4>
                                <p className="text-sm">Applicants</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <svg className="w-6 h-6 text-wellness-gold mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h4 className="font-semibold text-wellness-green">Purpose</h4>
                                    <p className="text-sm text-wellness-text">To promote wellness and healthy living as a lifestyle</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <svg className="w-6 h-6 text-wellness-gold mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h4 className="font-semibold text-wellness-green">Mission</h4>
                                    <p className="text-sm text-wellness-text">To select wellness ambassadors who inspire holistic health</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video */}
                    <div className="fade-in-right">
                        <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube-nocookie.com/embed/yloB83xrWz8"
                                title="Miss Wellness World Thailand"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </Section>
    );
}
