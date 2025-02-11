import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    'OPENAI_API_KEY environment variable is missing. Please add it to your .env file.'
  );
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});