import { Pressable } from 'react-native';

import { Box, Caption, Icon, Label, Row, useTheme } from '@/design-system';

export interface GroceryItemData {
  id: number;
  name: string;
  quantity: number | null;
  measurementAbbreviation: string | null;
  isChecked: boolean;
}

interface GroceryItemProps {
  item: GroceryItemData;
  onToggle: () => void;
  onRemove: () => void;
}

export function GroceryItem({ item, onToggle, onRemove }: GroceryItemProps): React.JSX.Element {
  const { colors } = useTheme();

  const qtyLabel = item.quantity != null
    ? `${item.quantity}${item.measurementAbbreviation ? ` ${item.measurementAbbreviation}` : ''}`
    : null;

  return (
    <Pressable onPress={onToggle} style={item.isChecked ? { opacity: 0.55 } : undefined}>
      <Row alignItems="center" gap={1.5} py={1.5} px={2}>
        <Box
          width={24}
          height={24}
          borderRadius={7}
          backgroundColor={item.isChecked ? colors.success : undefined}
          borderColor={item.isChecked ? colors.success : colors.border}
          border={item.isChecked ? 0 : 2}
          alignItems="center"
          justifyContent="center"
        >
          {item.isChecked ? (
            <Icon name="check" size="sm" color={colors.onPrimary} />
          ) : null}
        </Box>
        <Box flex={1}>
          <Label.Regular
            color={colors.text}
            style={item.isChecked ? { textDecorationLine: 'line-through' } : undefined}
          >
            {item.name}
          </Label.Regular>
        </Box>
        {qtyLabel ? (
          <Caption.Regular color={colors.textLight}>{qtyLabel}</Caption.Regular>
        ) : null}
        <Pressable onPress={onRemove}>
          <Icon name="times" size="md" color={colors.error} />
        </Pressable>
      </Row>
    </Pressable>
  );
}
