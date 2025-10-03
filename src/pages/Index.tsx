/**
 * Main E-Brochure Page - Prime Trading PNG Limited
 * 
 * Single-page professional e-brochure with:
 * - Responsive design (mobile-first)
 * - Print-optimized for A4
 * - Accessible markup
 * - mailto contact mechanism
 * 
 * TO PRINT: Chrome -> Ctrl+P -> Save as PDF
 * - Ensure "Background graphics" is enabled
 * - Paper size: A4
 * - Margins: Default
 */

import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { PrintDownloadControls } from "@/components/PrintDownloadControls";
import { Helmet } from "react-helmet";
import { Toaster } from "sonner";
import { useEffect } from "react";

const Index = () => {
  // Scroll animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.classList.add("animate-on-scroll");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>Prime Trading PNG Limited - Modular Housing, Jumbo Bags & Heavy Vehicle Parts | Papua New Guinea</title>
        <meta 
          name="description" 
          content="Prime Trading PNG Limited supplies modular container housing, industrial jumbo bags (FIBC), and heavy vehicle spare parts across Papua New Guinea. Established 2015. Serving mining, construction & logistics industries with reliable solutions." 
        />
        <meta name="keywords" content="modular housing PNG, jumbo bags Papua New Guinea, FIBC PNG, heavy vehicle parts Port Moresby, container housing PNG, mining supplies PNG, industrial solutions PNG, bulk bags PNG, truck parts PNG, excavator parts PNG" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#1a2837" />
        <meta name="author" content="Prime Trading PNG Limited" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://www.primetradingpng.com" />
        
        {/* Performance & Mobile Optimization */}
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.primetradingpng.com" />
        <meta property="og:title" content="Prime Trading PNG Limited - Industrial Solutions Papua New Guinea" />
        <meta property="og:description" content="Modular housing, jumbo bags (FIBC) & heavy vehicle parts supplier in PNG. Serving mining, construction & logistics since 2015. Port Moresby based." />
        <meta property="og:site_name" content="Prime Trading PNG Limited" />
        <meta property="og:locale" content="en_PG" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Prime Trading PNG Limited - Industrial Solutions PNG" />
        <meta name="twitter:description" content="Modular housing, jumbo bags (FIBC), and heavy vehicle parts for PNG industries. Quality supply chains since 2015." />
        
        {/* Geographic targeting */}
        <meta name="geo.region" content="PG-NCD" />
        <meta name="geo.placename" content="Port Moresby" />
        <meta name="geo.position" content="-9.4438;147.1803" />
        <meta name="ICBM" content="-9.4438, 147.1803" />
        
        {/* Structured Data for SEO & AEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Prime Trading PNG Limited",
            "alternateName": "Prime Trading PNG",
            "description": "Wholesale and retail distribution of modular housing solutions, jumbo bags (FIBC), and heavy vehicle spare parts in Papua New Guinea",
            "url": "https://www.primetradingpng.com",
            "logo": "https://www.primetradingpng.com/logo.jpg",
            "foundingDate": "2015-04-17",
            "email": "info@prime-trading.png",
            "telephone": "+61432548250",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+61432548250",
              "contactType": "customer service",
              "email": "info@prime-trading.png",
              "areaServed": "PG",
              "availableLanguage": ["en"]
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "PO Box 211",
              "addressLocality": "Port Moresby",
              "addressRegion": "National Capital District",
              "postalCode": "121",
              "addressCountry": "PG"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Papua New Guinea"
            },
            "knowsAbout": [
              "Modular Housing Solutions",
              "Container Housing",
              "Jumbo Bags",
              "FIBC Bags",
              "Flexible Intermediate Bulk Containers",
              "Heavy Vehicle Spare Parts",
              "Mining Supplies",
              "Construction Equipment",
              "Industrial Supplies",
              "Bulk Material Handling"
            ],
            "slogan": "Your trusted partner for industrial solutions across Papua New Guinea",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Industrial Solutions",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Modular Housing Solutions",
                    "description": "Durable container-based accommodation units for mining camps, construction sites, and remote operations"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Jumbo Bags (FIBC)",
                    "description": "High-capacity flexible intermediate bulk containers for efficient material handling and storage"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Heavy Vehicle Spare Parts",
                    "description": "Genuine and aftermarket parts for trucks, excavators, and heavy machinery"
                  }
                }
              ]
            }
          })}
        </script>

        {/* FAQ Schema for AEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What services does Prime Trading PNG Limited provide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Prime Trading PNG Limited specializes in three core services: modular container housing solutions for mining camps and construction sites, industrial jumbo bags (FIBC) for material handling and storage, and genuine heavy vehicle spare parts for trucks and excavators. All products are designed specifically for Papua New Guinea's demanding conditions."
                }
              },
              {
                "@type": "Question",
                "name": "Where is Prime Trading PNG Limited located?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We are based in Port Moresby, National Capital District, Papua New Guinea. Our postal address is PO Box 211, Port Moresby, NCD. We serve clients across all regions of Papua New Guinea."
                }
              },
              {
                "@type": "Question",
                "name": "How can I request a product catalogue or pricing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can request our catalogue and pricing by emailing info@prime-trading.png or calling +61 432 548 250. Our team responds to all inquiries within 24 hours."
                }
              },
              {
                "@type": "Question",
                "name": "What are modular housing solutions?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Modular housing solutions are container-based accommodation units that are quick to deploy and weather-resistant. They're ideal for mining companies needing workforce accommodation, construction sites requiring temporary offices, and remote operations."
                }
              },
              {
                "@type": "Question",
                "name": "Do you supply genuine or aftermarket heavy vehicle parts?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We supply both genuine and quality-assured aftermarket parts for trucks, excavators, and heavy machinery. All parts come with quality guarantees to minimize vehicle downtime."
                }
              }
            ]
          })}
        </script>

        {/* BreadcrumbList Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.primetradingpng.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://www.primetradingpng.com#services"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Contact",
                "item": "https://www.primetradingpng.com#contact"
              }
            ]
          })}
        </script>
      </Helmet>

      <Toaster position="top-center" richColors />
      <PrintDownloadControls />

      <main className="min-h-screen">
        <Hero />
        <About />
        <Services />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Index;
