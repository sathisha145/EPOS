'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif text-lg font-bold">Z</span>
            </div>
            <span className="hidden md:block font-serif text-xl font-bold text-foreground">
              Café Zecchino
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#menu" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              Menu
            </Link>
            <Link href="#booking" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              Book Table
            </Link>
            <Link href="#contact" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              Contact
            </Link>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-accent transition-colors font-medium text-sm">
              Order Online
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="#menu" className="text-foreground hover:text-primary px-2 py-2">
              Menu
            </Link>
            <Link href="#booking" className="text-foreground hover:text-primary px-2 py-2">
              Book Table
            </Link>
            <Link href="#contact" className="text-foreground hover:text-primary px-2 py-2">
              Contact
            </Link>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-accent transition-colors font-medium text-sm w-full">
              Order Online
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
