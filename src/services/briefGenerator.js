import { openai } from '../config/openai.js';
import { BRIEF_GENERATION_PROMPT } from '../utils/promptTemplates.js';

export async function generateBrief(analysis) {
  const prompt = BRIEF_GENERATION_PROMPT.replace('{analysis}', analysis);

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}