import { Suspense, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useSuspenseQuery, useMutation } from '@apollo/client/react';
import { useRouter } from 'expo-router';
import { MarkdownTextInput, parseExpensiMark } from '@expensify/react-native-live-markdown';

import { Box, Button, Paragraph, SafeAreaBox, useTheme } from '@/design-system';
import { GetRecipeDetail, UpdateRecipe, GetUnifiedRecipes } from '@/graphql/operations';
import { useScreenFocus } from '@/lib/navigation';
import { Screen } from '@/lib/screens';

interface EditRecipeInstructionsScreenProps {
  slug: string;
}

function EditRecipeInstructionsForm({ slug }: EditRecipeInstructionsScreenProps): React.JSX.Element {
  const { colors, fonts } = useTheme();
  const router = useRouter();
  const { data } = useSuspenseQuery(GetRecipeDetail, { variables: { slug } });
  const recipe = data.recipe;
  const [instructions, setInstructions] = useState(recipe?.instructions ?? '');
  const [isSaving, setIsSaving] = useState(false);

  const [updateRecipe] = useMutation(UpdateRecipe, {
    refetchQueries: [GetUnifiedRecipes, { query: GetRecipeDetail, variables: { slug } }],
  });

  if (!recipe) {
    return (
      <Box mt={4} alignItems="center">
        <Paragraph.Regular color={colors.secondary}>Recipe not found</Paragraph.Regular>
      </Box>
    );
  }

  const isDirty = instructions !== (recipe.instructions ?? '');

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateRecipe({
        variables: {
          slug,
          input: { instructions },
        },
      });
      router.replace(`/recipe/${slug}`);
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to save instructions');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box flex={1} px={2.5} pt={1.5} pb={1.5}>
      <Box
        flex={1}
        backgroundColor={colors.card}
        borderRadius={16}
        border={1}
        borderColor={colors.border}
        overflow="hidden"
      >
        <MarkdownTextInput
          value={instructions}
          onChangeText={setInstructions}
          parser={parseExpensiMark}
          multiline
          textAlignVertical="top"
          placeholder="Write your recipe instructions using markdown..."
          placeholderTextColor={colors.textLight}
          style={[
            styles.editor,
            { color: colors.text, fontFamily: fonts.body },
          ]}
          markdownStyle={{
            syntax: { color: colors.secondary },
            link: { color: colors.primary },
            h1: { fontSize: 20 },
            blockquote: {
              borderColor: colors.primary,
              borderWidth: 3,
              marginLeft: 0,
              paddingLeft: 12,
            },
            code: {
              fontFamily: fonts.mono,
              fontSize: 14,
              color: colors.text,
              backgroundColor: colors.muted,
            },
            pre: {
              fontFamily: fonts.mono,
              fontSize: 14,
              color: colors.text,
              backgroundColor: colors.muted,
            },
          }}
        />
      </Box>

      <Box mt={1.5}>
        <Button
          label="Save"
          onPress={handleSave}
          loading={isSaving}
        />
      </Box>
    </Box>
  );
}

export function EditRecipeInstructionsScreen({ slug }: EditRecipeInstructionsScreenProps): React.JSX.Element {
  useScreenFocus(Screen.EditRecipeInstructions);

  return (
    <SafeAreaBox flex={1} edges={['bottom']}>
      <Suspense fallback={
        <Box flex={1} alignItems="center" justifyContent="center">
          <ActivityIndicator size="small" />
        </Box>
      }>
        <EditRecipeInstructionsForm slug={slug} />
      </Suspense>
    </SafeAreaBox>
  );
}

const styles = StyleSheet.create({
  editor: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    padding: 16,
  },
});
