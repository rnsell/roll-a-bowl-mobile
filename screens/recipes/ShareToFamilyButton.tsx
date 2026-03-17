import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useMutation } from '@apollo/client/react';

import { Button, useTheme } from '@/design-system';
import { ShareRecipeToFamily } from '@/graphql/operations';

interface ShareToFamilyButtonProps {
  recipeSlug: string;
}

export function ShareToFamilyButton({ recipeSlug }: ShareToFamilyButtonProps): React.JSX.Element {
  const { colors } = useTheme();
  const [shareRecipe, { loading }] = useMutation(ShareRecipeToFamily);

  const handleShare = useCallback(async () => {
    try {
      await shareRecipe({ variables: { input: { recipeSlug } } });
      Alert.alert('Shared!', 'Recipe has been added to your family library.');
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to share recipe');
    }
  }, [recipeSlug, shareRecipe]);

  return (
    <Button
      label={loading ? 'Sharing...' : 'Share'}
      variant="outline"
      onPress={handleShare}
      disabled={loading}
    />
  );
}
