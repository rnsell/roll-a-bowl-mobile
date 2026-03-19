import { Pressable } from 'react-native';

import { Box, Caption, Label, useTheme } from '@/design-system';

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
    <Pressable onPress={onPress}>
      <Box
        alignItems="center"
        width={44}
        py={1}
        borderRadius={14}
        gap={0.5}
        backgroundColor={active ? colors.primary : undefined}
      >
        <Caption.Small color={active ? colors.onPrimary : colors.textLight} style={{ opacity: active ? 0.7 : 1 }}>
          {day}
        </Caption.Small>
        <Label.Regular color={active ? colors.onPrimary : colors.text}>
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
      </Box>
    </Pressable>
  );
}
