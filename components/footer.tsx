import Link from 'next/link';
import { Coffee } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif text-lg font-bold">Z</span>
              </div>
              <span className="font-serif text-xl font-bold">Café Zecchino</span>
            </div>
            <p className="text-background/80 text-sm mb-4">
              Authentic Italian coffee and cuisine in the heart of Glasgow.
            </p>
            <p className="text-background/60 text-xs">
              © {currentYear} Café Zecchino. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#menu" className="text-background/80 hover:text-background transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="#booking" className="text-background/80 hover:text-background transition-colors">
                  Book Table
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-background/80 hover:text-background transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-background transition-colors">
                  Order Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Info</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-background/80 hover:text-background transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-background transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-background transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-background transition-colors">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-background/80 hover:text-background transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-background transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-background transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-background transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Newsletter Signup */}
            <div className="flex-1">
              <p className="text-sm font-medium mb-3">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-background/10 text-background placeholder-background/60 border border-background/20 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-accent transition-colors text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="text-center md:text-right text-sm text-background/60">
              <p>Open 7 days a week • 123 Buchanan Street, Glasgow</p>
              <p>+44 141 552 0555</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
