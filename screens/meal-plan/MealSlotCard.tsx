import { Pressable, StyleSheet } from 'react-native';

import { Box, Card, Caption, Icon, Label, Row, useTheme } from '@/design-system';
import { MealEntryRow } from './MealEntryRow';
import type { MealEntryData } from './MealEntryRow';

export interface MealSlot {
  meal: string;
  mealType: string;
  entries: MealEntryData[];
}

interface MealSlotCardProps {
  slot: MealSlot;
  onAddMeal: (mealType: string) => void;
  onRemoveEntry: (entry: MealEntryData) => void;
  onEditAdHoc: (entry: MealEntryData, newText: string) => void;
  onClearSlot: (mealType: string) => void;
}

export function MealSlotCard({ slot, onAddMeal, onRemoveEntry, onEditAdHoc, onClearSlot }: MealSlotCardProps): React.JSX.Element {
  const { colors } = useTheme();
  const isEmpty = slot.entries.length === 0;

  return (
    <Card>
      <Row px={2} pt={1.5} pb={isEmpty ? 0 : 0.5} alignItems="center" justifyContent="space-between">
        <Caption.Small color={colors.textLight} style={styles.mealLabel}>
          {slot.meal.toUpperCase()}
        </Caption.Small>
        <Row alignItems="center" gap={1.5}>
          {!isEmpty ? (
            <Pressable onPress={() => onClearSlot(slot.mealType)}>
              <Caption.Small color={colors.error}>Clear</Caption.Small>
            </Pressable>
          ) : null}
          <Pressable onPress={() => onAddMeal(slot.mealType)}>
            <Icon name="plus" size="md" color={colors.primary} />
          </Pressable>
        </Row>
      </Row>

      {isEmpty ? (
        <Pressable onPress={() => onAddMeal(slot.mealType)}>
          <Row alignItems="center" gap={1.5} px={2} py={1.5}>
            <Box
              width={44}
              height={44}
              borderRadius={10}
              border={2}
              borderColor={colors.border}
              alignItems="center"
              justifyContent="center"
              style={styles.dashedPlaceholder}
            >
              <Icon name="plus" size="md" color={colors.textLight} />
            </Box>
            <Label.Regular color={colors.textLight}>Tap to add a meal</Label.Regular>
          </Row>
        </Pressable>
      ) : (
        <>
          {slot.entries.map((entry) => (
            <MealEntryRow
              key={entry.id}
              entry={entry}
              onRemove={() => onRemoveEntry(entry)}
              onEditAdHoc={entry.isAdHoc ? (newText) => onEditAdHoc(entry, newText) : undefined}
            />
          ))}
          <Pressable onPress={() => onAddMeal(slot.mealType)}>
            <Row px={2} py={1.5} alignItems="center" gap={1}>
              <Icon name="plus" size="sm" color={colors.primary} />
              <Label.Small color={colors.primary}>Add another</Label.Small>
            </Row>
          </Pressable>
        </>
      )}
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
