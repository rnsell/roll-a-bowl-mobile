import { Suspense, useCallback } from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { useSuspenseQuery } from '@apollo/client/react';

import { Box, Heading, Paragraph, Caption, useTheme } from '@/design-system';
import { useAuth } from '@/auth';
import { GetCurrentUser } from '@/graphql/operations';

function UserProfile(): React.JSX.Element {
  const { colors } = useTheme();
  const { data } = useSuspenseQuery(GetCurrentUser);

  if (!data.user) {
    return (
      <Paragraph.Regular color={colors.secondary}>
        No user profile found
      </Paragraph.Regular>
    );
  }

  return (
    <Box p={16} backgroundColor={colors.muted} borderRadius={8}>
      <Paragraph.Regular>
        {data.user.firstName} {data.user.lastName}
      </Paragraph.Regular>
      <Caption.Small color={colors.secondary}>
        {data.user.email}
      </Caption.Small>
    </Box>
  );
}

export default function SettingsScreen(): React.JSX.Element {
  const { colors } = useTheme();
  const { signOut } = useAuth();

  const handleSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

  return (
    <Box flex={1} p={16}>
      <Heading.Regular>Settings</Heading.Regular>

      <Box mt={16}>
        <Suspense fallback={<ActivityIndicator size="small" />}>
          <UserProfile />
        </Suspense>
      </Box>

      <Box mt={32} width="100%">
        <Pressable
          onPress={handleSignOut}
          style={[styles.button, { backgroundColor: colors.error }]}
        >
          <Paragraph.Regular color="#FFFFFF" style={styles.buttonText}>
            Sign Out
          </Paragraph.Regular>
        </Pressable>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '600',
  },
});
