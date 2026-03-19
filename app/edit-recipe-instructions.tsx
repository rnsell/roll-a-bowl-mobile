import { useLocalSearchParams } from 'expo-router';

import { EditRecipeInstructionsScreen } from '@/screens/recipes/EditRecipeInstructionsScreen';

export default function EditRecipeInstructionsPage(): React.JSX.Element {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  return <EditRecipeInstructionsScreen slug={slug} />;
}
