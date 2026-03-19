import { Suspense, useCallback } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, TextInput } from 'react-native';
import { useSuspenseQuery } from '@apollo/client/react';
import { useRouter } from 'expo-router';

import { Avatar, Box, Caption, Heading, Icon, Row, SafeAreaBox, ScrollBox, useTheme } from '@/design-system';
import { GetUnifiedRecipes } from '@/graphql/operations';
import { useScreenFocus } from '@/lib/navigation';
import { Screen } from '@/lib/screens';
import { RecipeCard } from './RecipeCard';

const placeholderColors = [
  '#C9956B', '#7BA06B', '#C0574B', '#D4A843', '#6B8F5E',
  '#A08660', '#8B7A6B', '#C07070', '#5C6B4A', '#B08930',
];

function pickColor(id: number): string {
  return placeholderColors[id % placeholderColors.length];
}

function RecipeList(): React.JSX.Element {
  const { colors } = useTheme();
  const router = useRouter();
  const { data } = useSuspenseQuery(GetUnifiedRecipes);
  const recipes = data.unifiedRecipes;

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
            slug={recipe.slug}
            subtitle={`${recipe.ingredientCount} ingredients`}
            color={pickColor(recipe.id)}
            isFamilyRecipe={recipe.isFamilyRecipe}
            onPress={() => router.push(`/recipe/${recipe.slug}`)}
          />
        ))}
      </Box>
    </>
  );
}

export function RecipesScreen(): React.JSX.Element {
  useScreenFocus(Screen.Recipes);
  const { colors, fonts } = useTheme();
  const router = useRouter();

  const handleAddRecipe = useCallback(() => {
    router.push('/create-recipe');
  }, [router]);

  return (
    <SafeAreaBox flex={1} edges={['top']}>
      <ScrollBox contentSpacing={{ px: 2.5, pt: 0.5, pb: 4 }}>
        <Row alignItems="center" justifyContent="space-between">
          <Heading.Regular>Recipes</Heading.Regular>
          <Pressable onPress={handleAddRecipe}>
            <Avatar>
              <Icon name="plus" size="lg" color={colors.onPrimary} />
            </Avatar>
          </Pressable>
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
            <Icon name="search" size="lg" color={colors.textLight} />
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
