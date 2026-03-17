import { Box, Card, ContentRow } from '@/design-system';
import { useAppSelector } from '@/store/hooks';
import { ShareToFamilyButton } from './ShareToFamilyButton';

export interface RecipeCardProps {
  name: string;
  slug: string;
  subtitle?: string;
  color: string;
  onPress?: () => void;
}

export function RecipeCard({ name, slug, subtitle, color, onPress }: RecipeCardProps): React.JSX.Element {
  const familyGroupId = useAppSelector((state) => state.user.profile?.familyGroupId);
  const hasFamilyGroup = familyGroupId !== null && familyGroupId !== undefined;

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
          />
        }
        right={hasFamilyGroup ? <ShareToFamilyButton recipeSlug={slug} /> : undefined}
        showChevron={false}
      />
    </Card>
  );
}
