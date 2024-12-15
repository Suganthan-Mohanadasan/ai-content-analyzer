export const CONTENT_ANALYSIS_PROMPT = `Analyze the following content from {count} top-ranking articles and identify:
1. Common topics and themes
2. Content gaps compared to competitors
3. Unique angles and opportunities
4. Key statistics and data points

Content to analyze:
{content}`;

export const BRIEF_GENERATION_PROMPT = `Based on the following content analysis, create a detailed content brief that includes:
1. Recommended article structure
2. Key topics to cover
3. Unique angles to explore
4. Supporting data points to include
5. Recommended word count
6. Target audience considerations

Analysis:
{analysis}`;