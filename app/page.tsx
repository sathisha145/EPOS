'use client';

import Link from 'next/link';
import Navigation from '@/components/navigation';
import Hero from '@/components/hero';
import MenuSection from '@/components/menu-section';
import BookingSection from '@/components/booking-section';
import TestimonialsSection from '@/components/testimonials-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Staff Access - Fixed bottom right corner */}
      <Link 
        href="/epos" 
        className="fixed bottom-4 right-4 z-50 bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-lg"
      >
        Staff EPOS
      </Link>
      
      <Navigation />
      <Hero />
      <MenuSection />
      <BookingSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
