// server/index.js
// Simple Node.js Express server for Google Cloud Vision API integration

import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet'; // Import helmet
import cors from 'cors'; // Import cors
import morgan from 'morgan'; // Import morgan
import { v4 as uuidv4 } from 'uuid';
import chatRelay from './chatRelay.js';

console.log("Backend server is starting up!"); // Added for debugging

const app = express();
app.use(morgan('combined')); // Use morgan for request logging
app.use(helmet()); // Use helmet for security headers

// Configure CORS for specific origins in production
// For development, allow localhost:3000
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: '10mb' }));

// Health check endpoint for CI/CD
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'WithMyStar Backend',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Vision API placeholder
app.post('/api/vision', async (req, res) => {
  const { imageBase64 } = req.body;
  console.log("Received image data:", imageBase64 ? "present" : "missing"); // Added for debugging
  if (!imageBase64) {
    return res.status(400).json({ error: 'Missing imageBase64' });
  }
  res.json({
    id: uuidv4(),
    message: 'Vision API integration placeholder',
    imageBase64,
    labels: ['example-label-1', 'example-label-2']
  });
});

// Google Chat relay route
app.use('/api/chat', chatRelay);

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).send('Something broke!'); // Generic error message for client
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
