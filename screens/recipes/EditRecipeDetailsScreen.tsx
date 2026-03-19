import { Suspense, useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, TextInput } from 'react-native';
import { useSuspenseQuery, useMutation } from '@apollo/client/react';
import { useRouter } from 'expo-router';

import { Box, Button, Card, Icon, Label, Paragraph, Row, SafeAreaBox, ScrollBox, useTheme } from '@/design-system';
import {
  GetRecipeDetail,
  UpdateRecipe,
  AddRecipeIngredient,
  UpdateRecipeIngredient,
  RemoveRecipeIngredient,
  GetUnifiedRecipes,
} from '@/graphql/operations';
import { useScreenFocus } from '@/lib/navigation';
import { Screen } from '@/lib/screens';
import { EditableIngredientRow } from './EditableIngredientRow';
import type { IngredientRowData } from './EditableIngredientRow';

interface EditRecipeDetailsScreenProps {
  slug: string;
}

let nextTempId = -1;
function getTempId(): number {
  return nextTempId--;
}

function EditRecipeDetailsForm({ slug }: EditRecipeDetailsScreenProps): React.JSX.Element {
  const { colors, fonts } = useTheme();
  const router = useRouter();
  const { data, refetch } = useSuspenseQuery(GetRecipeDetail, { variables: { slug } });
  const recipe = data.recipe;

  const [name, setName] = useState(recipe?.name ?? '');
  const [isSaving, setIsSaving] = useState(false);

  const initialRows = useMemo<IngredientRowData[]>(() => {
    if (!recipe) return [];
    return [...recipe.ingredients]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((ing) => ({
        id: ing.id,
        ingredientId: ing.ingredient.id,
        ingredientName: ing.ingredient.name,
        measurementId: ing.measurement.id,
        measurementAbbreviation: ing.measurement.abbreviation,
        quantity: String(ing.quantity),
        isExisting: true,
      }));
  }, [recipe]);

  const [rows, setRows] = useState<(IngredientRowData & { isExisting?: boolean })[]>(initialRows);

  const [updateRecipe] = useMutation(UpdateRecipe, { refetchQueries: [GetUnifiedRecipes] });
  const [addIngredient] = useMutation(AddRecipeIngredient);
  const [updateIngredient] = useMutation(UpdateRecipeIngredient);
  const [removeIngredient] = useMutation(RemoveRecipeIngredient);

  if (!recipe) {
    return (
      <Box mt={4} alignItems="center">
        <Paragraph.Regular color={colors.secondary}>Recipe not found</Paragraph.Regular>
      </Box>
    );
  }

  const nameIsDirty = name.trim() !== recipe.name;

  const handleRowChange = useCallback((index: number, updated: IngredientRowData) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...updated, isExisting: row.isExisting } : row)));
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
        isExisting: false,
      },
    ]);
  };

  const handleSaveAndContinue = async () => {
    setIsSaving(true);
    try {
      if (nameIsDirty && name.trim().length > 0) {
        await updateRecipe({ variables: { slug, input: { name: name.trim() } } });
      }

      const existingIds = new Set(rows.filter((r) => r.isExisting).map((r) => r.id));
      const removedIngredients = initialRows.filter((r) => !existingIds.has(r.id));

      for (const removed of removedIngredients) {
        await removeIngredient({ variables: { input: { id: removed.id! } } });
      }

      for (const row of rows) {
        if (row.isExisting && row.id) {
          const original = initialRows.find((r) => r.id === row.id);
          if (!original) continue;

          const changes: Record<string, number | boolean | string> = {};
          const parsedQty = parseFloat(row.quantity);
          if (!isNaN(parsedQty) && parsedQty !== parseFloat(original.quantity)) {
            changes.quantity = parsedQty;
          }
          if (row.measurementId && row.measurementId !== original.measurementId) {
            changes.measurementId = row.measurementId;
          }

          if (Object.keys(changes).length > 0) {
            await updateIngredient({
              variables: { input: { id: row.id, ...changes } },
            });
          }
        } else if (!row.isExisting && row.ingredientId && row.measurementId && parseFloat(row.quantity) > 0) {
          await addIngredient({
            variables: {
              input: {
                recipeId: recipe.id,
                ingredientId: row.ingredientId,
                measurementId: row.measurementId,
                quantity: parseFloat(row.quantity),
              },
            },
          });
        }
      }

      await refetch();
      router.push({ pathname: '/edit-recipe-instructions', params: { slug } });
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Card title="Recipe Name">
        <Box px={2} py={1.5}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Recipe name"
            placeholderTextColor={colors.textLight}
            style={[styles.nameInput, { color: colors.text, fontFamily: fonts.body }]}
          />
        </Box>
      </Card>

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
          label="Next: Edit Instructions"
          onPress={handleSaveAndContinue}
          loading={isSaving}
        />
      </Box>
    </>
  );
}

export function EditRecipeDetailsScreen({ slug }: EditRecipeDetailsScreenProps): React.JSX.Element {
  useScreenFocus(Screen.EditRecipeDetails);

  return (
    <SafeAreaBox flex={1} edges={[]}>
      <ScrollBox contentSpacing={{ px: 2.5, pt: 1.5, pb: 4 }}>
        <Suspense fallback={
          <Box mt={4} alignItems="center">
            <ActivityIndicator size="small" />
          </Box>
        }>
          <EditRecipeDetailsForm slug={slug} />
        </Suspense>
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
