/**
 * FAQ Section Component
 * 
 * Frequently Asked Questions optimized for SEO and AEO
 * Helps answer engines understand our services
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "What services does Prime Trading PNG Limited provide?",
      answer: "Prime Trading PNG Limited specializes in three core services: modular container housing solutions for mining camps and construction sites, industrial jumbo bags (FIBC) for material handling and storage, and genuine heavy vehicle spare parts for trucks and excavators. All products are designed specifically for Papua New Guinea's demanding conditions."
    },
    {
      question: "Where is Prime Trading PNG Limited located?",
      answer: "We are based in Port Moresby, National Capital District, Papua New Guinea. Our postal address is PO Box 211, Port Moresby, NCD. We serve clients across all regions of Papua New Guinea, with particular focus on mining, construction, and logistics industries."
    },
    {
      question: "How can I request a product catalogue or pricing information?",
      answer: "You can request our catalogue and pricing by emailing info@prime-trading.png or calling +61 432 548 250. Our team responds to all inquiries within 24 hours. Please specify which service interests you: modular housing, jumbo bags, or heavy vehicle parts."
    },
    {
      question: "What are modular housing solutions and who needs them?",
      answer: "Modular housing solutions are container-based accommodation units that are quick to deploy and weather-resistant. They're ideal for mining companies needing workforce accommodation, construction sites requiring temporary offices, and remote operations needing durable shelter. Our units are customizable and built to withstand PNG's tropical climate."
    },
    {
      question: "What types of jumbo bags (FIBC) do you supply?",
      answer: "We supply heavy-duty flexible intermediate bulk containers (FIBC) in various sizes and load capacities. Our jumbo bags are UV-resistant and suitable for mining, agriculture, and industrial applications. They're designed for efficient material handling and storage of bulk goods in PNG's challenging environment."
    },
    {
      question: "Do you supply genuine or aftermarket heavy vehicle parts?",
      answer: "We supply both genuine and quality-assured aftermarket parts for trucks, excavators, and heavy machinery. Our inventory includes parts for major brands commonly used in PNG's mining and construction sectors. All parts come with quality guarantees to minimize vehicle downtime."
    },
    {
      question: "What makes Prime Trading PNG different from other suppliers?",
      answer: "Prime Trading PNG combines local knowledge with reliable international supply chains. Established in 2015, we understand PNG's unique terrain, climate, and logistics challenges. We provide cost-effective solutions, responsive customer service, and products specifically selected for durability in PNG conditions."
    },
    {
      question: "Can you handle bulk orders for large projects?",
      answer: "Yes, we specialize in bulk supply for large-scale projects. Whether you need multiple housing units for a mining camp, bulk quantities of jumbo bags, or ongoing spare parts supply, we have the capacity and supply chain relationships to fulfill substantial orders. Contact us to discuss volume pricing and delivery timelines."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Common questions about our services, products, and operations in Papua New Guinea
          </p>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-lg px-6 bg-card hover-lift"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center p-6 bg-card rounded-lg border">
            <p className="text-lg font-semibold mb-2">Still have questions?</p>
            <p className="text-muted-foreground mb-4">
              Our team is ready to help. Contact us for personalized assistance.
            </p>
            <a 
              href="mailto:info@prime-trading.png" 
              className="text-accent hover:text-accent/80 font-medium"
            >
              Email: info@prime-trading.png
            </a>
            <span className="mx-2 text-muted-foreground">|</span>
            <a 
              href="tel:+61432548250" 
              className="text-accent hover:text-accent/80 font-medium"
            >
              Call: +61 432 548 250
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
