import { Pressable, StyleSheet } from 'react-native';
import { Row, Box, Icon, Label, Caption, useTheme } from '@/design-system';
import type { IngredientEntry } from './types';

export interface IngredientRowProps {
  entry: IngredientEntry;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggleOptional: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function IngredientRow({
  entry,
  onRemove,
  onMoveUp,
  onMoveDown,
  onToggleOptional,
  isFirst,
  isLast,
}: IngredientRowProps): React.JSX.Element {
  const { colors } = useTheme();

  const detail = [
    `${entry.quantity} ${entry.measurementAbbreviation}`,
    entry.preparationNote ? entry.preparationNote : undefined,
    entry.isOptional ? '(optional)' : undefined,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <Row alignItems="center" justifyContent="space-between" py={1} px={2}>
      <Box flex={1} flexShrink={1}>
        <Pressable onPress={onToggleOptional}>
          <Label.Regular>{entry.ingredientName}</Label.Regular>
          <Caption.Regular color={colors.secondary}>{detail}</Caption.Regular>
        </Pressable>
      </Box>

      <Row alignItems="center" gap={1}>
        <Pressable
          onPress={onMoveUp}
          disabled={isFirst}
          style={[styles.iconButton, isFirst && styles.disabled]}
        >
          <Icon name="chevron-up" size="md" color={colors.text} />
        </Pressable>

        <Pressable
          onPress={onMoveDown}
          disabled={isLast}
          style={[styles.iconButton, isLast && styles.disabled]}
        >
          <Icon name="chevron-down" size="md" color={colors.text} />
        </Pressable>

        <Pressable onPress={onRemove} style={styles.iconButton}>
          <Icon name="times" size="lg" color={colors.error} />
        </Pressable>
      </Row>
    </Row>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.3,
  },
});
