/**
 * Footer Component
 * 
 * Legal information and quick CTA
 */

import companyLogo from "@/assets/company-logo.jpg";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={companyLogo} 
                alt="Prime Trading PNG Limited" 
                className="h-16 w-auto"
              />
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#about" className="hover:text-accent transition-colors">
                About
              </a>
              <a href="#services" className="hover:text-accent transition-colors">
                Services
              </a>
              <a href="#contact" className="hover:text-accent transition-colors">
                Contact
              </a>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center space-y-2">
            <p className="text-sm text-primary-foreground/80">
              Prime Trading PNG Limited • Registered in Papua New Guinea
            </p>
            <p className="text-sm text-primary-foreground/80">
              Specializing in Modular Housing, Jumbo Bags (FIBC), and Heavy Vehicle Spare Parts
            </p>
            <p className="text-xs text-primary-foreground/60 mt-4">
              © {currentYear} Prime Trading PNG Limited. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
