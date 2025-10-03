/**
 * Hero Section Component
 * 
 * Full-width hero section with company branding and CTA
 * Optimized for both screen and print (A4)
 */

import { Button } from "@/components/ui/button";
import { Mail, Phone, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import companyLogo from "@/assets/company-logo.jpg";

export const Hero = () => {
  const handleContact = () => {
    const subject = encodeURIComponent("Catalogue & Pricing Request - Prime Trading PNG Limited");
    const body = encodeURIComponent(
      "Dear Prime Trading PNG Team,\n\nI would like to request:\n[ ] Product catalogue\n[ ] Pricing information\n[ ] Bulk supply discussion\n\nService Interest:\n[ ] Modular Housing Solutions\n[ ] Jumbo Bags (FIBC)\n[ ] Heavy Vehicle Spare Parts\n\nBest regards,"
    );
    window.location.href = `mailto:info@prime-trading.png?subject=${subject}&body=${body}`;
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="hero"
      className="hero-section relative min-h-screen flex items-center justify-center bg-primary text-primary-foreground overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(26, 40, 55, 0.85), rgba(26, 40, 55, 0.85)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 py-20 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          {/* Company Logo */}
          <div className="flex justify-center mb-4 md:mb-6 animate-scale-in">
            <img 
              src={companyLogo} 
              alt="Prime Trading PNG Limited - Import & Export" 
              className="h-24 md:h-32 lg:h-40 w-auto hover-lift"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed animate-fade-in px-4">
            Your trusted partner for modular housing, industrial packaging, and heavy vehicle solutions across Papua New Guinea
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center no-print animate-fade-in px-4" style={{ animationDelay: '0.2s' }}>
            <Button 
              variant="cta" 
              size="lg"
              onClick={handleContact}
              className="w-full sm:w-auto text-sm md:text-base"
            >
              <Mail className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Request Catalogue & Pricing
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              asChild
              className="w-full sm:w-auto bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 text-sm md:text-base"
            >
              <a href="tel:+61432548250">
                <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                +61 432 548 250
              </a>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-primary-foreground/20 animate-fade-in px-4" style={{ animationDelay: '0.4s' }}>
            <div className="text-center hover-lift">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-1 md:mb-2">10+</div>
              <div className="text-xs md:text-sm text-primary-foreground/80">Years Experience</div>
            </div>
            <div className="text-center hover-lift">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-1 md:mb-2">PNG</div>
              <div className="text-xs md:text-sm text-primary-foreground/80">Based & Operated</div>
            </div>
            <div className="text-center hover-lift">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-1 md:mb-2">24/7</div>
              <div className="text-xs md:text-sm text-primary-foreground/80">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator - Responsive */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 md:gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-all no-print group z-20"
        aria-label="Scroll to content"
      >
        <span className="text-xs md:text-sm font-medium">Scroll Down</span>
        <div className="animate-bounce">
          <ChevronDown className="h-6 w-6 md:h-8 md:w-8 group-hover:scale-110 transition-transform" />
        </div>
      </button>
    </section>
  );
};
