import { Suspense, useState } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { useSuspenseQuery } from '@apollo/client/react';

import { Box, Caption, Label, MarkdownContent, Row, SafeAreaBox, ScrollBox, useTheme } from '@/design-system';
import { GetCurrentTerms } from '@/graphql/operations';

type DocumentTab = 'terms' | 'privacy_policy';

function TermsViewerContent(): React.JSX.Element {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<DocumentTab>('terms');

  const { data } = useSuspenseQuery(GetCurrentTerms, {
    variables: { documentType: activeTab },
  });

  const document = data.currentTerms;
  const title = activeTab === 'terms' ? 'Terms of Service' : 'Privacy Policy';

  return (
    <Box flex={1}>
      <Box px={2.5} pt={1.5}>
        <Row
          gap={0.5}
          backgroundColor={colors.card}
          borderRadius={12}
          p={0.5}
          border={1}
          borderColor={colors.border}
        >
          <Box flex={1}>
            <Pressable onPress={() => setActiveTab('terms')}>
              <Box py={1} borderRadius={10} alignItems="center" backgroundColor={activeTab === 'terms' ? colors.primary : undefined}>
                <Label.Small color={activeTab === 'terms' ? colors.onPrimary : colors.secondary}>Terms</Label.Small>
              </Box>
            </Pressable>
          </Box>
          <Box flex={1}>
            <Pressable onPress={() => setActiveTab('privacy_policy')}>
              <Box py={1} borderRadius={10} alignItems="center" backgroundColor={activeTab === 'privacy_policy' ? colors.primary : undefined}>
                <Label.Small color={activeTab === 'privacy_policy' ? colors.onPrimary : colors.secondary}>Privacy</Label.Small>
              </Box>
            </Pressable>
          </Box>
        </Row>
      </Box>

      {document ? (
        <>
          <Box px={2.5} pt={1.5}>
            <Caption.Regular color={colors.secondary}>
              Effective {new Date(document.effectiveDate).toLocaleDateString()}
            </Caption.Regular>
          </Box>
          <ScrollBox contentSpacing={{ p: 2.5 }}>
            <MarkdownContent>{document.content}</MarkdownContent>
          </ScrollBox>
        </>
      ) : (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Label.Regular color={colors.secondary}>No {title.toLowerCase()} available</Label.Regular>
        </Box>
      )}
    </Box>
  );
}

export function TermsViewerScreen(): React.JSX.Element {
  return (
    <SafeAreaBox flex={1} edges={[]}>
      <Suspense fallback={
        <Box flex={1} alignItems="center" justifyContent="center">
          <ActivityIndicator size="small" />
        </Box>
      }>
        <TermsViewerContent />
      </Suspense>
    </SafeAreaBox>
  );
}
