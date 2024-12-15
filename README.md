# AI Content Analyzer

An AI-powered tool that analyzes top-ranking content to generate comprehensive content briefs.

## Features

- Scrapes top 30 Google search results
- Analyzes content using OpenAI's GPT-4
- Identifies common topics and gaps
- Generates detailed content briefs
- Modern React frontend with Tailwind CSS

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and add your OpenAI API key:
   ```bash
   cp .env.example .env
   ```

## Running the Application

1. Start the API server:
   ```bash
   npm run start:api
   ```

2. In a new terminal, start the frontend:
   ```bash
   npm run dev
   ```

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key
- `VITE_API_URL`: API server URL (defaults to http://localhost:3000)

## License

MIT