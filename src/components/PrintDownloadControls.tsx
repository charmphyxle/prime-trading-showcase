/**
 * Print & Download Controls Component
 * 
 * Provides floating action buttons for:
 * - Print optimized version (A4)
 * - Download as PDF
 * - Quick scroll to top
 */

import { Printer, Download, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";
import { useState, useEffect } from "react";

export const PrintDownloadControls = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Show scroll-to-top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePrint = () => {
    toast.info("Opening print dialog...", {
      description: "Enable 'Background graphics' for best results"
    });
    
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    toast.loading("Generating PDF...", {
      description: "This may take a few seconds",
      id: "pdf-generation"
    });

    try {
      const element = document.querySelector("main");
      
      if (!element) {
        throw new Error("Content not found");
      }

      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: "Prime-Trading-PNG-Brochure.pdf",
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true
        },
        jsPDF: { 
          unit: "mm", 
          format: "a4", 
          orientation: "portrait" as const
        },
        pagebreak: { 
          mode: ["avoid-all", "css", "legacy"],
          after: ".print-break-after"
        }
      };

      await html2pdf().set(opt).from(element).save();
      
      toast.success("PDF downloaded successfully!", {
        id: "pdf-generation"
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF", {
        description: "Please try using the print option instead",
        id: "pdf-generation"
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Floating Action Buttons - Desktop */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50 no-print">
        <Button
          onClick={handlePrint}
          size="lg"
          variant="secondary"
          className="rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          title="Print brochure"
        >
          <Printer className="h-5 w-5" />
        </Button>
        
        <Button
          onClick={handleDownloadPDF}
          size="lg"
          variant="secondary"
          className="rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          disabled={isGeneratingPDF}
          title="Download as PDF"
        >
          <Download className="h-5 w-5" />
        </Button>

        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            size="lg"
            variant="outline"
            className="rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-fade-in"
            title="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 flex gap-3 lg:hidden z-50 no-print">
        <Button
          onClick={handlePrint}
          variant="secondary"
          className="flex-1"
          disabled={isGeneratingPDF}
        >
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
        
        <Button
          onClick={handleDownloadPDF}
          variant="secondary"
          className="flex-1"
          disabled={isGeneratingPDF}
        >
          <Download className="h-4 w-4 mr-2" />
          {isGeneratingPDF ? "Generating..." : "PDF"}
        </Button>
      </div>
    </>
  );
};
