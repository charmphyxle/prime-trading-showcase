/**
 * Hero Section Component
 * 
 * Full-width hero section with company branding and CTA
 * Optimized for both screen and print (A4)
 */

import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import companyLogo from "@/assets/company-logo.jpg";

export const Hero = () => {
  const handleContact = () => {
    const subject = encodeURIComponent("Inquiry - Prime Trading PNG Limited");
    const body = encodeURIComponent(
      "Dear Prime Trading PNG Team,\n\nI am interested in learning more about your services.\n\nPlease provide information about:\n[ ] Modular Housing Solutions\n[ ] Jumbo Bags (FIBC)\n[ ] Heavy Vehicle Spare Parts\n\nBest regards,"
    );
    window.location.href = `mailto:info@primetradingpng.com?subject=${subject}&body=${body}`;
  };

  return (
    <section 
      className="hero-section relative min-h-[600px] flex items-center justify-center bg-primary text-primary-foreground overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(26, 40, 55, 0.85), rgba(26, 40, 55, 0.85)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Company Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src={companyLogo} 
              alt="Prime Trading PNG Limited - Import & Export" 
              className="h-32 md:h-40 w-auto"
            />
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Your trusted partner for modular housing, industrial packaging, and heavy vehicle solutions across Papua New Guinea
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center no-print">
            <Button 
              variant="cta" 
              size="lg"
              onClick={handleContact}
              className="w-full sm:w-auto"
            >
              <Mail className="mr-2 h-5 w-5" />
              Request Information
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              asChild
              className="w-full sm:w-auto bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <a href="tel:+675XXXXXXXX">
                <Phone className="mr-2 h-5 w-5" />
                Call Us Today
              </a>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-primary-foreground/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">15+</div>
              <div className="text-sm text-primary-foreground/80">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <div className="text-sm text-primary-foreground/80">PNG Based</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <div className="text-sm text-primary-foreground/80">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
