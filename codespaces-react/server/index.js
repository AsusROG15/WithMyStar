// server/index.js
// Simple Node.js Express server for Google Cloud Vision API integration

import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import chatRelay from './chatRelay.js';

const app = express();
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
