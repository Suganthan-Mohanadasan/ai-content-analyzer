import axios from 'axios';
import * as cheerio from 'cheerio';
import { cleanHtml, extractContent } from '../utils/htmlUtils.js';

export async function scrapeContent(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Clean HTML using utility function
    cleanHtml($);
    
    // Extract content using utility function
    return extractContent($, url);
  } catch (error) {
    console.warn(`Failed to scrape ${url}:`, error.message);
    return null;
  }
}