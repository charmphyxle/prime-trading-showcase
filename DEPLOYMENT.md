# Deployment Guide - Prime Trading PNG E-Brochure

Comprehensive deployment instructions for multiple hosting platforms.

## Table of Contents
- [AWS S3 + CloudFront](#aws-s3--cloudfront)
- [GitHub Pages](#github-pages)
- [Vercel](#vercel)
- [Netlify](#netlify)
- [Testing Before Deploy](#testing-before-deploy)

---

## AWS S3 + CloudFront

### Prerequisites
- AWS Account
- AWS CLI installed and configured
- Domain name (optional, for custom domain)

### Step-by-Step Instructions

#### 1. Build Production Files
```bash
npm run build
# Creates optimized files in /dist directory
```

#### 2. Create S3 Bucket
```bash
# Replace with your bucket name
BUCKET_NAME="primetradingpng-brochure"

aws s3 mb s3://$BUCKET_NAME --region ap-southeast-2
```

#### 3. Configure Bucket Policy
Create file `bucket-policy.json`:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::primetradingpng-brochure/*"
    }
  ]
}
```

Apply policy:
```bash
aws s3api put-bucket-policy \
  --bucket $BUCKET_NAME \
  --policy file://bucket-policy.json
```

#### 4. Enable Static Website Hosting
```bash
aws s3 website s3://$BUCKET_NAME \
  --index-document index.html \
  --error-document index.html
```

#### 5. Upload Build Files
```bash
# Sync with cache headers
aws s3 sync dist/ s3://$BUCKET_NAME \
  --delete \
  --acl public-read \
  --cache-control "max-age=31536000,public" \
  --exclude "*.html" \
  --exclude "*.xml" \
  --exclude "*.txt"

# HTML files - shorter cache (1 hour)
aws s3 sync dist/ s3://$BUCKET_NAME \
  --delete \
  --acl public-read \
  --cache-control "max-age=3600,public" \
  --exclude "*" \
  --include "*.html" \
  --content-type "text/html; charset=utf-8"
```

#### 6. Create CloudFront Distribution

```bash
# Create distribution config
cat > cloudfront-config.json << EOF
{
  "CallerReference": "prime-trading-$(date +%s)",
  "Comment": "Prime Trading PNG E-Brochure",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-$BUCKET_NAME",
        "DomainName": "$BUCKET_NAME.s3-website-ap-southeast-2.amazonaws.com",
        "CustomOriginConfig": {
          "HTTPPort": 80,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "http-only"
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-$BUCKET_NAME",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"]
    },
    "Compress": true,
    "MinTTL": 0
  },
  "Enabled": true,
  "PriceClass": "PriceClass_All"
}
EOF

aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

**OR use AWS Console:**
1. Go to CloudFront → Create Distribution
2. Origin domain: Select your S3 bucket
3. Origin path: leave empty
4. Viewer protocol policy: Redirect HTTP to HTTPS
5. Compress objects: Yes
6. Default root object: `index.html`
7. Create distribution

#### 7. Setup Custom Domain (Optional)

**Request SSL Certificate (ACM):**
```bash
aws acm request-certificate \
  --domain-name primetradingpng.com \
  --subject-alternative-names www.primetradingpng.com \
  --validation-method DNS \
  --region us-east-1
```

**Add to CloudFront:**
1. Wait for certificate validation (DNS records)
2. CloudFront → Edit distribution
3. Alternate domain names: Add `primetradingpng.com`, `www.primetradingpng.com`
4. SSL certificate: Select your ACM certificate
5. Save

**Update DNS:**
```
Type: CNAME
Name: www
Value: d1234567890.cloudfront.net

Type: A (Alias)
Name: @
Value: d1234567890.cloudfront.net (CloudFront alias)
```

#### 8. Invalidate Cache After Updates

```bash
DISTRIBUTION_ID="E1234567890ABC"

aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"
```

### Update Deployment Script

Add to `package.json`:
```json
{
  "scripts": {
    "deploy:aws": "npm run build && aws s3 sync dist/ s3://primetradingpng-brochure --delete --acl public-read && aws cloudfront create-invalidation --distribution-id E1234567890ABC --paths '/*'"
  }
}
```

---

## GitHub Pages

### Step 1: Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json

```json
{
  "homepage": "https://<username>.github.io/<repo-name>/",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 3: Configure Vite Base Path

Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/<repo-name>/', // Replace with your repo name
  // ... rest of config
});
```

### Step 4: Deploy

```bash
npm run deploy
```

Your site will be live at: `https://<username>.github.io/<repo-name>/`

### Custom Domain on GitHub Pages

1. Add file `public/CNAME` with your domain:
   ```
   primetradingpng.com
   ```

2. Update DNS records:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153

   Type: CNAME
   Name: www
   Value: <username>.github.io
   ```

3. Deploy again: `npm run deploy`

---

## Vercel

### Method 1: CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Method 2: Git Integration

1. Push code to GitHub
2. Visit https://vercel.com
3. Import repository
4. Configure:
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
5. Deploy

**Environment:**
- No environment variables needed for static site

**Custom Domain:**
1. Vercel dashboard → Settings → Domains
2. Add domain: `primetradingpng.com`
3. Update DNS as instructed

---

## Netlify

### Method 1: Drag & Drop

```bash
npm run build
```

1. Visit https://app.netlify.com/drop
2. Drag `dist` folder
3. Site is live!

### Method 2: CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy to draft
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Method 3: Git Integration

1. Push code to GitHub
2. Netlify dashboard → New site from Git
3. Connect repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy

**Custom Domain:**
1. Netlify dashboard → Domain settings
2. Add custom domain
3. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5

   Type: CNAME
   Name: www
   Value: <your-site>.netlify.app
   ```

---

## Testing Before Deploy

### 1. Production Build Test

```bash
npm run build
npx serve dist
```

Visit http://localhost:3000

### 2. Print Test

1. Open in Chrome
2. Press `Ctrl+P`
3. Enable "Background graphics"
4. Save as PDF
5. Verify:
   - [ ] Navy background preserved
   - [ ] No overflow on A4
   - [ ] All content visible
   - [ ] Images load correctly

### 3. Mobile Test

```bash
# Using Chrome DevTools
# Open site → F12 → Toggle device toolbar
# Test: iPhone, iPad, Galaxy
```

### 4. Lighthouse Audit

```bash
npm run build
npx serve dist
```

Chrome DevTools → Lighthouse → Generate report

**Target scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

### 5. Contact Form Test

- [ ] Click "Request Information" button
- [ ] Email client opens
- [ ] Subject pre-filled
- [ ] Body template present
- [ ] Recipient correct

---

## Monitoring & Analytics

### Google Analytics (Optional)

Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible Analytics (Privacy-Friendly)

```html
<script defer data-domain="primetradingpng.com" src="https://plausible.io/js/script.js"></script>
```

---

## Troubleshooting

### Issue: Images not loading after deploy

**Solution:** Check image paths
```typescript
// ✅ Correct (ES6 import)
import heroImage from "@/assets/hero-image.jpg";

// ❌ Wrong (absolute path)
const heroImage = "/assets/hero-image.jpg";
```

### Issue: 404 on refresh (SPA routing)

**Solution:** Configure redirects

**Netlify** - Create `public/_redirects`:
```
/*    /index.html   200
```

**Vercel** - Create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Issue: Large bundle size

**Solution:** Analyze and optimize
```bash
npm run build
npx vite-bundle-visualizer
```

Remove unused dependencies and lazy-load components.

---

## Security Checklist

- [ ] HTTPS enabled (SSL certificate)
- [ ] Security headers configured
- [ ] No sensitive data in client code
- [ ] Environment variables properly secured
- [ ] Dependencies up to date (`npm audit`)

### CloudFront Security Headers

Add Lambda@Edge function or use CloudFront Functions:

```javascript
function handler(event) {
  var response = event.response;
  var headers = response.headers;

  headers['strict-transport-security'] = { value: 'max-age=63072000; includeSubdomains; preload'};
  headers['x-content-type-options'] = { value: 'nosniff'};
  headers['x-frame-options'] = { value: 'DENY'};
  headers['x-xss-protection'] = { value: '1; mode=block'};

  return response;
}
```

---

## Cost Estimation

### AWS S3 + CloudFront
- S3 Storage: ~$0.023/GB/month
- CloudFront: ~$0.085/GB (first 10TB)
- Total for 5GB transfer: **~$0.50/month**

### GitHub Pages
- **FREE** (up to 100GB/month bandwidth)

### Vercel
- **FREE** (Hobby plan)
- Pro: $20/month/member

### Netlify
- **FREE** (up to 100GB/month)
- Pro: $19/month/member

---

## Quick Reference Commands

```bash
# Build
npm run build

# Preview build
npx serve dist

# Deploy to AWS
npm run deploy:aws

# Deploy to GitHub Pages
npm run deploy

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod
```

---

For additional support, refer to the main [README.md](./README.md) or contact the development team.
