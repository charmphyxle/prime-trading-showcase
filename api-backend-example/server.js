/**
 * OPTIONAL: Backend API for Contact Form Submissions
 * 
 * This is a simple Node.js + Express server that provides
 * a /api/contact endpoint as an alternative to mailto links.
 * 
 * SETUP:
 * 1. Create a new directory: api-backend-example/
 * 2. npm init -y
 * 3. npm install express body-parser cors
 * 4. node server.js
 * 
 * TESTING:
 * curl -X POST http://localhost:3001/api/contact \
 *   -H "Content-Type: application/json" \
 *   -d '{"name":"John Doe","email":"john@example.com","message":"Test","services":["housing"]}'
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// MIDDLEWARE
// ============================================

// Enable CORS for all origins (restrict in production)
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON request bodies
app.use(bodyParser.json({ limit: '1mb' }));

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============================================
// VALIDATION HELPERS
// ============================================

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize string input (remove dangerous characters)
 */
function sanitizeString(str, maxLength = 1000) {
  if (typeof str !== 'string') return '';
  
  return str
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ''); // Remove potential HTML tags
}

// ============================================
// ROUTES
// ============================================

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Prime Trading PNG Contact API'
  });
});

/**
 * Contact form submission endpoint
 * 
 * POST /api/contact
 * Body: {
 *   name: string (required, max 100 chars)
 *   email: string (required, valid email)
 *   message: string (required, max 2000 chars)
 *   services: string[] (optional)
 *   company: string (optional, max 200 chars)
 *   phone: string (optional, max 20 chars)
 * }
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, services, company, phone } = req.body;

    // ============================================
    // VALIDATION
    // ============================================

    // Check required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        details: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          message: !message ? 'Message is required' : null
        }
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
        details: { email: 'Please provide a valid email address' }
      });
    }

    // Validate string lengths
    if (name.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Name too long (max 100 characters)'
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        error: 'Message too long (max 2000 characters)'
      });
    }

    // ============================================
    // SANITIZATION
    // ============================================

    const sanitizedData = {
      name: sanitizeString(name, 100),
      email: sanitizeString(email, 255),
      message: sanitizeString(message, 2000),
      services: Array.isArray(services) ? services.filter(s => typeof s === 'string') : [],
      company: company ? sanitizeString(company, 200) : '',
      phone: phone ? sanitizeString(phone, 20) : '',
      timestamp: new Date().toISOString(),
      ipAddress: req.ip || req.connection.remoteAddress
    };

    // ============================================
    // PROCESS SUBMISSION
    // ============================================

    console.log('Contact form submission received:', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      services: sanitizedData.services,
      timestamp: sanitizedData.timestamp
    });

    // TODO: Integrate with email service
    // Options:
    // 1. SendGrid: https://sendgrid.com
    // 2. AWS SES: https://aws.amazon.com/ses/
    // 3. Mailgun: https://www.mailgun.com
    // 4. Postmark: https://postmarkapp.com
    
    // Example with SendGrid:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    await sgMail.send({
      to: 'info@primetradingpng.com',
      from: 'noreply@primetradingpng.com',
      replyTo: sanitizedData.email,
      subject: `New Inquiry from ${sanitizedData.name}`,
      text: `
        Name: ${sanitizedData.name}
        Email: ${sanitizedData.email}
        Company: ${sanitizedData.company}
        Phone: ${sanitizedData.phone}
        Services: ${sanitizedData.services.join(', ')}
        
        Message:
        ${sanitizedData.message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Company:</strong> ${sanitizedData.company}</p>
        <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
        <p><strong>Services:</strong> ${sanitizedData.services.join(', ')}</p>
        <h3>Message:</h3>
        <p>${sanitizedData.message}</p>
      `
    });
    */

    // TODO: Save to database (optional)
    // Example with PostgreSQL:
    /*
    const { Pool } = require('pg');
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
    await pool.query(
      'INSERT INTO contact_submissions (name, email, message, services, company, phone, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        sanitizedData.name,
        sanitizedData.email,
        sanitizedData.message,
        sanitizedData.services,
        sanitizedData.company,
        sanitizedData.phone,
        sanitizedData.timestamp
      ]
    );
    */

    // ============================================
    // RESPONSE
    // ============================================

    res.status(200).json({
      success: true,
      message: 'Thank you for your inquiry. We will respond within 24 hours.',
      data: {
        submissionId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: sanitizedData.timestamp
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /health',
      'POST /api/contact'
    ]
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Prime Trading PNG - Contact API');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Status: Running`);
  console.log(`  Port: ${PORT}`);
  console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`  Health: http://localhost:${PORT}/health`);
  console.log(`  Contact: POST http://localhost:${PORT}/api/contact`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received, shutting down gracefully...');
  process.exit(0);
});
