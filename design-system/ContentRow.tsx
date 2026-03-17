import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import type { ReactNode } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Box } from './Box';
import { Row } from './Row';
import Label from './Label';
import Caption from './Caption';
import { useTheme } from './useTheme';

export interface ContentRowProps {
  label: string;
  subtitle?: string;
  left?: ReactNode;
  right?: ReactNode;
  showChevron?: boolean;
  onPress?: () => void;
  size?: 'default' | 'large';
}

export function ContentRow({
  label,
  subtitle,
  left,
  right,
  showChevron = true,
  onPress,
  size = 'default',
}: ContentRowProps): React.JSX.Element {
  const { colors } = useTheme();

  const placeholderSize = size === 'large' ? 52 : 36;
  const placeholderRadius = size === 'large' ? 16 : 10;

  const leftElement = left ?? (
    <Box
      width={placeholderSize}
      height={placeholderSize}
      borderRadius={placeholderRadius}
      backgroundColor={colors.muted}
    />
  );

  const rightElement =
    right ??
    (showChevron ? (
      <FontAwesome name="chevron-right" size={14} color={colors.textLight} />
    ) : null);

  return (
    <Pressable
      onPress={onPress}
      disabled={onPress == null}
      style={styles.root}
    >
      <Row alignItems="center" gap={1.5} flex={1}>
        {leftElement}
        <Box flex={1}>
          <Label.Regular>{label}</Label.Regular>
          {subtitle != null && (
            <Caption.Regular color={colors.textLight}>{subtitle}</Caption.Regular>
          )}
        </Box>
        {rightElement != null && (
          <Box justifyContent="center">{rightElement}</Box>
        )}
      </Row>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
