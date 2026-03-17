import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { Box, SafeAreaBox, ScrollBox } from '@/design-system';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchFamilyGroup } from '@/store/family-group';
import { useApolloClientInstance } from '@/graphql';
import { useScreenFocus } from '@/lib/navigation';
import { Screen } from '@/lib/screens';
import { CreateFamilyGroupForm } from './CreateFamilyGroupForm';
import { FamilyGroupDetails } from './FamilyGroupDetails';

export function FamilyGroupScreen(): React.JSX.Element {
  useScreenFocus(Screen.FamilyGroup);
  const dispatch = useAppDispatch();
  const apolloClient = useApolloClientInstance();
  const familyGroupId = useAppSelector((state) => state.user.profile?.familyGroupId);
  const familyGroupStatus = useAppSelector((state) => state.familyGroup.status);

  useEffect(() => {
    if (familyGroupId && familyGroupStatus === 'idle') {
      dispatch(fetchFamilyGroup({ apolloClient }));
    }
  }, [familyGroupId, familyGroupStatus, dispatch, apolloClient]);

  const showDetails = familyGroupId !== null && familyGroupId !== undefined;
  const isLoading = showDetails && (familyGroupStatus === 'idle' || familyGroupStatus === 'loading');

  return (
    <SafeAreaBox flex={1} edges={['top']}>
      <ScrollBox contentSpacing={{ p: 2 }}>
        {isLoading ? (
          <Box mt={4} alignItems="center">
            <ActivityIndicator size="large" />
          </Box>
        ) : showDetails ? (
          <FamilyGroupDetails />
        ) : (
          <CreateFamilyGroupForm />
        )}
      </ScrollBox>
    </SafeAreaBox>
  );
}
