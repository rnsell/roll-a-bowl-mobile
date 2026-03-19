import { useState } from 'react';
import { Pressable, TextInput } from 'react-native';

import { Box, Caption, Icon, Label, Paragraph, Row, useTheme } from '@/design-system';

export interface MealEntryData {
  id: string;
  name: string;
  isAdHoc: boolean;
  addedBy?: string;
}

interface MealEntryRowProps {
  entry: MealEntryData;
  onRemove: () => void;
  onEditAdHoc?: (newText: string) => void;
}

export function MealEntryRow({ entry, onRemove, onEditAdHoc }: MealEntryRowProps): React.JSX.Element {
  const { colors, fonts } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(entry.name);

  const handleSaveEdit = () => {
    if (editText.trim().length > 0 && onEditAdHoc) {
      onEditAdHoc(editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(entry.name);
    setIsEditing(false);
  };

  return (
    <Row px={2} py={1.5} alignItems="center" gap={1.5}>
      <Box flex={1}>
        {isEditing ? (
          <Row alignItems="center" gap={1}>
            <Box flex={1}>
              <Box borderBottomWidth={1} borderColor={colors.border} pb={0.5}>
                <TextInput
                  value={editText}
                  onChangeText={(text) => setEditText(text.slice(0, 200))}
                  onSubmitEditing={handleSaveEdit}
                  autoFocus
                  maxLength={200}
                  style={{ fontSize: 16, padding: 0, color: colors.text, fontFamily: fonts.body }}
                />
              </Box>
            </Box>
            <Pressable onPress={handleSaveEdit}>
              <Icon name="check" size="lg" color={colors.success} />
            </Pressable>
            <Pressable onPress={handleCancelEdit}>
              <Icon name="times" size="lg" color={colors.secondary} />
            </Pressable>
          </Row>
        ) : (
          <>
            <Paragraph.Regular>{entry.name}</Paragraph.Regular>
            {entry.addedBy ? (
              <Caption.Small color={colors.secondary}>by {entry.addedBy}</Caption.Small>
            ) : null}
          </>
        )}
      </Box>

      {!isEditing ? (
        <Row alignItems="center" gap={1.5}>
          {entry.isAdHoc && onEditAdHoc ? (
            <Pressable onPress={() => setIsEditing(true)}>
              <Icon name="pencil" size="md" color={colors.secondary} />
            </Pressable>
          ) : null}
          <Pressable onPress={onRemove}>
            <Icon name="times" size="lg" color={colors.error} />
          </Pressable>
        </Row>
      ) : null}
    </Row>
  );
}
