import { useCallback, useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

import { Box, Button, Card, Paragraph, useTheme } from '@/design-system';
import { useAppDispatch } from '@/store/hooks';
import { inviteFamilyMember, addInvitation } from '@/store/family-group';
import { useApolloClientInstance } from '@/graphql';

export function InviteMemberForm(): React.JSX.Element {
  const { colors, fonts } = useTheme();
  const dispatch = useAppDispatch();
  const apolloClient = useApolloClientInstance();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInvite = useCallback(async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const result = await dispatch(inviteFamilyMember({ email: trimmed, apolloClient })).unwrap();
      dispatch(addInvitation(result));
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send invitation');
    } finally {
      setLoading(false);
    }
  }, [email, dispatch, apolloClient]);

  return (
    <Card title="Invite Member">
      <Box p={2}>
        <TextInput
          placeholder="Email address"
          placeholderTextColor={colors.textLight}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
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
        <Box mt={2}>
          <Button
            label={loading ? 'Sending...' : 'Send Invitation'}
            onPress={handleInvite}
            disabled={loading}
          />
        </Box>
      </Box>
    </Card>
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
