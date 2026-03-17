import { Suspense } from 'react';
import { ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSuspenseQuery } from '@apollo/client/react';

import { Box, Caption, Heading, Row, SafeAreaBox, ScrollBox, useTheme } from '@/design-system';
import { GetRecipes } from '@/graphql/operations';
import { useScreenFocus } from '@/lib/navigation';
import { Screen } from '@/lib/screens';
import { RecipeCard } from './RecipeCard';

// Deterministic color palette for placeholder images
const placeholderColors = [
  '#C9956B', '#7BA06B', '#C0574B', '#D4A843', '#6B8F5E',
  '#A08660', '#8B7A6B', '#C07070', '#5C6B4A', '#B08930',
];

function pickColor(id: number): string {
  return placeholderColors[id % placeholderColors.length];
}

function RecipeList(): React.JSX.Element {
  const { colors } = useTheme();
  const { data } = useSuspenseQuery(GetRecipes);
  const recipes = data.recipes;

  return (
    <>
      <Box mt={0.5}>
        <Caption.Regular color={colors.secondary}>
          {recipes.length} recipes in your collection
        </Caption.Regular>
      </Box>

      <Box mt={2.5} gap={1.5}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            name={recipe.name}
            subtitle={`${recipe.ingredientCount} ingredients`}
            color={pickColor(recipe.id)}
          />
        ))}
      </Box>
    </>
  );
}

export function RecipesScreen(): React.JSX.Element {
  useScreenFocus(Screen.Recipes);
  const { colors, fonts } = useTheme();

  return (
    <SafeAreaBox flex={1} edges={['top']}>
      <ScrollBox contentSpacing={{ px: 2.5, pt: 0.5, pb: 4 }}>
        <Row alignItems="center" justifyContent="space-between">
          <Heading.Regular>Recipes</Heading.Regular>
          <Box
            width={38}
            height={38}
            borderRadius={12}
            backgroundColor={colors.primary}
            alignItems="center"
            justifyContent="center"
          >
            <FontAwesome name="plus" size={16} color="#FFFFFF" />
          </Box>
        </Row>

        <Box mt={2}>
          <Row
            alignItems="center"
            gap={1.5}
            backgroundColor={colors.card}
            borderRadius={14}
            px={2}
            py={1.5}
            border={1}
            borderColor={colors.border}
          >
            <FontAwesome name="search" size={16} color={colors.textLight} />
            <TextInput
              placeholder="Search recipes..."
              placeholderTextColor={colors.textLight}
              style={[styles.searchInput, { color: colors.text, fontFamily: fonts.body }]}
            />
          </Row>
        </Box>

        <Suspense fallback={
          <Box mt={4} alignItems="center">
            <ActivityIndicator size="small" />
          </Box>
        }>
          <RecipeList />
        </Suspense>
      </ScrollBox>
    </SafeAreaBox>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
});
