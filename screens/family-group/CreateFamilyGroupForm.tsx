import { useCallback, useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

import { Box, Button, Heading, Paragraph, Card, useTheme } from '@/design-system';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createFamilyGroup } from '@/store/family-group';
import { updateFamilyGroup } from '@/store/user';
import { useApolloClientInstance } from '@/graphql';

export function CreateFamilyGroupForm(): React.JSX.Element {
  const { colors, fonts } = useTheme();
  const dispatch = useAppDispatch();
  const apolloClient = useApolloClientInstance();
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = useCallback(async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter a family name');
      return;
    }
    if (trimmed.length > 100) {
      setError('Family name must be 100 characters or less');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const result = await dispatch(createFamilyGroup({ name: trimmed, apolloClient })).unwrap();
      dispatch(updateFamilyGroup({
        familyGroupId: result.id,
        familyRole: 'owner',
        familyGroupName: result.name,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create family group');
    } finally {
      setLoading(false);
    }
  }, [name, dispatch, apolloClient]);

  return (
    <Box>
      <Heading.Regular>Create a Family Group</Heading.Regular>
      <Box mt={1}>
        <Paragraph.Regular color={colors.secondary}>
          Start a shared recipe space for your family. You'll be the owner and can invite others to join.
        </Paragraph.Regular>
      </Box>

      <Box mt={3}>
        <Card>
          <Box p={2}>
            <TextInput
              placeholder="Family name"
              placeholderTextColor={colors.textLight}
              value={name}
              onChangeText={setName}
              maxLength={100}
              autoFocus
              style={[
                styles.input,
                {
                  color: colors.text,
                  fontFamily: fonts.body,
                  borderColor: error ? colors.error : colors.border,
                },
              ]}
            />
            {error ? (
              <Box mt={1}>
                <Paragraph.Small color={colors.error}>{error}</Paragraph.Small>
              </Box>
            ) : null}
          </Box>
        </Card>
      </Box>

      <Box mt={3}>
        <Button
          label={loading ? 'Creating...' : 'Create Family Group'}
          onPress={handleCreate}
          disabled={loading}
        />
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
  },
});
