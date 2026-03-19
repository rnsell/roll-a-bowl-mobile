import type { MarkdownRange } from '@expensify/react-native-live-markdown';

/**
 * Simple markdown parser for live-markdown that returns ranges
 * for common markdown formatting used in recipe instructions.
 */
export function parseMarkdown(text: string): MarkdownRange[] {
  const ranges: MarkdownRange[] = [];

  // Bold: **text**
  const boldRegex = /\*\*(.+?)\*\*/g;
  let match: RegExpExecArray | null;
  while ((match = boldRegex.exec(text)) !== null) {
    // Opening **
    ranges.push({ type: 'syntax', start: match.index, length: 2 });
    // Bold content
    ranges.push({ type: 'bold', start: match.index + 2, length: match[1].length });
    // Closing **
    ranges.push({ type: 'syntax', start: match.index + 2 + match[1].length, length: 2 });
  }

  // Italic: *text* (but not **)
  const italicRegex = /(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g;
  while ((match = italicRegex.exec(text)) !== null) {
    ranges.push({ type: 'syntax', start: match.index, length: 1 });
    ranges.push({ type: 'italic', start: match.index + 1, length: match[1].length });
    ranges.push({ type: 'syntax', start: match.index + 1 + match[1].length, length: 1 });
  }

  // Strikethrough: ~~text~~
  const strikeRegex = /~~(.+?)~~/g;
  while ((match = strikeRegex.exec(text)) !== null) {
    ranges.push({ type: 'syntax', start: match.index, length: 2 });
    ranges.push({ type: 'strikethrough', start: match.index + 2, length: match[1].length });
    ranges.push({ type: 'syntax', start: match.index + 2 + match[1].length, length: 2 });
  }

  // Inline code: `text`
  const codeRegex = /`([^`]+)`/g;
  while ((match = codeRegex.exec(text)) !== null) {
    ranges.push({ type: 'syntax', start: match.index, length: 1 });
    ranges.push({ type: 'code', start: match.index + 1, length: match[1].length });
    ranges.push({ type: 'syntax', start: match.index + 1 + match[1].length, length: 1 });
  }

  // Process line-based syntax
  const lines = text.split('\n');
  let offset = 0;

  for (const line of lines) {
    // Headings: # text
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      ranges.push({ type: 'syntax', start: offset, length: headingMatch[1].length + 1 });
      ranges.push({ type: 'h1', start: offset, length: line.length });
    }

    // Blockquote: > text
    if (line.match(/^>\s/)) {
      ranges.push({ type: 'syntax', start: offset, length: 2 });
      ranges.push({ type: 'blockquote', start: offset, length: line.length, depth: 1 });
    }

    offset += line.length + 1; // +1 for \n
  }

  return ranges;
}
