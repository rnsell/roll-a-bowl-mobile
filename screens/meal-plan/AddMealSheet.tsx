import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, TextInput } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

import { Box, Button, Icon, Label, Paragraph, Row, useTheme } from '@/design-system';

interface AddMealSheetProps {
  isOpen: boolean;
  mealLabel: string;
  onAddRecipe: () => void;
  onAddQuickMeal: (text: string) => void;
  onClose: () => void;
}

export function AddMealSheet({ isOpen, mealLabel, onAddRecipe, onAddQuickMeal, onClose }: AddMealSheetProps): React.JSX.Element {
  const { colors, fonts } = useTheme();
  const modalRef = useRef<BottomSheetModal>(null);
  const [mode, setMode] = useState<'menu' | 'quickMeal'>('menu');
  const [quickMealText, setQuickMealText] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMode('menu');
      setQuickMealText('');
      modalRef.current?.present();
    } else {
      modalRef.current?.dismiss();
    }
  }, [isOpen]);

  const handleAddRecipe = useCallback(() => {
    modalRef.current?.dismiss();
    onAddRecipe();
  }, [onAddRecipe]);

  const handleShowQuickMeal = useCallback(() => {
    setMode('quickMeal');
  }, []);

  const handleSubmitQuickMeal = useCallback(() => {
    if (quickMealText.trim().length === 0) return;
    onAddQuickMeal(quickMealText.trim());
    modalRef.current?.dismiss();
  }, [quickMealText, onAddQuickMeal]);

  const handleDismiss = useCallback(() => {
    setMode('menu');
    setQuickMealText('');
    onClose();
  }, [onClose]);

  return (
    <BottomSheetModal
      ref={modalRef}
      enableDynamicSizing
      enablePanDownToClose
      onDismiss={handleDismiss}
      backgroundStyle={{
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 8,
      }}
      handleIndicatorStyle={{ backgroundColor: colors.secondary }}
    >
      <BottomSheetView>
        <Box px={2.5} pb={4}>
          {mode === 'menu' ? (
            <>
              <Label.Large>Add to {mealLabel}</Label.Large>

              <Box mt={2} gap={1}>
                <Pressable onPress={handleAddRecipe}>
                  <Row
                    alignItems="center"
                    gap={1.5}
                    backgroundColor={colors.card}
                    borderRadius={14}
                    px={2}
                    py={2}
                    border={1}
                    borderColor={colors.border}
                  >
                    <Icon name="book" size="lg" color={colors.primary} />
                    <Box flex={1}>
                      <Label.Regular>Add Recipe</Label.Regular>
                      <Paragraph.Small color={colors.secondary}>Choose from your recipes</Paragraph.Small>
                    </Box>
                    <Icon name="chevron-right" size="md" color={colors.textLight} />
                  </Row>
                </Pressable>

                <Pressable onPress={handleShowQuickMeal}>
                  <Row
                    alignItems="center"
                    gap={1.5}
                    backgroundColor={colors.card}
                    borderRadius={14}
                    px={2}
                    py={2}
                    border={1}
                    borderColor={colors.border}
                  >
                    <Icon name="pencil" size="lg" color={colors.primary} />
                    <Box flex={1}>
                      <Label.Regular>Quick Meal</Label.Regular>
                      <Paragraph.Small color={colors.secondary}>Type a free-text meal</Paragraph.Small>
                    </Box>
                    <Icon name="chevron-right" size="md" color={colors.textLight} />
                  </Row>
                </Pressable>
              </Box>
            </>
          ) : (
            <>
              <Row alignItems="center" gap={1}>
                <Pressable onPress={() => setMode('menu')}>
                  <Icon name="chevron-left" size="md" color={colors.primary} />
                </Pressable>
                <Label.Large>Quick Meal</Label.Large>
              </Row>

              <Box mt={2}>
                <Row
                  alignItems="center"
                  backgroundColor={colors.card}
                  borderRadius={14}
                  px={2}
                  py={1.5}
                  border={1}
                  borderColor={colors.primary}
                >
                  <TextInput
                    value={quickMealText}
                    onChangeText={(text) => setQuickMealText(text.slice(0, 200))}
                    placeholder={`What's for ${mealLabel.toLowerCase()}?`}
                    placeholderTextColor={colors.textLight}
                    autoFocus
                    maxLength={200}
                    onSubmitEditing={handleSubmitQuickMeal}
                    style={{ flex: 1, fontSize: 16, padding: 0, color: colors.text, fontFamily: fonts.body }}
                  />
                </Row>
                <Box mt={0.5} alignItems="flex-end">
                  <Paragraph.Small color={colors.secondary}>
                    {quickMealText.length}/200
                  </Paragraph.Small>
                </Box>
              </Box>

              <Box mt={2}>
                <Button
                  label="Add Meal"
                  onPress={handleSubmitQuickMeal}
                  disabled={quickMealText.trim().length === 0}
                />
              </Box>
            </>
          )}
        </Box>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
