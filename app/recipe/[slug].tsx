import { useLocalSearchParams } from 'expo-router';

import { RecipeDetailScreen } from '@/screens/recipes/RecipeDetailScreen';

export default function RecipeDetailPage(): React.JSX.Element {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  return <RecipeDetailScreen slug={slug} />;
}
