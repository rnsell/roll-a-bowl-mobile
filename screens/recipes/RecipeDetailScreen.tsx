import { Suspense, useCallback, useLayoutEffect } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { useSuspenseQuery } from '@apollo/client/react';
import { useNavigation, useRouter } from 'expo-router';

import { Box, Caption, Card, Heading, Icon, MarkdownContent, Paragraph, Row, SafeAreaBox, ScrollBox, useTheme } from '@/design-system';
import { GetRecipeDetail } from '@/graphql/operations';
import { useScreenFocus } from '@/lib/navigation';
import { Screen } from '@/lib/screens';

interface RecipeDetailScreenProps {
  slug: string;
}

function RecipeContent({ slug }: RecipeDetailScreenProps): React.JSX.Element {
  const { colors } = useTheme();
  const { data } = useSuspenseQuery(GetRecipeDetail, { variables: { slug } });
  const recipe = data.recipe;

  if (!recipe) {
    return (
      <Box mt={4} alignItems="center">
        <Paragraph.Regular color={colors.secondary}>Recipe not found</Paragraph.Regular>
      </Box>
    );
  }

  const sortedIngredients = [...recipe.ingredients].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <Row alignItems="center" gap={1}>
        <Box flex={1} flexShrink={1}>
          <Heading.Large>{recipe.name}</Heading.Large>
        </Box>
        {recipe.isFamilyRecipe ? (
          <Box
            width={26}
            height={26}
            borderRadius={13}
            backgroundColor={colors.primary}
            alignItems="center"
            justifyContent="center"
          >
            <Icon name="users" size="sm" color={colors.onPrimary} />
          </Box>
        ) : null}
      </Row>



      <Box mt={3}>
        <Card title="Ingredients">
          {sortedIngredients.length === 0 ? (
            <Box px={2} py={1.5}>
              <Paragraph.Regular color={colors.secondary}>
                No ingredients added yet
              </Paragraph.Regular>
            </Box>
          ) : (
            sortedIngredients.map((ing) => (
              <Row
                key={ing.id}
                px={2}
                py={1.5}
                alignItems="center"
                gap={1.5}
              >
                <Box
                  width={6}
                  height={6}
                  borderRadius={3}
                  backgroundColor={colors.primary}
                />
                <Box flex={1}>
                  <Paragraph.Regular>{ing.displayText}</Paragraph.Regular>
                </Box>
                {ing.isOptional ? (
                  <Caption.Small color={colors.secondary}>optional</Caption.Small>
                ) : null}
              </Row>
            ))
          )}
        </Card>
      </Box>

      {recipe.instructions ? (
        <Box mt={3}>
          <Card title="Instructions">
            <Box px={2} py={2}>
              <MarkdownContent>{recipe.instructions}</MarkdownContent>
            </Box>
          </Card>
        </Box>
      ) : null}

      {recipe.sourceUrl ? (
        <Box mt={3}>
          <Card title="Source">
            <Row px={2} py={1.5} alignItems="center" gap={1}>
              <Icon name="link" size="sm" color={colors.secondary} />
              <Caption.Regular color={colors.secondary} numberOfLines={1}>
                {recipe.sourceUrl}
              </Caption.Regular>
            </Row>
          </Card>
        </Box>
      ) : null}
    </>
  );
}

export function RecipeDetailScreen({ slug }: RecipeDetailScreenProps): React.JSX.Element {
  useScreenFocus(Screen.RecipeDetail);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const router = useRouter();

  const handleEdit = useCallback(() => {
    router.push({ pathname: '/edit-recipe', params: { slug } });
  }, [router, slug]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleEdit}>
          <Icon name="pencil" size="xl" color={colors.primary} />
        </Pressable>
      ),
    });
  }, [navigation, handleEdit, colors.primary]);

  return (
    <SafeAreaBox flex={1} edges={[]}>
      <ScrollBox contentSpacing={{ px: 2.5, pt: 1.5, pb: 4 }}>
        <Suspense fallback={
          <Box mt={4} alignItems="center">
            <ActivityIndicator size="small" />
          </Box>
        }>
          <RecipeContent slug={slug} />
        </Suspense>
      </ScrollBox>
    </SafeAreaBox>
  );
}

