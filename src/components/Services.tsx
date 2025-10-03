/**
 * Services Section Component
 * 
 * Three service cards with icons and benefits
 * Print-optimized with page-break handling
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import iconHousing from "@/assets/icon-housing.jpg";
import iconBags from "@/assets/icon-bags.jpg";
import iconParts from "@/assets/icon-parts.jpg";

export const Services = () => {
  const services = [
    {
      title: "Modular Housing Solutions",
      icon: iconHousing,
      description: "Durable container-based accommodation units for mining camps, construction sites, and remote operations",
      benefits: [
        "Quick deployment and setup",
        "Weather-resistant construction",
        "Customizable layouts available",
        "Cost-effective workforce housing"
      ]
    },
    {
      title: "Jumbo Bags (FIBC)",
      icon: iconBags,
      description: "High-capacity flexible intermediate bulk containers for efficient material handling and storage",
      benefits: [
        "Heavy-duty construction",
        "Various sizes and load capacities",
        "UV-resistant materials",
        "Ideal for mining and agriculture"
      ]
    },
    {
      title: "Heavy Vehicle Spare Parts",
      icon: iconParts,
      description: "Comprehensive inventory of genuine and aftermarket parts for trucks, excavators, and heavy machinery",
      benefits: [
        "Reduce downtime with quick supply",
        "Quality-assured components",
        "Competitive pricing",
        "Expert technical support"
      ]
    }
  ];

  return (
    <section id="services" className="py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-3 md:mb-4 text-foreground px-4">
            Our Services
          </h2>
          <p className="text-center text-sm md:text-base text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            Comprehensive industrial solutions designed for Papua New Guinea's demanding conditions
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="service-card hover-lift card-shine border-2 hover:border-accent"
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-3 md:mb-4">
                    <img 
                      src={service.icon} 
                      alt={`${service.title} icon`}
                      className="h-16 w-16 md:h-20 md:w-20 object-contain"
                      loading="lazy"
                      width="80"
                      height="80"
                    />
                  </div>
                  <CardTitle className="text-lg md:text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-sm md:text-base mt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start text-xs md:text-sm">
                        <span className="text-accent mr-2 font-bold flex-shrink-0">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
