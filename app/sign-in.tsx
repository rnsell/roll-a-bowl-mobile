import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as AuthSession from 'expo-auth-session';

import { Box, Heading, Paragraph, useTheme } from '@/design-system';
import { useAuth } from '@/auth';
import { config } from '@/config';

const discovery: AuthSession.DiscoveryDocument = {
  authorizationEndpoint: `${config.clerkFrontendApi}/oauth/authorize`,
  tokenEndpoint: `${config.clerkFrontendApi}/oauth/token`,
};

const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'rollabowl',
  path: 'auth/callback',
});
console.log('[Auth] Redirect URI:', redirectUri);

export default function SignInScreen(): React.JSX.Element {
  const { colors } = useTheme();
  const { setTokens } = useAuth();
  const [exchanging, setExchanging] = useState(false);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: config.clerkOAuthClientId,
      scopes: ['profile', 'email'],
      redirectUri,
      usePKCE: true,
      responseType: AuthSession.ResponseType.Code,
    },
    discovery,
  );

  useEffect(() => {
    if (response?.type !== 'success' || !request?.codeVerifier) return;

    setExchanging(true);
    AuthSession.exchangeCodeAsync(
      {
        clientId: config.clerkOAuthClientId,
        code: response.params.code,
        redirectUri,
        extraParams: { code_verifier: request.codeVerifier },
      },
      discovery,
    )
      .then((tokenResponse) => {
        return setTokens(
          tokenResponse.accessToken,
          tokenResponse.refreshToken ?? '',
        );
      })
      .catch((err) => {
        console.error('Token exchange error:', err);
      })
      .finally(() => {
        setExchanging(false);
      });
  }, [response, request?.codeVerifier, setTokens]);

  const loading = !request || exchanging;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <Box flex={1} alignItems="center" justifyContent="center" px={32}>
        <Heading.Large>Roll a Bowl</Heading.Large>
        <Box mt={8}>
          <Paragraph.Regular color={colors.secondary} textAlign="center">
            Plan meals, build grocery lists
          </Paragraph.Regular>
        </Box>

        <Box mt={48} width="100%">
          <Pressable
            onPress={() => promptAsync()}
            disabled={loading}
            style={[
              styles.button,
              { backgroundColor: colors.primary },
              loading && styles.buttonDisabled,
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Paragraph.Regular color="#FFFFFF" style={styles.buttonText}>
                Sign In
              </Paragraph.Regular>
            )}
          </Pressable>
        </Box>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontWeight: '600',
  },
});
