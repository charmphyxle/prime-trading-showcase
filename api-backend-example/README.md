# Contact API Backend (Optional)

This is an **optional** backend API that can replace the mailto: links in the e-brochure with a proper form submission endpoint.

## When to Use This

Use this backend if:
- You want form submissions stored in a database
- You need to send automated email responses
- You want better spam protection
- You prefer forms over mailto: links

The main e-brochure uses **mailto: links** by default (no backend required).

## Setup

### 1. Install Dependencies

```bash
cd api-backend-example
npm install
```

### 2. Start Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on: http://localhost:3001

### 3. Test the API

```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Interested in modular housing for a mining project",
    "services": ["housing"],
    "company": "Example Mining Corp",
    "phone": "+675 7123 4567"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Thank you for your inquiry. We will respond within 24 hours.",
  "data": {
    "submissionId": "1234567890-abc123",
    "timestamp": "2025-10-03T10:30:00.000Z"
  }
}
```

## Integration with Frontend

### Option 1: Fetch API

Replace the mailto handler in `Hero.tsx`:

```typescript
const handleContact = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        services: selectedServices
      })
    });

    const data = await response.json();
    
    if (data.success) {
      alert('Thank you! We will contact you within 24 hours.');
    } else {
      alert('Error: ' + data.error);
    }
  } catch (error) {
    console.error('Contact form error:', error);
    alert('Failed to send message. Please email us directly at info@primetradingpng.com');
  }
};
```

### Option 2: Axios

```bash
npm install axios
```

```typescript
import axios from 'axios';

const handleContact = async () => {
  try {
    const { data } = await axios.post('http://localhost:3001/api/contact', {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      services: selectedServices
    });

    if (data.success) {
      toast.success(data.message);
    }
  } catch (error) {
    toast.error('Failed to send message');
  }
};
```

## Email Integration

The server.js file includes commented examples for integrating with email services.

### SendGrid Example

```bash
npm install @sendgrid/mail
```

Add to `.env`:
```
SENDGRID_API_KEY=your_api_key_here
```

Uncomment the SendGrid code block in `server.js`.

### AWS SES Example

```bash
npm install @aws-sdk/client-ses
```

```javascript
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const sesClient = new SESClient({ region: "ap-southeast-2" });

const params = {
  Source: "noreply@primetradingpng.com",
  Destination: {
    ToAddresses: ["info@primetradingpng.com"],
  },
  Message: {
    Subject: { Data: `New Inquiry from ${sanitizedData.name}` },
    Body: {
      Text: { Data: sanitizedData.message },
    },
  },
};

await sesClient.send(new SendEmailCommand(params));
```

## Database Storage (Optional)

### PostgreSQL Example

```bash
npm install pg
```

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

await pool.query(
  `INSERT INTO contact_submissions 
   (name, email, message, services, created_at) 
   VALUES ($1, $2, $3, $4, $5)`,
  [name, email, message, services, new Date()]
);
```

### MongoDB Example

```bash
npm install mongodb
```

```javascript
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();

const db = client.db('primetrading');
await db.collection('submissions').insertOne({
  name,
  email,
  message,
  services,
  createdAt: new Date()
});
```

## Deployment

### AWS Lambda (Serverless)

```bash
npm install -g serverless
serverless deploy
```

### Google Cloud Functions

```bash
gcloud functions deploy contact-api \
  --runtime nodejs18 \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point app
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]
```

```bash
docker build -t prime-trading-api .
docker run -p 3001:3001 prime-trading-api
```

## Security Best Practices

### Environment Variables

Create `.env` file:
```
PORT=3001
NODE_ENV=production
ALLOWED_ORIGIN=https://primetradingpng.com
SENDGRID_API_KEY=your_key
DATABASE_URL=your_connection_string
```

### Rate Limiting

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many requests, please try again later'
});

app.post('/api/contact', limiter, async (req, res) => {
  // ... handler
});
```

### CORS in Production

```javascript
app.use(cors({
  origin: 'https://primetradingpng.com',
  methods: ['POST'],
  credentials: true
}));
```

## Testing

### Manual Testing

```bash
# Health check
curl http://localhost:3001/health

# Success case
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'

# Missing field (should return 400)
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test"}'

# Invalid email (should return 400)
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"invalid","message":"Test"}'
```

## Troubleshooting

### CORS Error

**Problem**: "Access-Control-Allow-Origin" error in browser

**Solution**: Add frontend URL to ALLOWED_ORIGIN environment variable

### Port Already in Use

**Problem**: "Port 3001 is already in use"

**Solution**: 
```bash
# Find process using port
lsof -i :3001

# Kill process
kill -9 <PID>

# Or use different port
PORT=3002 node server.js
```

### Email Not Sending

**Problem**: Email service returns error

**Solution**: 
1. Check API key is correct
2. Verify sender email is verified (SendGrid/SES)
3. Check service quotas/limits
4. Review logs: `console.log` statements

## Support

For questions about the API backend:
- Review main [README.md](../README.md)
- Check [DEPLOYMENT.md](../DEPLOYMENT.md) for hosting instructions
- Contact development team

---

**Note**: The main e-brochure works perfectly without this backend using mailto: links. This is only needed if you require advanced form handling.
