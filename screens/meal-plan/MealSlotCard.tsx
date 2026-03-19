import { StyleSheet } from 'react-native';
import { Box, Card, Caption, Icon, Label, Row, useTheme } from '@/design-system';

export interface MealSlot {
  meal: string;
  name: string | null;
  color?: string;
}

export function MealSlotCard({ slot }: { slot: MealSlot }): React.JSX.Element {
  const { colors } = useTheme();
  const isEmpty = slot.name == null;

  return (
    <Card>
      <Row alignItems="center" gap={1.5} p={2}>
        {isEmpty ? (
          <Box
            width={56}
            height={56}
            borderRadius={12}
            border={2}
            borderColor={colors.border}
            alignItems="center"
            justifyContent="center"
            style={styles.dashedPlaceholder}
          >
            <Icon name="plus" size="lg" color={colors.textLight} />
          </Box>
        ) : (
          <Box
            width={56}
            height={56}
            borderRadius={12}
            backgroundColor={slot.color}
          />
        )}
        <Box flex={1}>
          <Caption.Small
            color={colors.textLight}
            style={styles.mealLabel}
          >
            {slot.meal.toUpperCase()}
          </Caption.Small>
          <Box mt={0.5}>
            <Label.Regular color={isEmpty ? colors.textLight : colors.text}>
              {isEmpty ? 'Tap to add a meal' : slot.name}
            </Label.Regular>
          </Box>
        </Box>
        <Icon name="chevron-right" size="md" color={colors.textLight} />
      </Row>
    </Card>
  );
}

const styles = StyleSheet.create({
  dashedPlaceholder: {
    borderStyle: 'dashed',
  },
  mealLabel: {
    letterSpacing: 0.5,
  },
});
