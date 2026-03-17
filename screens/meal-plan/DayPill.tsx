import { Pressable, StyleSheet } from 'react-native';

import { Box, Caption, Label, spacing, useTheme } from '@/design-system';

interface DayPillProps {
  day: string;
  dayNum: number;
  active: boolean;
  hasMeals: boolean;
  onPress: () => void;
}

export function DayPill({ day, dayNum, active, hasMeals, onPress }: DayPillProps): React.JSX.Element {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.root,
        active && { backgroundColor: colors.primary },
      ]}
    >
      <Caption.Small color={active ? 'rgba(255,255,255,0.7)' : colors.textLight}>
        {day}
      </Caption.Small>
      <Label.Regular color={active ? '#FFFFFF' : colors.text}>
        {dayNum}
      </Label.Regular>
      {hasMeals && !active && (
        <Box
          width={5}
          height={5}
          borderRadius={3}
          backgroundColor={colors.primaryLight}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    width: 44,
    paddingVertical: spacing(1),
    borderRadius: 14,
    gap: 4,
  },
});
