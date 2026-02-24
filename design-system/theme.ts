import type { TextStyle } from 'react-native';

// ── Color Palette (11 tokens x light/dark) ──────────────────────────

export const colors = {
  light: {
    background: '#FFFFFF',
    text: '#1A1A1A',
    primary: '#2F95DC',
    secondary: '#6C757D',
    accent: '#FF6B35',
    border: '#E0E0E0',
    muted: '#F5F5F5',
    card: '#FFFFFF',
    success: '#28A745',
    error: '#DC3545',
    warning: '#FFC107',
  },
  dark: {
    background: '#000000',
    text: '#F5F5F5',
    primary: '#5BB5F0',
    secondary: '#ADB5BD',
    accent: '#FF8C5A',
    border: '#333333',
    muted: '#1A1A1A',
    card: '#1C1C1E',
    success: '#48D068',
    error: '#FF6B6B',
    warning: '#FFD54F',
  },
} as const;

export type ColorToken = keyof typeof colors.light;

// ── Font Families ───────────────────────────────────────────────────

export const fonts = {
  body: undefined as string | undefined, // system default
  mono: 'SpaceMono' as const,
} as const;

// ── Type Scale ──────────────────────────────────────────────────────

export type SizeVariant = 'Small' | 'Regular' | 'Large' | 'XLarge';

export interface TypeScaleEntry {
  fontSize: number;
  lineHeight: number;
}

export interface TypeFamilyConfig {
  fontWeight: TextStyle['fontWeight'];
  sizes: Record<SizeVariant, TypeScaleEntry>;
}

export const typeScale: Record<string, TypeFamilyConfig> = {
  Heading: {
    fontWeight: '700',
    sizes: {
      Small: { fontSize: 20, lineHeight: 28 },
      Regular: { fontSize: 24, lineHeight: 32 },
      Large: { fontSize: 30, lineHeight: 38 },
      XLarge: { fontSize: 34, lineHeight: 42 },
    },
  },
  Paragraph: {
    fontWeight: '400',
    sizes: {
      Small: { fontSize: 14, lineHeight: 20 },
      Regular: { fontSize: 16, lineHeight: 24 },
      Large: { fontSize: 18, lineHeight: 26 },
      XLarge: { fontSize: 20, lineHeight: 28 },
    },
  },
  Label: {
    fontWeight: '600',
    sizes: {
      Small: { fontSize: 12, lineHeight: 16 },
      Regular: { fontSize: 14, lineHeight: 20 },
      Large: { fontSize: 16, lineHeight: 22 },
      XLarge: { fontSize: 18, lineHeight: 24 },
    },
  },
  Caption: {
    fontWeight: '400',
    sizes: {
      Small: { fontSize: 10, lineHeight: 14 },
      Regular: { fontSize: 12, lineHeight: 16 },
      Large: { fontSize: 14, lineHeight: 20 },
      XLarge: { fontSize: 16, lineHeight: 22 },
    },
  },
} as const;
