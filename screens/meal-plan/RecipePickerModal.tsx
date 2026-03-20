import { Suspense, useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, Pressable, TextInput } from 'react-native';
import { useSuspenseQuery } from '@apollo/client/react';

import { Box, Caption, Icon, Label, Paragraph, Row, SafeAreaBox, useTheme } from '@/design-system';
import { GetUnifiedRecipes } from '@/graphql/operations';
import { GetFamilyRecipes } from '@/graphql/operations';

type MealPlanMode = 'personal' | 'family';

interface RecipePickerModalProps {
  isOpen: boolean;
  mode: MealPlanMode;
  onSelect: (recipe: { id: number; slug: string; name: string }) => void;
  onClose: () => void;
}

function PersonalRecipeList({ searchText, onSelect }: { searchText: string; onSelect: RecipePickerModalProps['onSelect'] }): React.JSX.Element {
  const { colors } = useTheme();
  const { data } = useSuspenseQuery(GetUnifiedRecipes);

  const filtered = useMemo(() => {
    const recipes = data.unifiedRecipes;
    if (!searchText.trim()) return recipes;
    const lower = searchText.toLowerCase();
    return recipes.filter((r) => r.name.toLowerCase().includes(lower));
  }, [data.unifiedRecipes, searchText]);

  if (filtered.length === 0) {
    return (
      <Box mt={4} alignItems="center">
        <Paragraph.Regular color={colors.secondary}>
          {searchText.trim() ? 'No recipes found' : 'No recipes available'}
        </Paragraph.Regular>
      </Box>
    );
  }

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => String(item.id)}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        <Pressable onPress={() => onSelect({ id: item.id, slug: item.slug, name: item.name })}>
          <Row px={2.5} py={1.5} alignItems="center">
            <Box flex={1}>
              <Paragraph.Regular>{item.name}</Paragraph.Regular>
              <Caption.Small color={colors.secondary}>
                {item.ingredientCount} ingredients
              </Caption.Small>
            </Box>
            <Icon name="chevron-right" size="md" color={colors.textLight} />
          </Row>
        </Pressable>
      )}
      ItemSeparatorComponent={() => (
        <Box height={1} backgroundColor={colors.border} mx={2.5} />
      )}
    />
  );
}

function FamilyRecipeList({ searchText, onSelect }: { searchText: string; onSelect: RecipePickerModalProps['onSelect'] }): React.JSX.Element {
  const { colors } = useTheme();
  const { data } = useSuspenseQuery(GetFamilyRecipes);

  const filtered = useMemo(() => {
    const recipes = data.familyRecipes;
    if (!searchText.trim()) return recipes;
    const lower = searchText.toLowerCase();
    return recipes.filter((r) => r.name.toLowerCase().includes(lower));
  }, [data.familyRecipes, searchText]);

  if (filtered.length === 0) {
    return (
      <Box mt={4} alignItems="center">
        <Paragraph.Regular color={colors.secondary}>
          {searchText.trim() ? 'No recipes found' : 'No family recipes available'}
        </Paragraph.Regular>
      </Box>
    );
  }

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => String(item.id)}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        <Pressable onPress={() => onSelect({ id: item.id, slug: item.slug, name: item.name })}>
          <Row px={2.5} py={1.5} alignItems="center">
            <Box flex={1}>
              <Paragraph.Regular>{item.name}</Paragraph.Regular>
            </Box>
            <Icon name="chevron-right" size="md" color={colors.textLight} />
          </Row>
        </Pressable>
      )}
      ItemSeparatorComponent={() => (
        <Box height={1} backgroundColor={colors.border} mx={2.5} />
      )}
    />
  );
}

export function RecipePickerModal({ isOpen, mode, onSelect, onClose }: RecipePickerModalProps): React.JSX.Element {
  const { colors, fonts } = useTheme();
  const [searchText, setSearchText] = useState('');

  const handleSelect = useCallback((recipe: { id: number; slug: string; name: string }) => {
    onSelect(recipe);
    setSearchText('');
  }, [onSelect]);

  const handleClose = useCallback(() => {
    setSearchText('');
    onClose();
  }, [onClose]);

  return (
    <Modal visible={isOpen} animationType="slide" presentationStyle="pageSheet" onRequestClose={handleClose}>
      <SafeAreaBox flex={1} edges={['top', 'bottom']} backgroundColor={colors.background}>
        <Row px={2.5} py={1.5} alignItems="center" justifyContent="space-between">
          <Label.Large>Add Recipe</Label.Large>
          <Pressable onPress={handleClose}>
            <Label.Regular color={colors.primary}>Cancel</Label.Regular>
          </Pressable>
        </Row>

        <Box px={2.5} pb={1.5}>
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
            <Box flex={1}>
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search recipes..."
                placeholderTextColor={colors.textLight}
                autoFocus
                style={{ fontSize: 14, padding: 0, color: colors.text, fontFamily: fonts.body }}
              />
            </Box>
          </Row>
        </Box>

        <Suspense fallback={
          <Box mt={4} alignItems="center">
            <ActivityIndicator size="small" />
          </Box>
        }>
          {mode === 'family' ? (
            <FamilyRecipeList searchText={searchText} onSelect={handleSelect} />
          ) : (
            <PersonalRecipeList searchText={searchText} onSelect={handleSelect} />
          )}
        </Suspense>
      </SafeAreaBox>
    </Modal>
  );
}
