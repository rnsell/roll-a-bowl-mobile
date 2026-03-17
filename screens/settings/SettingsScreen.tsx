import { Suspense, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSuspenseQuery } from '@apollo/client/react';

import { Box, Button, Card, ContentRow, Heading, Label, Paragraph, SafeAreaBox, ScrollBox, useTheme } from '@/design-system';
import { useColorSchemePreference } from '@/components/ColorSchemeProvider';
import { useAuth } from '@/auth';
import { useScreenFocus } from '@/lib/navigation';
import { Screen } from '@/lib/screens';
import { GetCurrentUser } from '@/graphql/operations';

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
          <Box
            width={52}
            height={52}
            borderRadius={16}
            backgroundColor={colors.primary}
            alignItems="center"
            justifyContent="center"
          >
            <Label.Large color="#FFFFFF">{initial}</Label.Large>
          </Box>
        }
      />
    </Card>
  );
}

export function SettingsScreen(): React.JSX.Element {
  useScreenFocus(Screen.Settings);
  const { colors } = useTheme();
  const { signOut } = useAuth();
  const { preference, setPreference } = useColorSchemePreference();

  const handleSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

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
