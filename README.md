# Prime Trading PNG Limited - E-Brochure

Professional single-page e-brochure for Prime Trading PNG Limited, optimized for web, print (A4), and email distribution.

## 🎯 Project Overview

**Purpose**: Digital marketing asset showcasing modular housing, jumbo bags (FIBC), and heavy vehicle spare parts services to B2B clients across Papua New Guinea.

**Target Audience**: Procurement managers, project developers, mining/construction companies, government agencies.

**Success Criteria**: Generate qualified inquiries, easily shareable via email/PDF, print-ready on A4, mobile-optimized, communicate value within 30 seconds.

## 📋 Features

✅ **Responsive Design** - Mobile-first layout (320px to 4K)  
✅ **Print-Optimized** - A4 format with proper page breaks  
✅ **Accessible** - Semantic HTML5, ARIA labels, keyboard navigation  
✅ **Contact Mechanism** - Primary: mailto link with pre-filled template  
✅ **SEO Optimized** - Meta tags, structured data, semantic markup  
✅ **Fast Loading** - Optimized images, minimal dependencies  
✅ **Professional Design** - Navy and gold color scheme matching company branding  

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd <project-folder>

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:8080 to view the e-brochure.

## 📄 Print Instructions

### Chrome/Edge (Recommended)
1. Open the e-brochure in browser
2. Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
3. Settings:
   - **Destination**: Save as PDF
   - **Paper size**: A4
   - **Margins**: Default
   - **Background graphics**: ✅ **ENABLED** (critical for proper colors)
4. Click "Save"

### Print Quality Tips
- Ensure "Background graphics" is enabled to preserve navy background
- Use "Print to PDF" rather than physical printer for best quality
- Recommended resolution: 300 DPI for professional printing
- File size will be approximately 2-3 MB (optimized for email)

## 📧 Contact Functionality

### Primary: Mailto Link
The "Request Information" button opens the user's default email client with:
- Pre-filled recipient: info@primetradingpng.com
- Subject: "Business Inquiry - Prime Trading PNG Limited"
- Body template with checkboxes for services

**Code example:**
```typescript
const subject = encodeURIComponent("Business Inquiry - Prime Trading PNG Limited");
const body = encodeURIComponent("Dear Prime Trading PNG Team,\n\nI would like to inquire about...");
window.location.href = `mailto:info@primetradingpng.com?subject=${subject}&body=${body}`;
```

### Secondary: Optional Backend API (Advanced)

For production environments requiring form submissions without email clients:

**Create `/api/contact` endpoint (Node.js + Express):**

```bash
# Initialize Node.js project (in a separate /api folder)
npm init -y
npm install express body-parser cors
```

**File: `api/server.js`**
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Contact endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message, services } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required fields' 
    });
  }

  // Email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid email format' 
    });
  }

  // TODO: Integrate with email service (SendGrid, AWS SES, etc.)
  console.log('Contact form submission:', { name, email, message, services });

  res.json({ 
    success: true, 
    message: 'Thank you for your inquiry. We will respond within 24 hours.' 
  });
});

app.listen(PORT, () => {
  console.log(`Contact API running on http://localhost:${PORT}`);
});
```

**Test the API:**
```bash
# Start server
node api/server.js

# Test with curl
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Interested in modular housing",
    "services": ["housing"]
  }'
```

## 🌐 Deployment

### Option 1: AWS S3 + CloudFront (Recommended for Static Hosting)

**Step 1: Build for production**
```bash
npm run build
```

**Step 2: Create S3 Bucket**
```bash
aws s3 mb s3://primetradingpng-brochure
```

**Step 3: Configure bucket for static website hosting**
```bash
aws s3 website s3://primetradingpng-brochure \
  --index-document index.html \
  --error-document index.html
```

**Step 4: Upload build files**
```bash
aws s3 sync dist/ s3://primetradingpng-brochure \
  --acl public-read \
  --cache-control "max-age=31536000,public"
```

**Step 5: Set correct MIME types**
```bash
aws s3 cp s3://primetradingpng-brochure s3://primetradingpng-brochure \
  --exclude "*" --include "*.css" --include "*.js" \
  --content-type-header "text/css" \
  --metadata-directive REPLACE \
  --recursive
```

**Step 6: Create CloudFront Distribution**
1. Go to AWS CloudFront Console
2. Create distribution with S3 bucket as origin
3. Set default root object: `index.html`
4. Enable HTTPS (ACM certificate)
5. Wait for deployment (~15 minutes)

**Step 7: Invalidate cache after updates**
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

### Option 2: GitHub Pages (Free Static Hosting)

**Step 1: Build project**
```bash
npm run build
```

**Step 2: Configure GitHub Pages**
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Source: Deploy from branch → `gh-pages`

**Step 3: Deploy script**
Add to `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

```bash
npm install --save-dev gh-pages
npm run deploy
```

Your site will be live at: `https://<username>.github.io/<repo-name>/`

### Option 3: Vercel / Netlify (Zero Configuration)

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## ✅ Acceptance Criteria Checklist

### Responsiveness
- [ ] Displays correctly on mobile (320px width)
- [ ] Optimized for tablet (768px-1024px)
- [ ] Full desktop experience (1280px+)
- [ ] Touch-friendly buttons (min 44x44px)
- [ ] Readable text without zooming

