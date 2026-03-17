import type { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import Label from './Label';
import { useTheme } from './useTheme';

type AvatarSize = 'small' | 'large';

export interface AvatarProps {
  size?: AvatarSize;
  color?: string;
  foregroundColor?: string;
  initial?: string;
  children?: ReactNode;
}

const dimensions: Record<AvatarSize, { wh: number; radius: number }> = {
  small: { wh: 40, radius: 12 },
  large: { wh: 52, radius: 16 },
};

export function Avatar({
  size = 'small',
  color,
  foregroundColor,
  initial,
  children,
}: AvatarProps): React.JSX.Element {
  const { colors } = useTheme();
  const { wh, radius } = dimensions[size];
  const bg = color ?? colors.primary;
  const fg = foregroundColor ?? colors.onPrimary;

  return (
    <View
      style={[
        styles.base,
        { width: wh, height: wh, borderRadius: radius, backgroundColor: bg },
      ]}
    >
      {initial ? (
        size === 'large' ? (
          <Label.Large color={fg}>{initial}</Label.Large>
        ) : (
          <Label.Regular color={fg}>{initial}</Label.Regular>
        )
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
