export function cleanHtml($) {
  // Remove non-content elements
  $('script').remove();
  $('style').remove();
  $('nav').remove();
  $('header').remove();
  $('footer').remove();
  return $;
}

export function extractContent($, url) {
  const title = $('title').text().trim();
  const headings = extractHeadings($);
  const paragraphs = extractParagraphs($);

  return {
    url,
    title,
    headings,
    content: paragraphs.join('\n\n')
  };
}

function extractHeadings($) {
  return $('h1, h2, h3')
    .map((_, el) => $(el).text().trim())
    .get();
}

function extractParagraphs($) {
  return $('p')
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(text => text.length > 50);
}