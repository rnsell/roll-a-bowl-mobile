import { useLocalSearchParams } from 'expo-router';

import { EditRecipeDetailsScreen } from '@/screens/recipes/EditRecipeDetailsScreen';

export default function EditRecipeDetailsPage(): React.JSX.Element {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  return <EditRecipeDetailsScreen slug={slug} />;
}
