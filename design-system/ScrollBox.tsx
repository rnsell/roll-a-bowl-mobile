import { ScrollView } from 'react-native';
import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type { SpacingProps } from './types';
import { resolveSpacingStyle } from './types';
import { useTheme } from './useTheme';

export interface ScrollBoxProps extends SpacingProps {
  children?: ReactNode;
  backgroundColor?: string;
  contentSpacing?: SpacingProps;
  style?: ViewStyle;
}

export function ScrollBox({
  children,
  backgroundColor,
  contentSpacing,
  style,
  ...spacingRest
}: ScrollBoxProps): React.JSX.Element {
  const { colors } = useTheme();
  const outerStyle = resolveSpacingStyle(spacingRest);
  const contentStyle = contentSpacing ? resolveSpacingStyle(contentSpacing) : undefined;

  return (
    <ScrollView
      style={[
        { flex: 1, backgroundColor: backgroundColor ?? colors.background },
        outerStyle,
        style,
      ]}
      contentContainerStyle={contentStyle}
    >
      {children}
    </ScrollView>
  );
}
