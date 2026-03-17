import { StyleSheet } from 'react-native';

import { Box, Caption, Row, useTheme } from '@/design-system';

interface ProgressBarProps {
  checked: number;
  total: number;
}

export function ProgressBar({ checked, total }: ProgressBarProps): React.JSX.Element {
  const { colors } = useTheme();
  const percent = total > 0 ? Math.round((checked / total) * 100) : 0;

  return (
    <Box>
      <Row justifyContent="space-between" alignItems="center" mb={1}>
        <Caption.Regular color={colors.secondary}>
          {checked} of {total} items
        </Caption.Regular>
        <Caption.Regular color={colors.success} style={styles.percent}>
          {percent}%
        </Caption.Regular>
      </Row>
      <Box
        height={6}
        borderRadius={3}
        backgroundColor={colors.border}
        overflow="hidden"
      >
        <Box
          height={6}
          borderRadius={3}
          backgroundColor={colors.success}
          style={{ width: `${percent}%` }}
        />
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  percent: {
    fontWeight: '600',
  },
});
