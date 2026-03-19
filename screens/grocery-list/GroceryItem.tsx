import { Pressable, StyleSheet } from 'react-native';
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
    <Pressable onPress={onToggle} style={[styles.root, item.checked && styles.checked]}>
      <Row alignItems="center" gap={1.5}>
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
            <Icon name="check" size="sm" color="#FFFFFF" />
          )}
        </Box>
        <Box flex={1}>
          <Label.Regular
            color={colors.text}
            style={item.checked ? styles.strikethrough : undefined}
          >
            {item.name}
          </Label.Regular>
        </Box>
        <Caption.Regular color={colors.textLight}>{item.qty}</Caption.Regular>
      </Row>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  checked: {
    opacity: 0.55,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
});
