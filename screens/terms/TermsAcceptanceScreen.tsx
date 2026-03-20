import { Suspense, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView } from 'react-native';
import { useSuspenseQuery, useMutation } from '@apollo/client/react';

import { Box, Button, Caption, Heading, Icon, Label, MarkdownContent, Row, SafeAreaBox, useTheme } from '@/design-system';
import { GetCurrentTerms, GetTermsStatus, AcceptTerms } from '@/graphql/operations';

interface TermsAcceptanceScreenProps {
  documentType: 'terms' | 'privacy_policy';
  currentVersion: string;
  onAccepted: () => void;
  onDecline: () => void;
}

function TermsContent({ documentType, currentVersion, onAccepted, onDecline }: TermsAcceptanceScreenProps): React.JSX.Element {
  const { colors } = useTheme();
  const [agreed, setAgreed] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);

  const { data } = useSuspenseQuery(GetCurrentTerms, {
    variables: { documentType },
  });

  const [acceptTerms] = useMutation(AcceptTerms, {
    refetchQueries: [GetTermsStatus],
  });

  const document = data.currentTerms;
  const title = documentType === 'terms' ? 'Terms of Service' : 'Privacy Policy';

  if (!document) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <Label.Regular color={colors.secondary}>Document not available</Label.Regular>
      </Box>
    );
  }

  const handleAccept = async () => {
    setIsAccepting(true);
    try {
      await acceptTerms({
        variables: { documentType, version: currentVersion },
      });
      onAccepted();
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to accept. Please try again.');
    } finally {
      setIsAccepting(false);
    }
  };

  return (
    <Box flex={1}>
      <Box px={2.5} pt={2} pb={1}>
        <Heading.Regular>{title}</Heading.Regular>
        <Caption.Regular color={colors.secondary}>
          Effective {new Date(document.effectiveDate).toLocaleDateString()}
        </Caption.Regular>
      </Box>

      <Box flex={1} px={2.5}>
        <ScrollView showsVerticalScrollIndicator>
          <Box py={1}>
            <MarkdownContent>{document.content}</MarkdownContent>
          </Box>
        </ScrollView>
      </Box>

      <Box px={2.5} py={2} gap={2} borderTopWidth={1} borderColor={colors.border}>
        <Pressable onPress={() => setAgreed((prev) => !prev)}>
          <Row alignItems="center" gap={1.5}>
            <Box
              width={24}
              height={24}
              borderRadius={7}
              backgroundColor={agreed ? colors.primary : undefined}
              borderColor={agreed ? colors.primary : colors.border}
              border={agreed ? 0 : 2}
              alignItems="center"
              justifyContent="center"
            >
              {agreed ? (
                <Icon name="check" size="sm" color={colors.onPrimary} />
              ) : null}
            </Box>
            <Box flex={1}>
              <Label.Small>I have read and agree to the {title}</Label.Small>
            </Box>
          </Row>
        </Pressable>

        <Row gap={1.5}>
          <Box flex={1}>
            <Button
              label="Decline"
              variant="outline"
              onPress={onDecline}
            />
          </Box>
          <Box flex={1}>
            <Button
              label="Accept & Continue"
              onPress={handleAccept}
              disabled={!agreed}
              loading={isAccepting}
            />
          </Box>
        </Row>
      </Box>
    </Box>
  );
}

export function TermsAcceptanceScreen(props: TermsAcceptanceScreenProps): React.JSX.Element {
  return (
    <SafeAreaBox flex={1} edges={['top', 'bottom']}>
      <Suspense fallback={
        <Box flex={1} alignItems="center" justifyContent="center">
          <ActivityIndicator size="small" />
        </Box>
      }>
        <TermsContent {...props} />
      </Suspense>
    </SafeAreaBox>
  );
}
