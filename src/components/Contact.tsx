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
    const subject = encodeURIComponent("Business Inquiry - Prime Trading PNG Limited");
    const body = encodeURIComponent(
      "Dear Prime Trading PNG Team,\n\nI would like to inquire about:\n\nService Interest:\n[ ] Modular Housing Solutions\n[ ] Jumbo Bags (FIBC)\n[ ] Heavy Vehicle Spare Parts\n\nProject Details:\n\n\nContact Information:\nName:\nCompany:\nPhone:\n\nBest regards,"
    );
    window.location.href = `mailto:info@primetradingpng.com?subject=${subject}&body=${body}`;
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
      value: "Limited Liability Company"
    },
    {
      icon: Calendar,
      label: "Established",
      value: "2008" // Example - update with actual date
    },
    {
      icon: FileText,
      label: "Registration No.",
      value: "1-XXXXX" // Update with actual registration number
    },
    {
      icon: FileText,
      label: "TIN",
      value: "XXXXXXXXX" // Update with actual TIN
    },
    {
      icon: MapPin,
      label: "Postal Address",
      value: "P.O. Box XXXX, Port Moresby, NCD, Papua New Guinea" // Update with actual address
    },
    {
      icon: Phone,
      label: "Mobile",
      value: "+675 XXXX XXXX" // Update with actual phone
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@primetradingpng.com"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Get In Touch
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Ready to discuss your project? Contact us today for a consultation or quotation
          </p>

          {/* CTA Card */}
          <Card className="mb-12 bg-primary text-primary-foreground border-none">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Request a Quotation</h3>
              <p className="mb-6 text-primary-foreground/90">
                Our team responds to all inquiries within 24 hours. Let us know how we can support your project.
              </p>
              <Button 
                variant="secondary"
                size="lg"
                onClick={handleContact}
                className="no-print"
              >
                <Mail className="mr-2 h-5 w-5" />
                Send Email Inquiry
              </Button>
              <p className="mt-4 text-sm text-primary-foreground/70">
                Email: info@primetradingpng.com
              </p>
            </CardContent>
          </Card>

          {/* Company Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companyDetails.map((detail, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
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
