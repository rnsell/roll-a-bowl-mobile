import { useCallback, useState } from 'react';
import { Pressable } from 'react-native';

import { Box, Caption, Icon, Label, Row, useTheme } from '@/design-system';

interface AisleGroupProps {
  name: string;
  allChecked: boolean;
  checkedCount: number;
  totalCount: number;
  children: React.ReactNode;
}

export function AisleGroup({ name, allChecked, checkedCount, totalCount, children }: AisleGroupProps): React.JSX.Element {
  const { colors } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return (
    <Box>
      <Pressable onPress={toggleCollapse}>
        <Row
          alignItems="center"
          justifyContent="space-between"
          py={1.5}
          px={2}
        >
          <Row alignItems="center" gap={1}>
            <Icon
              name={collapsed ? 'chevron-right' : 'chevron-down'}
              size="sm"
              color={colors.secondary}
            />
            <Label.Regular color={allChecked ? colors.success : colors.text}>
              {name}
            </Label.Regular>
          </Row>
          <Caption.Small color={allChecked ? colors.success : colors.secondary}>
            {checkedCount}/{totalCount}
          </Caption.Small>
        </Row>
      </Pressable>

      {!collapsed ? (
        <Box>{children}</Box>
      ) : null}
    </Box>
  );
}
