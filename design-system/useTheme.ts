import { useColorScheme } from '@/components/useColorScheme';
import { colors, fonts } from './theme';

export function useTheme() {
  const colorScheme = useColorScheme() ?? 'light';

  return {
    colors: colors[colorScheme],
    fonts,
    colorScheme,
  };
}
