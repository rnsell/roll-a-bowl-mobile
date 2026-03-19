import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useLazyQuery, useQuery } from '@apollo/client/react';

import { Box, Row, Button, Label, Paragraph, Caption, Card, useTheme } from '@/design-system';
import { SearchIngredients, GetMeasurements } from '@/graphql/operations';
import type { IngredientEntry } from './types';

interface IngredientBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (entry: IngredientEntry) => void;
  existingIngredientIds: number[];
}

type SelectedIngredient = {
  id: number;
  name: string;
  categoryName: string | null;
};

export function IngredientBottomSheet({
  isOpen,
  onClose,
  onAdd,
  existingIngredientIds,
}: IngredientBottomSheetProps): React.JSX.Element {
  const { colors, fonts } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '85%'], []);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Search state
  const [searchText, setSearchText] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState<SelectedIngredient | null>(null);
  const [duplicateError, setDuplicateError] = useState(false);

  // Detail state
  const [quantity, setQuantity] = useState('');
  const [selectedMeasurementId, setSelectedMeasurementId] = useState<number | null>(null);
  const [preparationNote, setPreparationNote] = useState('');
  const [isOptional, setIsOptional] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Queries
  const [searchIngredients, { data: searchData, loading: searchLoading }] = useLazyQuery(SearchIngredients);
  const { data: measurementsData } = useQuery(GetMeasurements, {
    variables: { input: { exposedOnly: true } },
  });

  const sortedMeasurements = useMemo(() => {
    if (!measurementsData?.measurements) return [];
    return [...measurementsData.measurements].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [measurementsData]);

  const searchResults = searchData?.searchIngredients?.ingredients ?? [];

  // Reset all state
  const resetState = useCallback(() => {
    setSearchText('');
    setSelectedIngredient(null);
    setDuplicateError(false);
    setQuantity('');
    setSelectedMeasurementId(null);
    setPreparationNote('');
    setIsOptional(false);
    setValidationError(null);
  }, []);

  // Handle open/close
  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  // Debounced search
  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchText(text);
      setDuplicateError(false);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      if (text.length >= 2) {
        debounceRef.current = setTimeout(() => {
          searchIngredients({ variables: { input: { query: text } } });
        }, 300);
      }
    },
    [searchIngredients],
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleSelectIngredient = useCallback(
    (ingredient: { id: number; name: string; category: { name: string } | null }) => {
      if (existingIngredientIds.includes(ingredient.id)) {
        setDuplicateError(true);
        return;
      }

      setSelectedIngredient({
        id: ingredient.id,
        name: ingredient.name,
        categoryName: ingredient.category?.name ?? null,
      });
      setDuplicateError(false);
      bottomSheetRef.current?.snapToIndex(1);
    },
    [existingIngredientIds],
  );

  const handleAddIngredient = useCallback(() => {
    const parsedQuantity = parseFloat(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      setValidationError('Quantity must be greater than 0');
      return;
    }

    if (selectedMeasurementId === null) {
      setValidationError('Please select a measurement');
      return;
    }

    const measurement = sortedMeasurements.find((m) => m.id === selectedMeasurementId);
    if (!measurement || !selectedIngredient) return;

    onAdd({
      ingredientId: selectedIngredient.id,
      ingredientName: selectedIngredient.name,
      measurementId: selectedMeasurementId,
      measurementAbbreviation: measurement.abbreviation,
      quantity: parsedQuantity,
      isOptional,
      preparationNote: preparationNote.trim(),
    });

    resetState();
    bottomSheetRef.current?.close();
  }, [quantity, selectedMeasurementId, sortedMeasurements, selectedIngredient, isOptional, preparationNote, onAdd, resetState]);

  const handleSheetClose = useCallback(() => {
    resetState();
    onClose();
  }, [resetState, onClose]);

  const handleBack = useCallback(() => {
    setSelectedIngredient(null);
    setQuantity('');
    setSelectedMeasurementId(null);
    setPreparationNote('');
    setIsOptional(false);
    setValidationError(null);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={handleSheetClose}
      backgroundStyle={{ backgroundColor: colors.background }}
      handleIndicatorStyle={{ backgroundColor: colors.secondary }}
    >
      <BottomSheetView style={styles.content}>
        {selectedIngredient === null ? (
          // Search state
          <Box px={2.5} flex={1}>
            <Label.Large>Search Ingredients</Label.Large>

            <Box mt={1.5}>
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
                <TextInput
                  value={searchText}
                  onChangeText={handleSearchChange}
                  placeholder="Search ingredients..."
                  placeholderTextColor={colors.textLight}
                  style={[styles.searchInput, { color: colors.text, fontFamily: fonts.body }]}
                  autoFocus
                />
              </Row>
            </Box>

            {duplicateError && (
              <Box mt={1}>
                <Caption.Regular color={colors.error}>
                  This ingredient is already added
                </Caption.Regular>
              </Box>
            )}

            {searchText.length >= 2 && (
              <Box mt={2} flex={1}>
                {searchLoading ? (
                  <Box mt={2} alignItems="center">
                    <Caption.Regular color={colors.secondary}>Searching...</Caption.Regular>
                  </Box>
                ) : searchResults.length === 0 ? (
                  <Box mt={2} alignItems="center">
                    <Paragraph.Regular color={colors.secondary}>
                      No ingredients found
                    </Paragraph.Regular>
                  </Box>
                ) : (
                  <FlatList
                    data={searchResults}
                    keyExtractor={(item) => String(item.id)}
                    keyboardShouldPersistTaps="handled"
                    renderItem={({ item }) => (
                      <Pressable onPress={() => handleSelectIngredient(item)}>
                        <Row
                          py={1.5}
                          px={1}
                          alignItems="center"
                          justifyContent="space-between"
                          borderBottomWidth={1}
                          borderColor={colors.border}
                        >
                          <Box>
                            <Paragraph.Regular>{item.name}</Paragraph.Regular>
                            {item.category && (
                              <Caption.Regular color={colors.secondary}>
                                {item.category.name}
                              </Caption.Regular>
                            )}
                          </Box>
                        </Row>
                      </Pressable>
                    )}
                  />
                )}
              </Box>
            )}
          </Box>
        ) : (
          // Detail state
          <Box px={2.5} flex={1}>
            <Row alignItems="center" gap={1}>
              <Pressable onPress={handleBack}>
                <Caption.Regular color={colors.primary}>Back</Caption.Regular>
              </Pressable>
            </Row>

            <Box mt={1.5}>
              <Label.Large>{selectedIngredient.name}</Label.Large>
              {selectedIngredient.categoryName && (
                <Caption.Regular color={colors.secondary}>
                  {selectedIngredient.categoryName}
                </Caption.Regular>
              )}
            </Box>

            {/* Quantity */}
            <Box mt={2.5}>
              <Label.Regular>Quantity</Label.Regular>
              <Box mt={1}>
                <Row
                  alignItems="center"
                  backgroundColor={colors.card}
                  borderRadius={14}
                  px={2}
                  py={1.5}
                  border={1}
                  borderColor={colors.border}
                >
                  <TextInput
                    value={quantity}
                    onChangeText={(text) => {
                      setQuantity(text);
                      setValidationError(null);
                    }}
                    placeholder="0"
                    placeholderTextColor={colors.textLight}
                    keyboardType="numeric"
                    style={[styles.textInput, { color: colors.text, fontFamily: fonts.body }]}
                  />
                </Row>
              </Box>
            </Box>

            {/* Measurement */}
            <Box mt={2.5}>
              <Label.Regular>Measurement</Label.Regular>
              <Box mt={1}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <Row gap={1} flexWrap="nowrap">
                    {sortedMeasurements.map((measurement) => {
                      const isSelected = selectedMeasurementId === measurement.id;
                      return (
                        <Pressable
                          key={measurement.id}
                          onPress={() => {
                            setSelectedMeasurementId(measurement.id);
                            setValidationError(null);
                          }}
                        >
                          <Box
                            px={1.5}
                            py={1}
                            borderRadius={20}
                            border={1}
                            borderColor={isSelected ? colors.primary : colors.border}
                            backgroundColor={isSelected ? colors.primaryLight : colors.card}
                          >
                            <Caption.Regular
                              color={isSelected ? colors.primaryDark : colors.text}
                            >
                              {measurement.abbreviation}
                            </Caption.Regular>
                          </Box>
                        </Pressable>
                      );
                    })}
                  </Row>
                </ScrollView>
              </Box>
            </Box>

            {/* Preparation note */}
            <Box mt={2.5}>
              <Label.Regular>Preparation Note</Label.Regular>
              <Box mt={1}>
                <Row
                  alignItems="center"
                  backgroundColor={colors.card}
                  borderRadius={14}
                  px={2}
                  py={1.5}
                  border={1}
                  borderColor={colors.border}
                >
                  <TextInput
                    value={preparationNote}
                    onChangeText={(text) => setPreparationNote(text.slice(0, 200))}
                    placeholder="e.g., chopped, sifted"
                    placeholderTextColor={colors.textLight}
                    maxLength={200}
                    style={[styles.textInput, { color: colors.text, fontFamily: fonts.body }]}
                  />
                </Row>
              </Box>
            </Box>

            {/* Optional toggle */}
            <Box mt={2.5}>
              <Pressable onPress={() => setIsOptional((prev) => !prev)}>
                <Row alignItems="center" justifyContent="space-between" py={1}>
                  <Label.Regular>Optional</Label.Regular>
                  <Box
                    width={24}
                    height={24}
                    borderRadius={12}
                    border={2}
                    borderColor={isOptional ? colors.primary : colors.border}
                    backgroundColor={isOptional ? colors.primary : 'transparent'}
                    alignItems="center"
                    justifyContent="center"
                  >
                    {isOptional && (
                      <Box
                        width={10}
                        height={10}
                        borderRadius={5}
                        backgroundColor={colors.onPrimary}
                      />
                    )}
                  </Box>
                </Row>
              </Pressable>
            </Box>

            {/* Validation error */}
            {validationError && (
              <Box mt={1.5}>
                <Caption.Regular color={colors.error}>{validationError}</Caption.Regular>
              </Box>
            )}

            {/* Add button */}
            <Box mt={3}>
              <Button label="Add Ingredient" onPress={handleAddIngredient} />
            </Box>
          </Box>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
});
