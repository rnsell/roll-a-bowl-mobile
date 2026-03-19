import { useMemo } from 'react';
import { FlatList, Modal, Pressable, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client/react';

import { Box, Caption, Icon, Label, Paragraph, Row, SafeAreaBox, useTheme } from '@/design-system';
import { GetMeasurements } from '@/graphql/operations';

interface MeasurementPickerProps {
  isOpen: boolean;
  selectedId: number | null;
  onSelect: (id: number, abbreviation: string, name: string) => void;
  onClose: () => void;
}

export function MeasurementPicker({ isOpen, selectedId, onSelect, onClose }: MeasurementPickerProps): React.JSX.Element {
  const { colors } = useTheme();

  const { data } = useQuery(GetMeasurements, {
    variables: { input: { exposedOnly: true } },
  });

  const sortedMeasurements = useMemo(() => {
    if (!data?.measurements) return [];
    return [...data.measurements].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [data]);

  return (
    <Modal visible={isOpen} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaBox flex={1} edges={['top', 'bottom']} backgroundColor={colors.background}>
        <Row px={2.5} py={1.5} alignItems="center" justifyContent="space-between">
          <Label.Large>Select Measurement</Label.Large>
          <Pressable onPress={onClose}>
            <Label.Regular color={colors.primary}>Done</Label.Regular>
          </Pressable>
        </Row>

        <FlatList
          data={sortedMeasurements}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const isSelected = selectedId === item.id;
            return (
              <Pressable
                onPress={() => {
                  onSelect(item.id, item.abbreviation, item.name);
                  onClose();
                }}
              >
                <Row
                  px={2.5}
                  py={1.5}
                  alignItems="center"
                  justifyContent="space-between"
                  backgroundColor={isSelected ? colors.muted : undefined}
                >
                  <Box>
                    <Paragraph.Regular>{item.name}</Paragraph.Regular>
                    <Caption.Regular color={colors.secondary}>{item.abbreviation}</Caption.Regular>
                  </Box>
                  {isSelected ? (
                    <Icon name="check" size="lg" color={colors.primary} />
                  ) : null}
                </Row>
              </Pressable>
            );
          }}
        />
      </SafeAreaBox>
    </Modal>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 40,
  },
});
