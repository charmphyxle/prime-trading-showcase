/**
 * Footer Component
 * 
 * Complete footer with company info, services, and contact details
 * Beautiful gradient background with excellent contrast
 */

import companyLogo from "@/assets/company-logo.jpg";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(210 40% 20%) 50%, hsl(var(--primary)) 100%)'
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Company Info */}
            <div className="space-y-4">
              <img 
                src={companyLogo} 
                alt="Prime Trading PNG Limited Logo" 
                className="h-20 w-auto mb-4"
                loading="lazy"
                width="160"
                height="80"
              />
              <p className="text-sm text-primary-foreground/90 leading-relaxed">
                Your trusted partner for industrial solutions across Papua New Guinea since 2015.
              </p>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Building2 className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="leading-normal">Reg. No: 1-139496698</span>
              </div>
            </div>

            {/* Our Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-accent mb-4 leading-normal">Our Services</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/90">
                <li className="leading-relaxed hover:text-accent transition-colors cursor-pointer">
                  Modular Housing Solutions
                </li>
                <li className="leading-relaxed hover:text-accent transition-colors cursor-pointer">
                  Jumbo Bags (FIBC)
                </li>
                <li className="leading-relaxed hover:text-accent transition-colors cursor-pointer">
                  Heavy Vehicle Spare Parts
                </li>
                <li className="leading-relaxed hover:text-accent transition-colors cursor-pointer">
                  Bulk Supply & Distribution
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-accent mb-4 leading-normal">Quick Links</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/90">
                <li>
                  <a href="#hero" className="hover:text-accent transition-colors leading-relaxed inline-block">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-accent transition-colors leading-relaxed inline-block">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-accent transition-colors leading-relaxed inline-block">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-accent transition-colors leading-relaxed inline-block">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-accent mb-4 leading-normal">Contact Us</h3>
              <ul className="space-y-3 text-sm text-primary-foreground/90">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                  <span className="leading-relaxed">
                    PO Box 211, Port Moresby, NCD, Papua New Guinea
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                  <a 
                    href="tel:+61432548250" 
                    className="hover:text-accent transition-colors leading-relaxed"
                  >
                    +61 432 548 250
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                  <a 
                    href="mailto:info@prime-trading.png" 
                    className="hover:text-accent transition-colors leading-relaxed"
                  >
                    info@prime-trading.png
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-primary-foreground/20 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <p className="text-sm text-primary-foreground/80 leading-relaxed">
                © {currentYear} Prime Trading PNG Limited. All rights reserved.
              </p>
              <p className="text-sm text-primary-foreground/80 leading-relaxed">
                TIN: 502889519 | Est. 17 April 2015
              </p>
            </div>
            <p className="text-xs text-primary-foreground/60 text-center mt-4 leading-relaxed">
              Prime Trading PNG Limited is a registered company in Papua New Guinea specializing in modular housing, industrial packaging, and heavy vehicle solutions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
