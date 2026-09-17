import React, { useState, useEffect } from 'react';

const SLIDES = [
  {
    id: 'electronics',
    title: '📱 Electronics & E-Waste',
    subtitle: 'Phones, Chargers, Headphones & Gadgets',
    image: '/images/hero/hero_electronics.jpg'
  },
  {
    id: 'books',
    title: '📚 Books & Paper Pulp',
    subtitle: 'Newspapers, Cardboard, Books & Magazines',
    image: '/images/hero/hero_books_paper.jpg'
  },
  {
    id: 'clothes',
    title: '👕 Clothes & Reusables',
    subtitle: 'Textiles, Footwear, Bags & Household Goods',
    image: '/images/hero/hero_clothes_reuse.jpg'
  },
  {
    id: 'mixed',
    title: '♻️ Smart Waste-to-Value',
    subtitle: 'Integrated Resource Collection & Recovery',
    image: '/images/hero/hero_mixed_waste.jpg'
  }
];

export default function HeroVideoBackground() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
    }, 4500); // Cross-fade every 4.5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-dark-bg">
      
      {/* Background Image Slideshow with Smooth Cross-Fade */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlideIndex ? 'opacity-70 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{
            backgroundImage: `url('${slide.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transitionProperty: 'opacity, transform',
            transitionDuration: '1000ms'
          }}
        />
      ))}

      {/* Layer 2: Balanced Dark & Emerald Translucent Overlay for High Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/85 via-dark-bg/60 to-dark-bg z-10" />
      <div className="absolute inset-0 bg-emerald-950/30 backdrop-brightness-95 z-10" />

      {/* Category Indicator Badge & Controls */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-3 glass-card px-4 py-2 rounded-full border border-emerald-500/20 bg-dark-bg/80 backdrop-blur-md">
        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
          {SLIDES[currentSlideIndex].title}
        </span>
        <div className="flex items-center gap-1.5 border-l border-emerald-500/20 pl-3">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentSlideIndex 
                  ? 'w-6 bg-emerald-400 shadow-glow' 
                  : 'bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
