# Creating a Standalone HTML Version

This guide explains how to export the e-brochure as a single, self-contained HTML file for email attachments or offline distribution.

## Why Standalone HTML?

A standalone HTML file:
- Can be attached to emails (typically 2-5MB)
- Works offline (no server required)
- Opens in any browser without installation
- Is easily shareable via file sharing services

## Method 1: Manual Export (Simplest)

### Step 1: Build the Project

```bash
npm run build
```

This creates optimized files in the `dist/` directory.

### Step 2: Inline CSS and Assets

The current build uses separate CSS files and images. To create a truly standalone file, we need to inline everything.

Install inline tool:

```bash
npm install -g inline-source-cli
```

Create a temporary HTML file `standalone.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prime Trading PNG Limited - E-Brochure</title>
  <style inline>
    /* Copy styles from dist/assets/*.css */
    /* Paste entire CSS content here */
  </style>
</head>
<body>
  <!-- Copy HTML from dist/index.html body -->
  <!-- Replace image src with base64 data URIs -->
</body>
</html>
```

### Step 3: Convert Images to Base64

Use online tool: https://www.base64-image.de/

Or command line:

```bash
# Linux/Mac
base64 -w 0 src/assets/hero-image.jpg > hero-base64.txt

# Windows
certutil -encode src\assets\hero-image.jpg hero-base64.txt
```

Replace image tags:

```html
<!-- Before -->
<img src="/assets/hero-image.jpg" alt="Hero">

<!-- After -->
<img src="data:image/jpeg;base64,/9j/4AAQSkZJRg..." alt="Hero">
```

## Method 2: Automated with Vite Plugin

### Step 1: Install Plugin

```bash
npm install --save-dev vite-plugin-singlefile
```

### Step 2: Update vite.config.ts

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'standalone' && viteSingleFile()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsInlineLimit: 100000000, // Inline all assets
    cssCodeSplit: false,
  }
}));
```

### Step 3: Build Standalone

```bash
vite build --mode standalone
```

Output: `dist/index.html` (single file)

## Method 3: HTML Bundler Tool

### Using `html-inline`

```bash
npm install -g html-inline
```

```bash
# Build first
npm run build

# Inline everything
html-inline dist/index.html > standalone.html
```

### Using `juice` (CSS Inliner)

```bash
npm install -g juice
```

```bash
juice dist/index.html standalone.html
```

## Optimizing File Size

Standalone HTML files can get large (5-10MB). Here's how to reduce size:

### 1. Compress Images

```bash
# Install imagemagick
brew install imagemagick  # Mac
sudo apt install imagemagick  # Linux

# Reduce image quality
convert hero-image.jpg -quality 75 -resize 1200x hero-optimized.jpg
```

### 2. Minify HTML/CSS

```bash
npm install -g html-minifier
```

```bash
html-minifier \
  --collapse-whitespace \
  --remove-comments \
  --minify-css true \
  --minify-js true \
  standalone.html -o standalone-min.html
