import { Box, Card, ContentRow } from '@/design-system';

export interface RecipeCardProps {
  name: string;
  subtitle?: string;
  color: string;
  onPress?: () => void;
}

export function RecipeCard({ name, subtitle, color, onPress }: RecipeCardProps): React.JSX.Element {
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
        showChevron={false}
      />
    </Card>
  );
}
