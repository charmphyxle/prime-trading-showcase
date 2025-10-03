/**
 * Print & Download Controls Component
 * 
 * Provides floating action buttons for:
 * - Print optimized version (A4)
 * - Download as PDF
 * - Quick scroll to top
 */

import { Printer, Download, ArrowUp, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const PrintDownloadControls = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showMobileBar, setShowMobileBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Show/hide mobile bar and scroll-to-top button based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show scroll-to-top button when scrolled down
      setShowScrollTop(currentScrollY > 400);
      
      // Hide mobile bar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowMobileBar(false); // Scrolling down
      } else {
        setShowMobileBar(true); // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = "Prime Trading PNG Limited - Industrial Solutions";
    const text = "Check out Prime Trading PNG Limited - Your trusted partner for modular housing, jumbo bags, and heavy vehicle parts in Papua New Guinea.";

    if (platform === "native" && navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        toast.success("Shared successfully!");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          toast.error("Failed to share");
        }
      }
      return;
    }

    const shareUrls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + "\n\n" + url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
      toast.success("Opening share dialog...");
    }
  };

  return (
    <>
      {/* Floating Action Buttons - Desktop */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50 no-print">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
              title="Share"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {navigator.share && (
              <DropdownMenuItem onClick={() => handleShare("native")}>
                📱 Share via device
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => handleShare("whatsapp")}>
              💬 WhatsApp
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare("facebook")}>
              📘 Facebook
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare("twitter")}>
              🐦 Twitter
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare("linkedin")}>
              💼 LinkedIn
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare("email")}>
              ✉️ Email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-3 flex gap-2 lg:hidden z-50 no-print transition-transform duration-300 ${
          showMobileBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="flex-1"
              disabled={isGeneratingPDF}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-48 mb-2">
            {navigator.share && (
              <DropdownMenuItem onClick={() => handleShare("native")}>
                📱 Share via device
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => handleShare("whatsapp")}>
              💬 WhatsApp
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare("facebook")}>
              📘 Facebook
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare("email")}>
              ✉️ Email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
          {isGeneratingPDF ? "..." : "PDF"}
        </Button>
      </div>
    </>
  );
};
