import { Box, Button, Paragraph, useTheme } from '@/design-system';

interface GeneratePromptProps {
  onGenerate: () => void;
  loading?: boolean;
}

export function GeneratePrompt({ onGenerate, loading }: GeneratePromptProps): React.JSX.Element {
  const { colors } = useTheme();

  return (
    <Box mt={4} alignItems="center" gap={2}>
      <Paragraph.Regular color={colors.secondary} textAlign="center">
        No shopping list for this week yet.{'\n'}Generate one from your meal plan.
      </Paragraph.Regular>
      <Box width="100%">
        <Button
          label="Generate Shopping List"
          onPress={onGenerate}
          loading={loading}
        />
      </Box>
    </Box>
  );
}