```

### 3. Use WebP Images

```bash
# Convert to WebP (50-70% smaller)
cwebp -q 80 hero-image.jpg -o hero-image.webp
```

## Standalone HTML Template

Here's a complete standalone HTML template you can use:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prime Trading PNG Limited - E-Brochure</title>
  
  <style>
    /* ===================================
       DESIGN SYSTEM VARIABLES
       =================================== */
    :root {
      --primary: hsl(210, 35%, 16%);
      --accent: hsl(42, 46%, 57%);
      --background: hsl(0, 0%, 100%);
      --foreground: hsl(210, 35%, 16%);
      --muted: hsl(210, 20%, 95%);
    }

    /* ===================================
       RESET & BASE STYLES
       =================================== */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      color: var(--foreground);
      background: var(--background);
    }

    /* ===================================
       HERO SECTION
       =================================== */
    .hero {
      background: var(--primary);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
      background-image: linear-gradient(rgba(26,40,55,0.85), rgba(26,40,55,0.85)), 
                        url('data:image/jpeg;base64,...'); /* Base64 hero image */
      background-size: cover;
      background-position: center;
    }

    .hero-logo {
      max-width: 300px;
      margin: 0 auto 2rem;
    }

    .hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .hero p {
      font-size: 1.25rem;
      max-width: 600px;
      margin: 0 auto 2rem;
    }

    /* ===================================
       SECTIONS
       =================================== */
    section {
      padding: 4rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h2 {
      font-size: 2rem;
      text-align: center;
      margin-bottom: 2rem;
      color: var(--primary);
    }

    /* ===================================
       SERVICES GRID
       =================================== */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .service-card {
      border: 2px solid var(--muted);
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      transition: border-color 0.3s;
    }

    .service-card:hover {
      border-color: var(--accent);
    }

    .service-card h3 {
      color: var(--primary);
      margin: 1rem 0;
    }

    /* ===================================
       CONTACT CTA
       =================================== */
    .contact-cta {
      background: var(--primary);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
      border-radius: 8px;
      margin: 2rem auto;
    }

    .btn {
      display: inline-block;
      padding: 1rem 2rem;
      background: var(--accent);
      color: var(--primary);
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      margin-top: 1rem;
      transition: opacity 0.3s;
    }

    .btn:hover {
      opacity: 0.9;
    }

    /* ===================================
       PRINT STYLES
       =================================== */
    @media print {
      @page {
        size: A4;
        margin: 2cm;
      }

      .no-print {
        display: none !important;
      }

      body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }

      .hero, .contact-cta {
        break-inside: avoid;
      }
    }

    /* ===================================
       RESPONSIVE
       =================================== */
    @media (max-width: 768px) {
      .hero h1 {
        font-size: 1.75rem;
      }

      .services-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>

<body>
  <!-- HERO -->
  <section class="hero">
    <img 
      src="data:image/jpeg;base64,..." 
      alt="Prime Trading PNG Limited Logo" 
      class="hero-logo"
    >
    <h1>Prime Trading PNG Limited</h1>
    <p>Your trusted partner for modular housing, industrial packaging, and heavy vehicle solutions across Papua New Guinea</p>
  </section>

  <!-- ABOUT -->
  <section>
    <h2>About Prime Trading PNG Limited</h2>
    <p>Prime Trading PNG Limited is a Port Moresby-based trading company specializing in wholesale and retail distribution of modular (container) housing solutions, jumbo bags, and spare parts for heavy vehicles. We combine locally-aware service with reliable international supply chains to deliver durable products built for PNG conditions.</p>
  </section>

  <!-- SERVICES -->
  <section>
    <h2>Our Services</h2>
    <div class="services-grid">
      <div class="service-card">
        <img src="data:image/jpeg;base64,..." alt="Housing Icon" width="80">
        <h3>Modular Housing Solutions</h3>
        <p>Durable container-based accommodation units for mining camps, construction sites, and remote operations.</p>
      </div>
      
      <div class="service-card">
        <img src="data:image/jpeg;base64,..." alt="Bags Icon" width="80">
        <h3>Jumbo Bags (FIBC)</h3>
        <p>High-capacity flexible intermediate bulk containers for efficient material handling and storage.</p>
      </div>
      
      <div class="service-card">
        <img src="data:image/jpeg;base64,..." alt="Parts Icon" width="80">
        <h3>Heavy Vehicle Spare Parts</h3>
        <p>Comprehensive inventory of genuine and aftermarket parts for trucks, excavators, and heavy machinery.</p>
      </div>
    </div>
  </section>

  <!-- CONTACT CTA -->
  <section>
    <div class="contact-cta">
      <h2 style="color: white;">Get In Touch</h2>
      <p>Ready to discuss your project? Contact us today for a consultation or quotation.</p>
      <a 
        href="mailto:info@primetradingpng.com?subject=Business%20Inquiry" 
        class="btn no-print"
      >
        Send Email Inquiry
      </a>
      <p style="margin-top: 1rem; font-size: 0.9rem;">
        Email: info@primetradingpng.com<br>
        Phone: +675 XXXX XXXX<br>
        Port Moresby, Papua New Guinea
      </p>
    </div>
  </section>

  <!-- FOOTER -->
  <footer style="background: var(--primary); color: white; padding: 2rem; text-align: center;">
    <p>&copy; 2025 Prime Trading PNG Limited. All rights reserved.</p>
    <p style="font-size: 0.875rem; margin-top: 0.5rem;">
      Registered in Papua New Guinea
    </p>
  </footer>
</body>
</html>
```

## Email Attachment Best Practices

### File Size Guidelines
- **Email attachment limit**: Usually 10-25MB
- **Target file size**: Under 5MB for best compatibility
- **Mobile-friendly**: Under 2MB preferred

### Compatibility Testing

Test on:
- Gmail (web + mobile app)
- Outlook (desktop + web)
- Apple Mail
- Android email clients

### Naming Convention

```
Prime-Trading-PNG-E-Brochure-2025.html
```

Use:
- Descriptive name
- No spaces (use hyphens)
- Include year
- `.html` extension

## Distribution Checklist

Before sending:
- [ ] File size under 5MB
- [ ] Opens correctly in Chrome, Firefox, Safari
- [ ] All images display (no broken links)
- [ ] Mailto links work
- [ ] Prints correctly (Ctrl+P test)
- [ ] Mobile responsive
- [ ] No console errors

## Alternative: PDF Export

If HTML attachment issues arise, create a PDF:

### Method 1: Chrome Print to PDF

1. Open standalone.html in Chrome
2. Press `Ctrl+P`
3. Destination: Save as PDF
4. Settings:
   - Paper: A4
   - Margins: Default
   - **Background graphics: ✅ Enabled**
5. Save

Result: Professional PDF, typically 1-3MB

### Method 2: wkhtmltopdf (Command Line)

```bash
# Install
sudo apt install wkhtmltopdf  # Linux
brew install wkhtmltopdf      # Mac

# Convert
wkhtmltopdf \
  --enable-local-file-access \
  --print-media-type \
  standalone.html \
  Prime-Trading-PNG-Brochure.pdf
```

## Troubleshooting

### Issue: File size too large (>10MB)

**Solutions:**
1. Reduce image quality
2. Resize images (max 1200px width for web)
3. Convert to WebP format
4. Remove unused CSS

### Issue: Images not displaying

**Problem:** Base64 encoding incorrect

**Solution:** 
- Use online validator: https://www.base64decode.org/
- Ensure no line breaks in data URI
- Verify MIME type: `data:image/jpeg;base64,` or `data:image/png;base64,`

### Issue: Broken layout in Outlook

**Problem:** Outlook uses Word rendering engine (limited CSS support)

**Solution:**
- Use table-based layout for better compatibility
- Avoid flexbox/grid
- Use inline styles instead of style blocks
- Test with Litmus (https://www.litmus.com)

## Additional Tools

- **Purifycss**: Remove unused CSS
- **Critical**: Extract critical CSS
- **HTMLMinifier**: Reduce file size
- **ImageOptim**: Compress images
- **Squoosh**: Convert/optimize images

---

For questions about standalone HTML export, refer to main [README.md](./README.md) or [DEPLOYMENT.md](./DEPLOYMENT.md).
