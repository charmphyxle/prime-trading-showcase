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
        <meta name="keywords" content="modular housing PNG, jumbo bags Papua New Guinea, heavy vehicle parts Port Moresby, FIBC bags, container housing, mining supplies PNG" />
        <link rel="canonical" href="https://www.primetradingpng.com" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Prime Trading PNG Limited - Industrial Solutions" />
        <meta property="og:description" content="Your trusted partner for modular housing, industrial packaging, and heavy vehicle solutions across Papua New Guinea" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Prime Trading PNG Limited" />
        <meta name="twitter:description" content="Modular housing, jumbo bags, and heavy vehicle parts for PNG industries" />
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
