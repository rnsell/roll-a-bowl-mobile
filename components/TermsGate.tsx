import { Suspense, useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client/react';

import { Box } from '@/design-system';
import { GetTermsStatus } from '@/graphql/operations';
import { useAuth } from '@/auth';
import { TermsAcceptanceScreen } from '@/screens/terms/TermsAcceptanceScreen';

interface TermsGateProps {
  children: React.ReactNode;
}

export function TermsGate({ children }: TermsGateProps): React.JSX.Element {
  const { signOut } = useAuth();
  const { data, loading, refetch } = useQuery(GetTermsStatus, {
    fetchPolicy: 'cache-and-network',
  });

  const handleDecline = useCallback(async () => {
    await signOut();
  }, [signOut]);

  const handleAccepted = useCallback(() => {
    refetch();
  }, [refetch]);

  if (loading && !data) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator size="small" />
      </Box>
    );
  }

  const status = data?.termsStatus;

  // If no status data or terms not configured, proceed
  if (!status) {
    return <>{children}</>;
  }

  // Check terms first
  if (status.termsRequiresAcceptance && status.termsCurrentVersion) {
    return (
      <TermsAcceptanceScreen
        documentType="terms"
        currentVersion={status.termsCurrentVersion}
        onAccepted={handleAccepted}
        onDecline={handleDecline}
      />
    );
  }

  // Then check privacy policy
  if (status.privacyRequiresAcceptance && status.privacyCurrentVersion) {
    return (
      <TermsAcceptanceScreen
        documentType="privacy_policy"
        currentVersion={status.privacyCurrentVersion}
        onAccepted={handleAccepted}
        onDecline={handleDecline}
      />
    );
  }

  // Both accepted (or not configured)
  return <>{children}</>;
}
