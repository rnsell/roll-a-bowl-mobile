/**
 * Lightweight HTML-to-Markdown converter for React Native.
 * Handles the common elements used in recipe instructions
 * without requiring a DOM parser.
 */
export function htmlToMarkdown(html: string): string {
  let md = html;

  // Remove wrapping doc tags if present
  md = md.replace(/<\/?(!DOCTYPE|html|head|body)[^>]*>/gi, '');

  // Headings
  md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');

  // Bold and italic
  md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
  md = md.replace(/<s[^>]*>(.*?)<\/s>/gi, '~~$1~~');
  md = md.replace(/<del[^>]*>(.*?)<\/del>/gi, '~~$1~~');

  // Code
  md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '```\n$1\n```\n\n');

  // Blockquote
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_match, content: string) => {
    const lines = content.replace(/<\/?p[^>]*>/gi, '').trim().split('\n');
    return lines.map((line) => `> ${line.trim()}`).join('\n') + '\n\n';
  });

  // Ordered lists
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_match, content: string) => {
    let index = 0;
    return content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_m, item: string) => {
      index++;
      const text = item.replace(/<\/?p[^>]*>/gi, '').trim();
      return `${index}. ${text}\n`;
    }) + '\n';
  });

  // Unordered lists
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_match, content: string) => {
    return content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_m, item: string) => {
      const text = item.replace(/<\/?p[^>]*>/gi, '').trim();
      return `- ${text}\n`;
    }) + '\n';
  });

  // Horizontal rule
  md = md.replace(/<hr[^>]*\/?>/gi, '---\n\n');

  // Line breaks
  md = md.replace(/<br[^>]*\/?>/gi, '\n');

  // Paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');

  // Links
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

  // Strip remaining tags
  md = md.replace(/<[^>]+>/g, '');

  // Decode HTML entities
  md = md.replace(/&amp;/g, '&');
  md = md.replace(/&lt;/g, '<');
  md = md.replace(/&gt;/g, '>');
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");
  md = md.replace(/&nbsp;/g, ' ');

  // Clean up excess whitespace
  md = md.replace(/\n{3,}/g, '\n\n');
  md = md.trim();

  return md;
}
