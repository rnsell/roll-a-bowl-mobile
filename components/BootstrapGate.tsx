import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { Box, Button, Heading, Paragraph, SafeAreaBox, useTheme } from '@/design-system';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { bootstrapUser } from '@/store/user';
import { useApolloClientInstance } from '@/graphql';

export function BootstrapGate({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const apolloClient = useApolloClientInstance();
  const status = useAppSelector((state) => state.user.status);
  const error = useAppSelector((state) => state.user.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(bootstrapUser({ apolloClient }));
    }
  }, [status, dispatch, apolloClient]);

  const handleRetry = (): void => {
    dispatch(bootstrapUser({ apolloClient }));
  };

  if (status === 'loading' || status === 'idle') {
    return (
      <SafeAreaBox flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaBox>
    );
  }

  if (status === 'error') {
    return (
      <SafeAreaBox flex={1} alignItems="center" justifyContent="center" px={3}>
        <Heading.Regular>Something went wrong</Heading.Regular>
        <Box mt={1}>
          <Paragraph.Regular color={colors.secondary}>
            {error ?? 'Failed to load your account data. Please try again.'}
          </Paragraph.Regular>
        </Box>
        <Box mt={3}>
          <Button label="Retry" onPress={handleRetry} />
        </Box>
      </SafeAreaBox>
    );
  }

  return <>{children}</>;
}
