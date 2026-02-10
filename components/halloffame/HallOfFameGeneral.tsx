'use client';

export default function HallOfFameGeneral() {
    return (
        <div className="section-padding bg-wellness-light">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold text-wellness-green mb-6 fade-in-up">
                        HALL OF FAME
                    </h2>
                    <p className="text-xl text-wellness-text max-w-3xl mx-auto fade-in-up">
                        Celebrating our wellness ambassadors who inspire the world with their dedication to holistic health and beauty
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 fade-in-scale"
                        >
                            <img
                                src={`https://images.unsplash.com/photo-${i === 1
                                        ? '1469854523530-876a74c6e7e2'
                                        : i === 2
                                            ? '1515886657613-9d3515e0ce13'
                                            : '1524504388940-b1c1722653e1'
                                    }?w=800&h=600&fit=crop`}
                                alt={`Hall of Fame ${i}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto fade-in-up">
                    <blockquote className="text-xl md:text-2xl text-wellness-text italic">
                        "True beauty radiates from within, nurtured by wellness, compassion, and a commitment to inspire positive change in the world."
                    </blockquote>
                    <p className="mt-4 text-wellness-gold font-semibold">
                        — Miss Wellness World Philosophy
                    </p>
                </div>
            </div>
        </div>
    );
}
