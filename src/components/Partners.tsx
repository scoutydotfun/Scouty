import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';

const partners = [
  { name: 'x402scan', logo: '/partners/x402scan copy.png', isImage: true, scale: 1.0 },
  { name: 'Pump.fun', logo: '/partners/Pump_fun_logo (2).png', isImage: true, scale: 0.8 },
  { name: 'Solana', logo: '/partners/solana_thumb.png', isImage: true, scale: 0.9 },
  { name: 'CoinGecko', logo: '/partners/CoinGecko_logo.png', isImage: true, scale: 0.85 },
  { name: 'DexTools', logo: '/partners/107892413.png', isImage: true, scale: 0.85 },
];

export default function Partners() {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Duplicate partners array for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + partners.length) % partners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % partners.length);
  };

  return (
    <section className="py-24 bg-black overflow-hidden morph-fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-white/60 mb-4">
            <Layers className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider uppercase">Our Partners</span>
          </div>
          <h2 className="text-5xl font-bold mb-6 text-white">
            Trusted by the best.
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Working together to build a more intuitive internet experience
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Carousel */}
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className={`flex gap-8 ${isPaused ? '' : 'partners-carousel'}`}
              style={{
                width: `${duplicatedPartners.length * 200}px`,
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="partner-logo flex items-center justify-center rounded-2xl p-8 hover:scale-105 transition-all duration-300 border border-white/10"
                  style={{
                    width: '240px',
                    height: '140px',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  {partner.isImage ? (
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="object-contain"
                      style={{
                        filter: 'drop-shadow(0 2px 8px rgba(255, 255, 255, 0.1))',
                        width: `${120 * (partner.scale || 1)}px`,
                        height: `${120 * (partner.scale || 1)}px`,
                      }}
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white tracking-tight">
                        {partner.logo}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={handlePrevious}
              className="p-3 rounded-full transition-all duration-300 group border border-white/20 hover:border-white/40 hover:bg-white/5"
              style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
              }}
              aria-label="Previous partners"
            >
              <ChevronLeft className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {partners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex % partners.length
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full transition-all duration-300 group border border-white/20 hover:border-white/40 hover:bg-white/5"
              style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
              }}
              aria-label="Next partners"
            >
              <ChevronRight className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
