import { StyleSheet } from 'react-native';
import { Box, Card, ContentRow, Icon, useTheme } from '@/design-system';

export interface RecipeCardProps {
  name: string;
  slug: string;
  subtitle?: string;
  color: string;
  isFamilyRecipe?: boolean;
  onPress?: () => void;
}

export function RecipeCard({ name, slug, subtitle, color, isFamilyRecipe, onPress }: RecipeCardProps): React.JSX.Element {
  const { colors } = useTheme();

  return (
    <Card>
      <ContentRow
        label={name}
        subtitle={subtitle}
        onPress={onPress}
        left={
          <Box
            width={68}
            height={68}
            borderRadius={12}
            backgroundColor={color}
          >
            {isFamilyRecipe ? (
              <Box
                width={22}
                height={22}
                borderRadius={11}
                backgroundColor={colors.primary}
                alignItems="center"
                justifyContent="center"
                style={styles.familyBadge}
              >
                <Icon name="users" size="xs" color={colors.onPrimary} />
              </Box>
            ) : null}
          </Box>
        }
        showChevron={false}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  familyBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
});
