import type { TextStyle } from 'react-native';

// ── Spacing ─────────────────────────────────────────────────────────

export const SPACING_UNIT = 8;

export function spacing(units: number): number {
  return units * SPACING_UNIT;
}

// ── Color Palette ────────────────────────────────────────────────────

export const colors = {
  light: {
    background: '#F5EDE4',
    text: '#3B2A1A',
    primary: '#8B5E3C',
    secondary: '#907A68',
    accent: '#D4A843',
    border: '#E0D5C8',
    muted: '#EDE3D8',
    card: '#FFFCF8',
    success: '#6B8F5E',
    error: '#C0574B',
    warning: '#D4A843',
    textLight: '#B8A594',
    primaryLight: '#C9A882',
    primaryDark: '#5C3D28',
    successLight: '#E4EDDF',
    errorLight: '#F3DDD9',
    warningLight: '#F8EFDA',
    onPrimary: '#FFFFFF',
  },
  dark: {
    background: '#1A1410',
    text: '#F0E6DA',
    primary: '#C9A882',
    secondary: '#8A7968',
    accent: '#D4A843',
    border: '#3A3028',
    muted: '#2A221A',
    card: '#24201A',
    success: '#7FA872',
    error: '#D46B5F',
    warning: '#D4A843',
    textLight: '#6B5D50',
    primaryLight: '#5C4A38',
    primaryDark: '#E8D8C4',
    successLight: '#2A3526',
    errorLight: '#3A2220',
    warningLight: '#352E1E',
    onPrimary: '#1A1410',
  },
} as const;

export type ColorToken = keyof typeof colors.light;

// ── Font Families ───────────────────────────────────────────────────

export const fonts = {
  heading: 'Newsreader_700Bold' as const,
  body: 'DMSans_400Regular' as const,
  bodyMedium: 'DMSans_500Medium' as const,
  bodySemiBold: 'DMSans_600SemiBold' as const,
  bodyBold: 'DMSans_700Bold' as const,
  mono: 'SpaceMono' as const,
} as const;

// ── Type Scale ──────────────────────────────────────────────────────

export type SizeVariant = 'Small' | 'Regular' | 'Large' | 'XLarge';

export interface TypeScaleEntry {
  fontSize: number;
  lineHeight: number;
}

export interface TypeFamilyConfig {
  fontFamily?: string;
  fontWeight: TextStyle['fontWeight'];
  sizes: Record<SizeVariant, TypeScaleEntry>;
}

export const typeScale: Record<string, TypeFamilyConfig> = {
  Heading: {
    fontFamily: 'Newsreader_700Bold',
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
