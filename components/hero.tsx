import { ArrowRight, Coffee } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-cafe.jpg"
          alt="Café Zecchino Interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Coffee className="w-5 h-5 text-accent" />
            <span className="text-accent text-sm font-medium tracking-wide">AUTHENTIC ITALIAN EXPERIENCE</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 text-pretty">
            Experience the Essence of Italy
          </h1>

          <p className="text-xl text-gray-100 mb-8 max-w-xl">
            Discover authentic Italian espresso, premium pastries, and warmth that reminds you why Café Zecchino is Glasgow&apos;s best-kept gem.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-accent transition-colors font-medium inline-flex items-center justify-center gap-2">
              Explore Menu
              <ArrowRight size={18} />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">
              Book a Table
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/20">
            <div>
              <p className="text-3xl font-serif font-bold text-white">15+</p>
              <p className="text-gray-200 text-sm mt-1">Years of Excellence</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-white">1000+</p>
              <p className="text-gray-200 text-sm mt-1">Happy Customers Daily</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-white">100%</p>
              <p className="text-gray-200 text-sm mt-1">Premium Ingredients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
