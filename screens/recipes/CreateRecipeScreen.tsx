import { useCallback, useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation } from '@apollo/client/react';

import { Box, Button, Card, Icon, Label, Paragraph, Row, SafeAreaBox, ScrollBox, useTheme } from '@/design-system';
import { CreateRecipe, GetUnifiedRecipes } from '@/graphql/operations';
import { useScreenFocus } from '@/lib/navigation';
import { Screen } from '@/lib/screens';
import { EditableIngredientRow } from './EditableIngredientRow';
import type { IngredientRowData } from './EditableIngredientRow';

let nextTempId = -1;
function getTempId(): number {
  return nextTempId--;
}

export function CreateRecipeScreen(): React.JSX.Element {
  useScreenFocus(Screen.CreateRecipeDetails);
  const { colors, fonts } = useTheme();
  const router = useRouter();

  const [name, setName] = useState('');
  const [rows, setRows] = useState<IngredientRowData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createRecipe] = useMutation(CreateRecipe, {
    refetchQueries: [GetUnifiedRecipes],
  });

  const handleRowChange = useCallback((index: number, updated: IngredientRowData) => {
    setRows((prev) => prev.map((row, i) => (i === index ? updated : row)));
  }, []);

  const handleRemoveRow = useCallback((index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: getTempId(),
        ingredientId: null,
        ingredientName: '',
        measurementId: null,
        measurementAbbreviation: '',
        quantity: '',
      },
    ]);
  };

  const handleNext = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Recipe name is required');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const validIngredients = rows
        .filter((r) => r.ingredientId && r.measurementId && parseFloat(r.quantity) > 0)
        .map((r) => ({
          ingredientId: r.ingredientId!,
          measurementId: r.measurementId!,
          quantity: parseFloat(r.quantity),
        }));

      const result = await createRecipe({
        variables: {
          input: {
            name: trimmed,
            ingredients: validIngredients.length > 0 ? validIngredients : undefined,
          },
        },
      });

      const slug = result.data?.createRecipe?.slug;
      if (slug) {
        router.replace({ pathname: '/edit-recipe-instructions', params: { slug } });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create recipe');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaBox flex={1} edges={[]}>
      <ScrollBox contentSpacing={{ px: 2.5, pt: 1.5, pb: 4 }}>
        <Card title="Recipe Name">
          <Box px={2} py={1.5}>
            <TextInput
              value={name}
              onChangeText={(text) => { setName(text); setError(null); }}
              placeholder="Recipe name"
              placeholderTextColor={colors.textLight}
              autoFocus
              style={[styles.nameInput, { color: colors.text, fontFamily: fonts.body }]}
            />
          </Box>
        </Card>

        {error ? (
          <Box mt={1} px={0.5}>
            <Paragraph.Small color={colors.error}>{error}</Paragraph.Small>
          </Box>
        ) : null}

        <Box mt={3}>
          <Card title="Ingredients">
            {rows.length === 0 ? (
              <Box px={2} py={1.5}>
                <Paragraph.Regular color={colors.secondary}>
                  No ingredients added yet
                </Paragraph.Regular>
              </Box>
            ) : null}

            {rows.map((row, index) => (
              <EditableIngredientRow
                key={row.id}
                data={row}
                onChange={(updated) => handleRowChange(index, updated)}
                onRemove={() => handleRemoveRow(index)}
              />
            ))}

            <Pressable onPress={handleAddRow}>
              <Row px={2} py={1.5} alignItems="center" gap={1}>
                <Icon name="plus" size="sm" color={colors.primary} />
                <Label.Small color={colors.primary}>Add Ingredient</Label.Small>
              </Row>
            </Pressable>
          </Card>
        </Box>

        <Box mt={3}>
          <Button
            label="Next: Add Instructions"
            onPress={handleNext}
            loading={isSubmitting}
          />
        </Box>
      </ScrollBox>
    </SafeAreaBox>
  );
}

const styles = StyleSheet.create({
  nameInput: {
    fontSize: 16,
    padding: 0,
  },
});
