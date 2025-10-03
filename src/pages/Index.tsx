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
        <title>Prime Trading PNG Limited - Modular Housing, Jumbo Bags & Heavy Vehicle Parts</title>
        <meta 
          name="description" 
          content="Prime Trading PNG Limited specializes in modular container housing, industrial jumbo bags (FIBC), and heavy vehicle spare parts across Papua New Guinea. Reliable supply chains for mining, construction, and logistics." 
        />
        <meta name="keywords" content="modular housing PNG, jumbo bags Papua New Guinea, heavy vehicle parts Port Moresby, FIBC bags, container housing, mining supplies PNG, industrial solutions PNG" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#1a2837" />
        <link rel="canonical" href="https://www.primetradingpng.com" />
        
        {/* Performance & Mobile Optimization */}
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.primetradingpng.com" />
        <meta property="og:title" content="Prime Trading PNG Limited - Industrial Solutions Papua New Guinea" />
        <meta property="og:description" content="Your trusted partner for modular housing, industrial packaging, and heavy vehicle solutions across Papua New Guinea. Est. 2015." />
        <meta property="og:site_name" content="Prime Trading PNG Limited" />
        <meta property="og:locale" content="en_PG" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Prime Trading PNG Limited - Industrial Solutions" />
        <meta name="twitter:description" content="Modular housing, jumbo bags (FIBC), and heavy vehicle parts for PNG industries. Quality supply chains since 2015." />
        
        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Prime Trading PNG Limited",
            "description": "Wholesale and retail distribution of modular housing solutions, jumbo bags, and heavy vehicle spare parts",
            "url": "https://www.primetradingpng.com",
            "logo": "https://www.primetradingpng.com/logo.jpg",
            "foundingDate": "2015-04-17",
            "email": "info@prime-trading.png",
            "telephone": "+61432548250",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "PO Box 211",
              "addressLocality": "Port Moresby",
              "addressRegion": "National Capital District",
              "addressCountry": "PG"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Papua New Guinea"
            },
            "knowsAbout": ["Modular Housing", "Jumbo Bags", "FIBC", "Heavy Vehicle Parts", "Industrial Supplies"]
          })}
        </script>
      </Helmet>

      <Toaster position="top-center" richColors />
      <PrintDownloadControls />

      <main className="min-h-screen">
        <Hero />
        <About />
        <Services />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Index;
