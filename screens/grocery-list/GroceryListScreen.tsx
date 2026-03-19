import { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Caption, Card, Heading, Icon, Label, Row, SafeAreaBox, ScrollBox, useTheme } from '@/design-system';
import { useScreenFocus } from '@/lib/navigation';
import { Screen } from '@/lib/screens';
import { ProgressBar } from './ProgressBar';
import { GroceryItem } from './GroceryItem';
import type { GroceryItemData } from './GroceryItem';

// ── Static Data ─────────────────────────────────────────────────────

interface GroceryCategory {
  category: string;
  items: GroceryItemData[];
}

const initialData: GroceryCategory[] = [
  {
    category: 'Produce',
    items: [
      { name: 'Baby spinach', qty: '6 oz', checked: true },
      { name: 'Avocados', qty: '3', checked: false },
      { name: 'Limes', qty: '4', checked: false },
      { name: 'Fresh cilantro', qty: '1 bunch', checked: true },
      { name: 'Red onion', qty: '2', checked: false },
    ],
  },
  {
    category: 'Protein',
    items: [
      { name: 'Chicken thighs', qty: '2 lbs', checked: false },
      { name: 'Salmon fillets', qty: '4 pcs', checked: false },
      { name: 'Firm tofu', qty: '1 block', checked: true },
    ],
  },
  {
    category: 'Pantry',
    items: [
      { name: 'Coconut milk', qty: '2 cans', checked: false },
      { name: 'Peanut butter', qty: '1 jar', checked: false },
      { name: 'Soy sauce', qty: '1 bottle', checked: true },
    ],
  },
];

// ── Screen ──────────────────────────────────────────────────────────

export function GroceryListScreen(): React.JSX.Element {
  useScreenFocus(Screen.GroceryList);
  const { colors } = useTheme();
  const [categories, setCategories] = useState(initialData);

  const total = categories.reduce((sum, cat) => sum + cat.items.length, 0);
  const checked = categories.reduce(
    (sum, cat) => sum + cat.items.filter((i) => i.checked).length,
    0,
  );

  const toggleItem = useCallback((catIndex: number, itemIndex: number) => {
    setCategories((prev) =>
      prev.map((cat, ci) =>
        ci === catIndex
          ? {
              ...cat,
              items: cat.items.map((item, ii) =>
                ii === itemIndex ? { ...item, checked: !item.checked } : item,
              ),
            }
          : cat,
      ),
    );
  }, []);

  return (
    <SafeAreaBox flex={1} edges={['top']}>
      <ScrollBox contentSpacing={{ px: 2.5, pt: 0.5, pb: 4 }}>
        <Row alignItems="center" justifyContent="space-between">
          <Heading.Regular>Grocery List</Heading.Regular>
          <Box
            width={38}
            height={38}
            borderRadius={12}
            backgroundColor={colors.primary}
            alignItems="center"
            justifyContent="center"
          >
            <Icon name="plus" size="lg" color="#FFFFFF" />
          </Box>
        </Row>

        <Box mt={2}>
          <ProgressBar checked={checked} total={total} />
        </Box>

        <Box mt={1.5}>
          <Row
            alignItems="center"
            gap={1}
            backgroundColor={colors.warningLight}
            borderRadius={8}
            px={1.5}
            py={0.5}
            alignSelf="flex-start"
          >
            <Icon name="calendar" size="sm" color={colors.warning} />
            <Caption.Small color={colors.warning} style={styles.badgeText}>
              From this week's meal plan
            </Caption.Small>
          </Row>
        </Box>

        <Box mt={2.5} gap={2.5}>
          {categories.map((cat, catIndex) => (
            <Box key={cat.category}>
              <Row justifyContent="space-between" alignItems="center" mb={1.5} px={0.5}>
                <Label.Small color={colors.secondary} style={styles.categoryLabel}>
                  {cat.category.toUpperCase()}
                </Label.Small>
                <Caption.Regular color={colors.textLight}>
                  {cat.items.filter((i) => i.checked).length}/{cat.items.length}
                </Caption.Regular>
              </Row>
              <Card>
                {cat.items.map((item, itemIndex) => (
                  <GroceryItem
                    key={itemIndex}
                    item={item}
                    onToggle={() => toggleItem(catIndex, itemIndex)}
                  />
                ))}
              </Card>
            </Box>
          ))}
        </Box>
      </ScrollBox>
    </SafeAreaBox>
  );
}

const styles = StyleSheet.create({
  badgeText: {
    fontWeight: '600',
  },
  categoryLabel: {
    letterSpacing: 0.8,
  },
});
