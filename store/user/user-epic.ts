import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApolloClient } from '@apollo/client';

import { GetCurrentUserProfile, GetMyFamilyGroup } from '@/graphql/operations';
import type { UserProfile } from './user-types';

export const bootstrapUser = createAsyncThunk<
  UserProfile,
  { apolloClient: ApolloClient }
>(
  'user/bootstrap',
  async ({ apolloClient }) => {
    const [userResult, familyResult] = await Promise.all([
      apolloClient.query({ query: GetCurrentUserProfile, fetchPolicy: 'network-only' }),
      apolloClient.query({ query: GetMyFamilyGroup, fetchPolicy: 'network-only' }).catch(() => null),
    ]);

    const me = userResult.data?.me;
    if (!me) {
      throw new Error('User profile not found');
    }

    const familyGroup = familyResult?.data?.myFamilyGroup ?? null;

    const profile: UserProfile = {
      id: me.id,
      email: me.email,
      firstName: me.firstName,
      lastName: me.lastName,
      isPremium: false, // TBD: add when premium check is available
      familyGroupId: familyGroup?.id ?? null,
      familyRole: familyGroup
        ? familyGroup.owner.id === me.id
          ? 'owner'
          : 'member'
        : null,
      familyGroupName: familyGroup?.name ?? null,
    };

    return profile;
  },
);
