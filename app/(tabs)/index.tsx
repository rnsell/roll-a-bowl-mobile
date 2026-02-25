import { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client/react';

import { Box, Heading, Paragraph, Caption, useTheme } from '@/design-system';
import { useAuth } from '@/auth';
import { GetRecipes } from '@/graphql/operations/recipes';

export default function RecipesScreen(): React.JSX.Element {
  const { colors } = useTheme();
  const { getToken } = useAuth();
  const { data, loading, error } = useQuery(GetRecipes);

  useEffect(() => {
    getToken().then((t) => {
      console.log('[Auth] JWT:', t);
    });
  }, [getToken]);

  return (
    <Box flex={1} p={16}>
      <Heading.Regular>Recipes</Heading.Regular>

      {loading && (
        <Box flex={1} alignItems="center" justifyContent="center">
          <ActivityIndicator size="large" />
        </Box>
      )}

      {error && (
        <Box mt={12} p={12} backgroundColor={colors.muted} borderRadius={8}>
          <Paragraph.Regular color={colors.error}>
            Failed to load recipes
          </Paragraph.Regular>
          <Caption.Small color={colors.secondary}>{error.message}</Caption.Small>
        </Box>
      )}

      {data && (
        <FlatList
          data={data.recipes}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Box
              p={16}
              mb={8}
              backgroundColor={colors.card}
              borderRadius={8}
              border={1}
              borderColor={colors.border}
            >
              <Paragraph.Regular>{item.name}</Paragraph.Regular>
              <Caption.Small color={colors.secondary}>
                {item.ingredientCount} ingredient{item.ingredientCount === 1 ? '' : 's'}
              </Caption.Small>
            </Box>
          )}
          ListEmptyComponent={
            <Paragraph.Regular color={colors.secondary}>
              No recipes yet
            </Paragraph.Regular>
          }
        />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 12,
  },
});