### Printability
- [ ] Prints on A4 paper without overflow
- [ ] Background colors preserved
- [ ] No broken page splits (cards stay together)
- [ ] Contact buttons hidden in print mode
- [ ] Professional appearance on paper

### Accessibility
- [ ] All images have descriptive alt text
- [ ] Semantic HTML5 tags (<header>, <main>, <section>, <footer>)
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen reader friendly

### Functionality
- [ ] Contact CTA opens email client with pre-filled template
- [ ] Phone link works on mobile devices
- [ ] All internal anchor links scroll correctly
- [ ] No console errors
- [ ] Fast load time (<3 seconds)

### SEO & Meta
- [ ] Title tag optimized (<60 characters)
- [ ] Meta description present (<160 characters)
- [ ] Open Graph tags configured
- [ ] Canonical URL set
- [ ] Mobile-friendly meta viewport

## 📦 Project Structure

```
prime-trading-png-brochure/
├── src/
│   ├── assets/                  # Images and static files
│   │   ├── company-logo.jpg     # Navy & gold logo
│   │   ├── hero-image.jpg       # Industrial/container scene
│   │   ├── icon-housing.jpg     # Modular housing icon
│   │   ├── icon-bags.jpg        # Jumbo bag icon
│   │   └── icon-parts.jpg       # Vehicle parts icon
│   ├── components/              # React components
│   │   ├── Hero.tsx             # Hero section with CTA
│   │   ├── About.tsx            # Company overview
│   │   ├── Services.tsx         # Three service cards
│   │   ├── Contact.tsx          # Contact details & CTA
│   │   └── Footer.tsx           # Legal info & links
│   ├── pages/
│   │   └── Index.tsx            # Main e-brochure page
│   ├── index.css                # Design system & print styles
│   └── main.tsx                 # App entry point
├── public/                      # Static assets
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── tailwind.config.ts           # Tailwind configuration
├── vite.config.ts               # Vite build config
└── README.md                    # This file
```

## 🎨 Design System

**Color Palette:**
- **Navy Primary**: `hsl(210, 35%, 16%)` - Main brand color
- **Gold Accent**: `hsl(42, 46%, 57%)` - CTAs and highlights
- **Background**: `hsl(0, 0%, 100%)` - White
- **Muted**: `hsl(210, 20%, 95%)` - Subtle backgrounds

**Typography:**
- Headings: 24-40px, bold
- Body: 16-18px, regular
- Small text: 14px

**Spacing:**
- Sections: 64-80px vertical padding
- Cards: 32px padding
- Grid gaps: 32px

## 🖼️ Image Optimization Tips

**Current images:**
- Hero: 1920x1080px (optimized JPEG, ~150KB)
- Logo: Transparent PNG or JPEG
- Icons: 512x512px (~50KB each)

**Replace placeholders:**
1. Hero image: Actual shipping container/industrial site photo
2. Service icons: Can use free icon packs (Heroicons, Lucide)
3. Company logo: High-res version from brand guidelines

**Optimization tools:**
- TinyPNG (https://tinypng.com)
- ImageOptim
- Squoosh (https://squoosh.app)

## 🔧 Customization Guide

### Update Company Details
Edit `src/components/Contact.tsx`:
```typescript
const companyDetails = [
  { label: "Registration No.", value: "1-12345" }, // Update here
  { label: "TIN", value: "123456789" },           // Update here
  { label: "Mobile", value: "+675 7XXX XXXX" },   // Update here
  // ... etc
];
```

### Update Email Address
Search and replace `info@primetradingpng.com` with your actual email.

### Modify Color Scheme
Edit `src/index.css`:
```css
:root {
  --primary: 210 35% 16%;    /* Navy */
  --accent: 42 46% 57%;      /* Gold */
}
```

## 🐛 Testing

### Browser Testing Checklist
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (desktop + iOS)
- [ ] Edge (latest)

### Device Testing
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad (Safari)
- [ ] Desktop (1920x1080)

### Performance
```bash
# Run Lighthouse audit
npm run build
npx serve dist
# Open Chrome DevTools → Lighthouse → Run audit
```

**Target scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

## 📄 Exporting Standalone HTML

To create a single HTML file for email attachment:

**Option 1: Manual Export**
1. Build the project: `npm run build`
2. Open `dist/index.html` in browser
3. View source (Ctrl+U)
4. Copy entire HTML
5. Extract inline CSS from `<style>` tags in head

**Option 2: Use Inline Tool**
```bash
npm install -g juice
juice dist/index.html > standalone.html
```

## 📞 Support

For technical issues or customization requests:
- **Email**: dev@primetradingpng.com
- **Documentation**: This README
- **Framework**: React + Vite + TailwindCSS

## 📜 License

© 2025 Prime Trading PNG Limited. All rights reserved.

---

**Distribution Checklist:**
- [ ] Print to PDF (A4, 300 DPI)
- [ ] Test email attachment (<5MB)
- [ ] Verify mailto links work
- [ ] Check mobile responsiveness
- [ ] Review all company details are correct
- [ ] Confirm contact email is active
