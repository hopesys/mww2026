'use client';

import Image from 'next/image';

const winners = [
    {
        name: 'Nitwara Inchu',
        title: 'Miss Wellness World Thailand 2025',
        position: 'Winner',
        image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=800&fit=crop',
    },
    {
        name: 'Natphatsorn Buapa',
        title: '3rd Runner-up',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=600&fit=crop',
    },
    {
        name: 'Catthareeya Ratchanuwong',
        title: '4th Runner-up',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop',
    },
];

export default function HallOfFameMWWT2025() {
    return (
        <div className="section-padding bg-white">
            <div className="container mx-auto max-w-7xl">
                <h3 className="text-3xl md:text-4xl font-bold text-center text-wellness-green mb-12 fade-in-up">
                    Miss Wellness World Thailand 2025
                </h3>

                {/* Winner */}
                <div className="mb-16 fade-in-scale">
                    <div className="max-w-2xl mx-auto">
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl mb-6">
                            <Image
                                src={winners[0].image}
                                alt={winners[0].name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                <div className="flex items-center justify-center mb-2">
                                    <svg className="w-8 h-8 text-wellness-gold" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold text-white text-center mb-1">{winners[0].name}</h4>
                                <p className="text-wellness-gold text-center font-semibold text-lg">{winners[0].title}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Runners-up */}
                <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {winners.slice(1).map((winner, index) => (
                        <div key={index} className="fade-in-up group">
                            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg mb-4 group-hover:scale-105 transition-transform duration-300">
                                <Image
                                    src={winner.image}
                                    alt={winner.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h5 className="font-bold text-wellness-green text-center mb-1">{winner.name}</h5>
                            <p className="text-wellness-gold text-center font-semibold text-sm">{winner.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
