import React from 'react';
import { StyleSheet } from 'react-native';
import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import { Box } from './Box';
import Label from './Label';
import { useTheme } from './useTheme';

export interface CardProps {
  /**
   * Optional uppercase section label rendered above the card.
   * Displayed using Label.Small in the current theme text color.
   */
  title?: string;
  /**
   * Card content. When multiple children are provided, a horizontal
   * divider is automatically inserted between each child.
   */
  children?: ReactNode;
  /** Additional styles applied to the inner card container. */
  style?: ViewStyle;
}

/**
 * A themed container with rounded corners, a border, and card background color.
 * Supports an optional uppercase title above the card and automatically renders
 * dividers between multiple children.
 */
export function Card({ title, children, style }: CardProps): React.JSX.Element {
  const { colors } = useTheme();

  const items = React.Children.toArray(children);

  return (
    <Box>
      {title != null && (
        <Box mb={1} pl={0.5}>
          <Label.Small
            color={colors.text}
            style={styles.title}
          >
            {title.toUpperCase()}
          </Label.Small>
        </Box>
      )}
      <Box
        backgroundColor={colors.card}
        borderColor={colors.border}
        border={1}
        borderRadius={16}
        overflow="hidden"
        style={style}
      >
        {items.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {index < items.length - 1 && (
              <Box backgroundColor={colors.border} height={1} />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  title: {
    letterSpacing: 0.8,
  },
});
