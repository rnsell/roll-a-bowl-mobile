import React from 'react';
import { Text } from 'react-native';
import type { TextFamilyProps } from './types';
import { useTheme } from './useTheme';
import type { TypeFamilyConfig, SizeVariant } from './theme';

export interface TextFamily {
  Small: React.ComponentType<TextFamilyProps>;
  Regular: React.ComponentType<TextFamilyProps>;
  Large: React.ComponentType<TextFamilyProps>;
  XLarge: React.ComponentType<TextFamilyProps>;
}

function createVariant(
  config: TypeFamilyConfig,
  size: SizeVariant,
  displayName: string,
): React.ComponentType<TextFamilyProps> {
  const { fontSize, lineHeight } = config.sizes[size];
  const { fontWeight } = config;

  function Variant({ children, color, textAlign, numberOfLines, style }: TextFamilyProps): React.JSX.Element | null {
    const theme = useTheme();

    if (children == null) return null;

    return React.createElement(Text, {
      style: [
        {
          fontSize,
          lineHeight,
          fontWeight,
          fontFamily: theme.fonts.body,
          color: color ?? theme.colors.text,
        },
        textAlign !== undefined && { textAlign },
        style,
      ],
      numberOfLines,
      children,
    });
  }

  Variant.displayName = displayName;
  return Variant;
}

export function createTextFamily(familyName: string, config: TypeFamilyConfig): TextFamily {
  return {
    Small: createVariant(config, 'Small', `${familyName}.Small`),
    Regular: createVariant(config, 'Regular', `${familyName}.Regular`),
    Large: createVariant(config, 'Large', `${familyName}.Large`),
    XLarge: createVariant(config, 'XLarge', `${familyName}.XLarge`),
  };
}
