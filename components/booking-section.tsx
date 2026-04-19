'use client';

import { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

export default function BookingSection() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="booking" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-wide mb-4">RESERVE YOUR SPOT</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Book Your Perfect Moment
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether it&apos;s a quiet coffee break or an intimate gathering, reserve your table now
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg order-2 md:order-1">
            <Image
              src="/dining-ambiance.jpg"
              alt="Dining at Café Zecchino"
              fill
              className="object-cover"
            />
          </div>

          {/* Booking Form */}
          <div className="order-1 md:order-2">
            <form onSubmit={handleSubmit} className="bg-background rounded-2xl p-8 shadow-sm border border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Calendar size={18} className="text-primary" />
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Clock size={18} className="text-primary" />
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Users size={18} className="text-primary" />
                  Number of Guests
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div className="border-t border-border pt-4 mt-4">
                <p className="text-sm font-semibold text-foreground mb-4">Your Details</p>

                {/* Name */}
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-accent transition-colors font-semibold"
                >
                  {submitted ? '✓ Booking Requested!' : 'Request Booking'}
                </button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  We&apos;ll confirm your reservation via email shortly
                </p>
              </div>
            </form>

            {/* Info */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground">Location</p>
                  <p className="text-muted-foreground text-sm">123 Buchanan Street, Glasgow, G1 2AB</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground">Call Us</p>
                  <p className="text-muted-foreground text-sm">+44 141 552 0555</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground">Hours</p>
                  <p className="text-muted-foreground text-sm">Mon-Fri: 7am - 9pm<br/>Sat-Sun: 8am - 10pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
