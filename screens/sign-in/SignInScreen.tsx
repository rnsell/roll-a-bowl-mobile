import { useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';

import { Box, Button, Heading, Paragraph, SafeAreaBox, useTheme } from '@/design-system';
import { useAuth } from '@/auth';
import { config } from '@/config';
import { useScreenFocus } from '@/lib/navigation';
import { Screen } from '@/lib/screens';

const discovery: AuthSession.DiscoveryDocument = {
  authorizationEndpoint: `${config.clerkFrontendApi}/oauth/authorize`,
  tokenEndpoint: `${config.clerkFrontendApi}/oauth/token`,
};

const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'rollabowl',
  path: 'auth/callback',
});
console.log('[Auth] Redirect URI:', redirectUri);

export function SignInScreen(): React.JSX.Element {
  useScreenFocus(Screen.SignIn);
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
    <SafeAreaBox flex={1}>
      <Box flex={1} alignItems="center" justifyContent="center" px={4}>
        <Heading.Large>Roll a Bowl</Heading.Large>
        <Box mt={1}>
          <Paragraph.Regular color={colors.secondary} textAlign="center">
            Plan meals, build grocery lists
          </Paragraph.Regular>
        </Box>

        <Box mt={6} width="100%">
          <Button
            label="Sign In"
            onPress={() => promptAsync()}
            loading={loading}
          />
        </Box>
      </Box>
    </SafeAreaBox>
  );
}
