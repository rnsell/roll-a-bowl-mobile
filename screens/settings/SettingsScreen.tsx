import { Suspense, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSuspenseQuery } from '@apollo/client/react';
import { useRouter } from 'expo-router';

import { Avatar, Box, Button, Card, ContentRow, Heading, Paragraph, SafeAreaBox, ScrollBox, useTheme } from '@/design-system';
import { useColorSchemePreference } from '@/components/ColorSchemeProvider';
import { useAuth } from '@/auth';
import { useScreenFocus } from '@/lib/navigation';
import { Screen } from '@/lib/screens';
import { GetCurrentUser } from '@/graphql/operations';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearUser } from '@/store/user';

const appearanceLabels = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
} as const;

type Preference = keyof typeof appearanceLabels;

const preferenceOrder: Preference[] = ['system', 'light', 'dark'];

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

  const { firstName, lastName, email } = data.user;
  const fullName = [firstName, lastName].filter(Boolean).join(' ');
  const initial = (firstName ?? email ?? '?').charAt(0).toUpperCase();

  return (
    <Card>
      <ContentRow
        size="large"
        label={fullName || 'User'}
        subtitle={email ?? undefined}
        left={
          <Avatar size="large" initial={initial} />
        }
      />
    </Card>
  );
}

export function SettingsScreen(): React.JSX.Element {
  useScreenFocus(Screen.Settings);
  const { colors } = useTheme();
  const { signOut } = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { preference, setPreference } = useColorSchemePreference();
  const familyGroupName = useAppSelector((state) => state.user.profile?.familyGroupName);

  const handleSignOut = useCallback(async () => {
    dispatch(clearUser());
    await signOut();
  }, [signOut, dispatch]);

  const cycleAppearance = useCallback(() => {
    const currentIndex = preferenceOrder.indexOf(preference);
    const next = preferenceOrder[(currentIndex + 1) % preferenceOrder.length];
    setPreference(next);
  }, [preference, setPreference]);

  return (
    <SafeAreaBox flex={1} edges={['top']}>
    <ScrollBox contentSpacing={{ p: 2 }}>
      <Heading.Regular>Settings</Heading.Regular>

      <Box mt={2}>
        <Suspense fallback={<ActivityIndicator size="small" />}>
          <UserProfile />
        </Suspense>
      </Box>

      <Box mt={3}>
        <Card title="Family">
          <ContentRow
            label="Family Group"
            subtitle={familyGroupName ?? 'Not a member'}
            onPress={() => router.push('/family-group')}
          />
        </Card>
      </Box>

      <Box mt={3}>
        <Card title="Preferences">
          <ContentRow
            label="Appearance"
            subtitle={appearanceLabels[preference]}
            onPress={cycleAppearance}
          />
        </Card>
      </Box>

      <Box mt={3}>
        <Card title="About">
          <ContentRow
            label="Version"
            subtitle="1.0.0"
            showChevron={false}
          />
        </Card>
      </Box>

      <Box mt={4} alignItems="center">
        <Button
          label="Sign Out"
          variant="ghost"
          color={colors.error}
          onPress={handleSignOut}
        />
      </Box>
    </ScrollBox>
    </SafeAreaBox>
  );
}
