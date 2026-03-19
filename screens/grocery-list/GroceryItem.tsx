import { Pressable } from 'react-native';
import { Box, Icon, Label, Caption, Row, useTheme } from '@/design-system';

export interface GroceryItemData {
  name: string;
  qty: string;
  checked: boolean;
}

interface GroceryItemProps {
  item: GroceryItemData;
  onToggle: () => void;
}

export function GroceryItem({ item, onToggle }: GroceryItemProps): React.JSX.Element {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onToggle} style={item.checked ? { opacity: 0.55 } : undefined}>
      <Row alignItems="center" gap={1.5} py={1.5} px={2}>
        <Box
          width={24}
          height={24}
          borderRadius={7}
          backgroundColor={item.checked ? colors.success : undefined}
          borderColor={item.checked ? colors.success : colors.border}
          border={item.checked ? 0 : 2}
          alignItems="center"
          justifyContent="center"
        >
          {item.checked && (
            <Icon name="check" size="sm" color={colors.onPrimary} />
          )}
        </Box>
        <Box flex={1}>
          <Label.Regular
            color={colors.text}
            style={item.checked ? { textDecorationLine: 'line-through' } : undefined}
          >
            {item.name}
          </Label.Regular>
        </Box>
        <Caption.Regular color={colors.textLight}>{item.qty}</Caption.Regular>
      </Row>
    </Pressable>
  );
}
