import { Box, Heading, Paragraph, useTheme } from '@/design-system';

export default function SettingsScreen(): React.JSX.Element {
  const { colors } = useTheme();

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Heading.Regular>Settings</Heading.Regular>
      <Paragraph.Regular color={colors.secondary}>Coming Soon</Paragraph.Regular>
    </Box>
  );
}
