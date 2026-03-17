import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import Label from './Label';
import { useTheme } from './useTheme';

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'solid' | 'outline' | 'ghost';
  color?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({
  label,
  onPress,
  variant = 'solid',
  color,
  disabled = false,
  loading = false,
}: ButtonProps): React.JSX.Element {
  const { colors } = useTheme();
  const resolvedColor = color ?? colors.primary;
  const isDisabled = disabled || loading;

  const solidTextColor = '#FFFFFF';

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.base,
        variant === 'solid' && { backgroundColor: resolvedColor },
        variant === 'outline' && { borderWidth: 1, borderColor: resolvedColor },
        isDisabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'solid' ? solidTextColor : resolvedColor}
        />
      ) : (
        <Label.Regular
          color={variant === 'solid' ? solidTextColor : resolvedColor}
        >
          {label}
        </Label.Regular>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.7,
  },
});
