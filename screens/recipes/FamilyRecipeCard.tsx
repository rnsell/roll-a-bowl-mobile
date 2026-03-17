import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useMutation } from '@apollo/client/react';

import { Box, Button, Card, ContentRow, useTheme } from '@/design-system';
import { DeleteFamilyRecipe } from '@/graphql/operations';

export interface FamilyRecipeCardProps {
  name: string;
  slug: string;
  contributorName?: string;
  color: string;
  onPress?: () => void;
  onDeleted?: () => void;
}

export function FamilyRecipeCard({ name, slug, contributorName, color, onPress, onDeleted }: FamilyRecipeCardProps): React.JSX.Element {
  const { colors } = useTheme();
  const [deleteRecipe] = useMutation(DeleteFamilyRecipe);

  const handleDelete = useCallback(() => {
    Alert.alert(
      'Delete Recipe',
      `Are you sure you want to delete "${name}" from the family library?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteRecipe({ variables: { slug } });
              onDeleted?.();
            } catch (err) {
              Alert.alert('Error', err instanceof Error ? err.message : 'Failed to delete recipe');
            }
          },
        },
      ],
    );
  }, [name, slug, deleteRecipe, onDeleted]);

  return (
    <Card>
      <ContentRow
        label={name}
        subtitle={contributorName ? `Shared by ${contributorName}` : undefined}
        onPress={onPress}
        left={
          <Box
            width={68}
            height={68}
            borderRadius={12}
            backgroundColor={color}
          />
        }
        right={
          <Button
            label="Delete"
            variant="ghost"
            color={colors.error}
            onPress={handleDelete}
          />
        }
        showChevron={false}
      />
    </Card>
  );
}
