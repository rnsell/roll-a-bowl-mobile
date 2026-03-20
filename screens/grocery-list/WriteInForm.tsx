import { useState } from 'react';
import { TextInput } from 'react-native';

import { Box, Icon, Row, useTheme } from '@/design-system';
import { Pressable } from 'react-native';

interface WriteInFormProps {
  onSubmit: (name: string) => void;
}

export function WriteInForm({ onSubmit }: WriteInFormProps): React.JSX.Element {
  const { colors, fonts } = useTheme();
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim().length === 0) return;
    onSubmit(text.trim());
    setText('');
  };

  return (
    <Row
      alignItems="center"
      gap={1.5}
      backgroundColor={colors.card}
      borderRadius={14}
      px={2}
      py={1.5}
      border={1}
      borderColor={colors.border}
    >
      <Icon name="plus" size="md" color={colors.primary} />
      <Box flex={1}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add an item..."
          placeholderTextColor={colors.textLight}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
          style={{ fontSize: 14, padding: 0, color: colors.text, fontFamily: fonts.body }}
        />
      </Box>
      {text.trim().length > 0 ? (
        <Pressable onPress={handleSubmit}>
          <Icon name="check" size="lg" color={colors.primary} />
        </Pressable>
      ) : null}
    </Row>
  );
}
