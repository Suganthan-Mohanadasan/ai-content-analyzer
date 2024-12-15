import puppeteer from 'puppeteer';
import { GOOGLE_SEARCH_CONFIG } from '../config/constants.js';

export async function searchGoogle(keyword) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  try {
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(keyword)}&num=${GOOGLE_SEARCH_CONFIG.resultsPerPage}`);
    
    const results = await page.evaluate((excludedDomains) => {
      const links = Array.from(document.querySelectorAll('div.g a'));
      return links
        .map(link => link.href)
        .filter(url => 
          url && 
          !excludedDomains.some(domain => url.includes(domain))
        );
    }, GOOGLE_SEARCH_CONFIG.excludedDomains);

    return [...new Set(results)].slice(0, GOOGLE_SEARCH_CONFIG.resultsPerPage);
  } finally {
    await browser.close();
  }
}