import { searchGoogle } from './services/googleScraper.js';
import { scrapeContent } from './services/contentScraper.js';
import { analyzeContent } from './services/contentAnalyzer.js';
import { generateBrief } from './services/briefGenerator.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['OPENAI_API_KEY'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingEnvVars.forEach(varName => {
    console.error(`   - ${varName}`);
  });
  console.error('\nPlease add them to your .env file.');
  process.exit(1);
}

async function main() {
  try {
    const keyword = process.argv[2];
    if (!keyword) {
      console.error('❌ Please provide a keyword to analyze');
      console.error('Usage: npm start "your search term"');
      process.exit(1);
    }

    console.log(`🔍 Searching for top 30 results for "${keyword}"...`);
    const searchResults = await searchGoogle(keyword);

    console.log('📥 Scraping content from found URLs...');
    const contents = await Promise.all(
      searchResults.map(url => scrapeContent(url))
    );

    console.log('🧠 Analyzing content...');
    const analysis = await analyzeContent(contents);

    console.log('📝 Generating content brief...');
    const brief = await generateBrief(analysis);

    console.log('\n📊 Content Brief:');
    console.log(brief);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();