import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { searchGoogle } from '../services/googleScraper.js';
import { scrapeContent } from '../services/contentScraper.js';
import { analyzeContent } from '../services/contentAnalyzer.js';
import { generateBrief } from '../services/briefGenerator.js';

// Load environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ Error: OPENAI_API_KEY environment variable is missing');
  process.exit(1);
}

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());

// Root endpoint for health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'AI Content Analyzer API is running' });
});

// Health check endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/analyze', async (req, res) => {
  try {
    const { keyword } = req.body;
    
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }

    const searchResults = await searchGoogle(keyword);
    const contents = await Promise.all(
      searchResults.map(url => scrapeContent(url))
    );
    const analysis = await analyzeContent(contents);
    const brief = await generateBrief(analysis);

    res.json({ analysis, brief });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: error.message || 'An unexpected error occurred'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✨ API server running on port ${PORT}`);
});