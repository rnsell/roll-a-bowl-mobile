import { ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client/react';

import { Box, Caption, Paragraph, useTheme } from '@/design-system';
import { GetFamilyRecipes } from '@/graphql/operations';
import { useAppSelector } from '@/store/hooks';
import { FamilyRecipeCard } from './FamilyRecipeCard';

const placeholderColors = [
  '#C9956B', '#7BA06B', '#C0574B', '#D4A843', '#6B8F5E',
  '#A08660', '#8B7A6B', '#C07070', '#5C6B4A', '#B08930',
];

function pickColor(id: number): string {
  return placeholderColors[id % placeholderColors.length];
}

export function FamilyRecipesList(): React.JSX.Element {
  const { colors } = useTheme();
  const { data, loading, error, refetch } = useQuery(GetFamilyRecipes);
  const familyMembers = useAppSelector((state) => state.familyGroup.group?.members ?? []);

  if (loading) {
    return (
      <Box mt={4} alignItems="center">
        <ActivityIndicator size="small" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4} alignItems="center">
        <Paragraph.Regular color={colors.error}>
          Failed to load family recipes
        </Paragraph.Regular>
      </Box>
    );
  }

  const recipes = data?.familyRecipes ?? [];

  if (recipes.length === 0) {
    return (
      <Box mt={4} alignItems="center">
        <Paragraph.Regular color={colors.secondary}>
          No family recipes yet. Share a recipe from your collection!
        </Paragraph.Regular>
      </Box>
    );
  }

  function getContributorName(userId: number | null | undefined): string | undefined {
    if (!userId) return undefined;
    const member = familyMembers.find((m) => m.id === userId);
    return member ? `${member.firstName} ${member.lastName}` : undefined;
  }

  return (
    <>
      <Box mt={0.5}>
        <Caption.Regular color={colors.secondary}>
          {recipes.length} recipes in the family library
        </Caption.Regular>
      </Box>
      <Box mt={2.5} gap={1.5}>
        {recipes.map((recipe) => (
          <FamilyRecipeCard
            key={recipe.id}
            name={recipe.name}
            slug={recipe.slug}
            contributorName={getContributorName(recipe.contributedByUserId)}
            color={pickColor(recipe.id)}
            onDeleted={() => refetch()}
          />
        ))}
      </Box>
    </>
  );
}
