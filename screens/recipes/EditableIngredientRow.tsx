import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput } from 'react-native';
import { useLazyQuery } from '@apollo/client/react';

import { Box, Caption, Icon, Label, Paragraph, Row, useTheme } from '@/design-system';
import { SearchIngredients } from '@/graphql/operations';
import { MeasurementPicker } from './MeasurementPicker';

export interface IngredientRowData {
  id?: number;
  ingredientId: number | null;
  ingredientName: string;
  measurementId: number | null;
  measurementAbbreviation: string;
  quantity: string;
}

interface EditableIngredientRowProps {
  data: IngredientRowData;
  onChange: (data: IngredientRowData) => void;
  onRemove: () => void;
}

export function EditableIngredientRow({ data, onChange, onRemove }: EditableIngredientRowProps): React.JSX.Element {
  const { colors, fonts } = useTheme();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [searchText, setSearchText] = useState(data.ingredientName);
  const [showResults, setShowResults] = useState(false);
  const [showMeasurementPicker, setShowMeasurementPicker] = useState(false);

  const [searchIngredients, { data: searchData, loading: searchLoading }] = useLazyQuery(SearchIngredients);

  const searchResults = searchData?.searchIngredients?.ingredients ?? [];

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchText(text);
      setShowResults(true);
      onChange({ ...data, ingredientId: null, ingredientName: text });

      if (debounceRef.current) clearTimeout(debounceRef.current);

      if (text.length >= 2) {
        debounceRef.current = setTimeout(() => {
          searchIngredients({ variables: { input: { query: text } } });
        }, 300);
      }
    },
    [data, onChange, searchIngredients],
  );

  const handleSelectIngredient = useCallback(
    (ingredient: { id: number; name: string }) => {
      setSearchText(ingredient.name);
      setShowResults(false);
      onChange({ ...data, ingredientId: ingredient.id, ingredientName: ingredient.name });
    },
    [data, onChange],
  );

  const handleSelectMeasurement = useCallback(
    (measurementId: number, abbreviation: string) => {
      onChange({ ...data, measurementId, measurementAbbreviation: abbreviation });
    },
    [data, onChange],
  );

  const handleQuantityChange = useCallback(
    (text: string) => {
      onChange({ ...data, quantity: text });
    },
    [data, onChange],
  );

  return (
    <Box py={1.5} px={2}>
      {/* Row 1: Quantity + Measurement + Remove */}
      <Row alignItems="center" gap={1}>
        <Box width={60}>
          <Row
            alignItems="center"
            backgroundColor={colors.card}
            borderRadius={10}
            px={1.5}
            py={1}
            border={1}
            borderColor={colors.border}
          >
            <TextInput
              value={data.quantity}
              onChangeText={handleQuantityChange}
              placeholder="Qty"
              placeholderTextColor={colors.textLight}
              keyboardType="numeric"
              style={[styles.quantityInput, { color: colors.text, fontFamily: fonts.body }]}
            />
          </Row>
        </Box>

        <Box flex={1}>
          <Pressable onPress={() => setShowMeasurementPicker(true)}>
            <Row
              alignItems="center"
              justifyContent="space-between"
              backgroundColor={colors.card}
              borderRadius={10}
              px={1.5}
              py={1}
              border={1}
              borderColor={data.measurementId ? colors.primary : colors.border}
            >
              <Label.Small
                color={data.measurementId ? colors.text : colors.textLight}
              >
                {data.measurementId ? data.measurementAbbreviation : 'Measurement'}
              </Label.Small>
              <Icon name="chevron-down" size="sm" color={colors.secondary} />
            </Row>
          </Pressable>
        </Box>

        <Pressable onPress={onRemove}>
          <Icon name="times" size="lg" color={colors.error} />
        </Pressable>
      </Row>

      {/* Row 2: Ingredient search */}
      <Box mt={1}>
        <Row
          alignItems="center"
          backgroundColor={colors.card}
          borderRadius={10}
          px={1.5}
          py={1}
          border={1}
          borderColor={data.ingredientId ? colors.primary : colors.border}
        >
          <Icon name="search" size="sm" color={colors.textLight} />
          <Box flex={1} ml={1}>
            <TextInput
              value={searchText}
              onChangeText={handleSearchChange}
              onFocus={() => { if (searchText.length >= 2) setShowResults(true); }}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              placeholder="Search ingredient..."
              placeholderTextColor={colors.textLight}
              style={[styles.searchInput, { color: colors.text, fontFamily: fonts.body }]}
            />
          </Box>
          {data.ingredientId ? (
            <Icon name="check" size="sm" color={colors.success} />
          ) : null}
        </Row>
      </Box>

      {/* Search results dropdown */}
      {showResults && searchText.length >= 2 && (
        <Box
          mt={0.5}
          backgroundColor={colors.card}
          borderRadius={10}
          border={1}
          borderColor={colors.border}
          overflow="hidden"
        >
          {searchLoading ? (
            <Box px={1.5} py={1}>
              <Caption.Regular color={colors.secondary}>Searching...</Caption.Regular>
            </Box>
          ) : searchResults.length === 0 ? (
            <Box px={1.5} py={1}>
              <Caption.Regular color={colors.secondary}>No results</Caption.Regular>
            </Box>
          ) : (
            <FlatList
              data={searchResults.slice(0, 5)}
              keyExtractor={(item) => String(item.id)}
              keyboardShouldPersistTaps="handled"
              scrollEnabled={false}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleSelectIngredient(item)}>
                  <Row
                    px={1.5}
                    py={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Paragraph.Small>{item.name}</Paragraph.Small>
                      {item.category && (
                        <Caption.Small color={colors.secondary}>
                          {item.category.name}
                        </Caption.Small>
                      )}
                    </Box>
                  </Row>
                </Pressable>
              )}
            />
          )}
        </Box>
      )}

      <MeasurementPicker
        isOpen={showMeasurementPicker}
        selectedId={data.measurementId}
        onSelect={handleSelectMeasurement}
        onClose={() => setShowMeasurementPicker(false)}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  quantityInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
    textAlign: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
});
