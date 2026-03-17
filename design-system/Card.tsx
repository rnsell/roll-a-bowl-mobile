import React from 'react';
import { Text, StyleSheet } from 'react-native';
import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import { Box } from './Box';
import { useTheme } from './useTheme';

export interface CardProps {
  title?: string;
  children?: ReactNode;
  style?: ViewStyle;
}

export function Card({ title, children, style }: CardProps): React.JSX.Element {
  const { colors, fonts } = useTheme();

  const items = React.Children.toArray(children);

  return (
    <Box>
      {title != null && (
        <Text
          style={[
            styles.title,
            {
              color: colors.textLight,
              fontFamily: fonts.bodyBold,
            },
          ]}
        >
          {title.toUpperCase()}
        </Text>
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
    fontSize: 12,
    letterSpacing: 0.8,
    marginBottom: 8,
    paddingLeft: 4,
  },
});
