'use client';

export default function HeroSection() {
    return (
        <section
            id="home"
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070)',
                }}
            >
                <div className="absolute inset-0 wellness-gradient-overlay"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-hero-fade">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-shadow-lg">
                    WHO Will Be The First
                    <br />
                    <span className="text-wellness-gold">Miss Wellness World</span>
                </h1>
                <p className="text-xl md:text-2xl text-white mb-8 text-shadow">
                    Beauty with Wellness
                </p>
                <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto text-shadow">
                    การประกวดความงามระดับโลกที่มุ่งเน้นสุขภาวะที่ยั่งยืน
                    <br />
                    เพื่อสร้างทูตสุขภาพที่เป็นแรงบันดาลใจให้กับผู้คน
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-wellness-gold text-white font-semibold rounded-full hover:bg-opacity-90 transition-all hover:scale-105 text-lg">
                        Apply Now
                    </button>
                    <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 transition-all border-2 border-white text-lg">
                        Learn More
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </section>
    );
}
