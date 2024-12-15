import { openai } from '../config/openai.js';
import { CONTENT_ANALYSIS_PROMPT } from '../utils/promptTemplates.js';

export async function analyzeContent(contents) {
  const validContents = contents.filter(content => content !== null);
  
  const contentString = validContents.map(content => `
URL: ${content.url}
Title: ${content.title}
Key sections: ${content.headings.join(', ')}
`).join('\n');

  const prompt = CONTENT_ANALYSIS_PROMPT
    .replace('{count}', validContents.length)
    .replace('{content}', contentString);

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}