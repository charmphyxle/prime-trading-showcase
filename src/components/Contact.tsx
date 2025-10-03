/**
 * Contact & Company Details Section
 * 
 * Displays company registration details and contact information
 * Includes primary mailto CTA
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Mail, MapPin, Phone, FileText, Calendar } from "lucide-react";

export const Contact = () => {
  const handleContact = () => {
    const subject = encodeURIComponent("Catalogue & Pricing Request - Prime Trading PNG Limited");
    const body = encodeURIComponent(
      "Dear Prime Trading PNG Team,\n\nI would like to request:\n[ ] Product catalogue\n[ ] Pricing information\n[ ] Bulk supply discussion\n\nService Interest:\n[ ] Modular Housing Solutions\n[ ] Jumbo Bags (FIBC)\n[ ] Heavy Vehicle Spare Parts\n\nProject Details:\n\n\nContact Information:\nName:\nCompany:\nPhone:\n\nBest regards,"
    );
    window.location.href = `mailto:info@prime-trading.png?subject=${subject}&body=${body}`;
  };

  const companyDetails = [
    {
      icon: Building2,
      label: "Company Name",
      value: "Prime Trading PNG Limited"
    },
    {
      icon: FileText,
      label: "Entity Type",
      value: "Companies"
    },
    {
      icon: Calendar,
      label: "Established",
      value: "17 April 2015"
    },
    {
      icon: FileText,
      label: "Registration No.",
      value: "1-139496698"
    },
    {
      icon: FileText,
      label: "TIN",
      value: "502889519"
    },
    {
      icon: MapPin,
      label: "Postal Address",
      value: "PO Box 211, Port Moresby, National Capital District, Papua New Guinea"
    },
    {
      icon: Phone,
      label: "Contact",
      value: "+61 432 548 250 (Chaminda Jayasinghe)"
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@prime-trading.png"
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Get In Touch
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Ready to discuss your project? Contact us today for a consultation or quotation
          </p>

          {/* CTA Card */}
          <Card className="mb-12 bg-primary text-primary-foreground border-none hover-lift card-shine">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Request Catalogue & Pricing</h3>
              <p className="mb-6 text-primary-foreground/90">
                Email us to request a catalogue, pricing information, or to discuss bulk supply options. 
                Our team responds to all inquiries within 24 hours.
              </p>
              <Button 
                variant="secondary"
                size="lg"
                onClick={handleContact}
                className="no-print hover:scale-105 transition-transform"
              >
                <Mail className="mr-2 h-5 w-5" />
                Request Catalogue & Pricing
              </Button>
              <p className="mt-4 text-sm text-primary-foreground/70">
                Email: info@prime-trading.png
              </p>
            </CardContent>
          </Card>

          {/* Company Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companyDetails.map((detail, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg border bg-card hover-lift"
              >
                <detail.icon className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    {detail.label}
                  </div>
                  <div className="text-base font-semibold text-foreground">
                    {detail.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
