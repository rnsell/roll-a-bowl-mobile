import { Box, Button, Row, useTheme } from '@/design-system';

type RecipeTab = 'my' | 'family';

interface RecipesTabsProps {
  activeTab: RecipeTab;
  onTabChange: (tab: RecipeTab) => void;
}

export function RecipesTabs({ activeTab, onTabChange }: RecipesTabsProps): React.JSX.Element {
  const { colors } = useTheme();

  return (
    <Row
      gap={0.5}
      backgroundColor={colors.card}
      borderRadius={12}
      p={0.5}
      border={1}
      borderColor={colors.border}
    >
      <Box flex={1}>
        <Button
          label="My Recipes"
          variant={activeTab === 'my' ? 'solid' : 'ghost'}
          onPress={() => onTabChange('my')}
        />
      </Box>
      <Box flex={1}>
        <Button
          label="Family Recipes"
          variant={activeTab === 'family' ? 'solid' : 'ghost'}
          onPress={() => onTabChange('family')}
        />
      </Box>
    </Row>
  );
}

export type { RecipeTab };
