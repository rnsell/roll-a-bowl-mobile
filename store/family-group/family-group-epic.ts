import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApolloClient } from '@apollo/client';

import {
  CreateFamilyGroup,
  GetMyFamilyGroup,
  GetFamilyGroupInvitations,
  InviteFamilyMember,
  CancelFamilyInvitation,
  RemoveFamilyMember,
  LeaveFamilyGroup,
  DeleteFamilyGroup,
} from '@/graphql/operations';
import type { FamilyGroup, FamilyInvitation } from './family-group-types';

interface ThunkDeps {
  apolloClient: ApolloClient;
}

export const createFamilyGroup = createAsyncThunk<
  FamilyGroup,
  { name: string } & ThunkDeps
>(
  'familyGroup/create',
  async ({ name, apolloClient }) => {
    const result = await apolloClient.mutate({
      mutation: CreateFamilyGroup,
      variables: { input: { name } },
    });
    const group = result.data?.createFamilyGroup;
    if (!group) throw new Error('Failed to create family group');

    // Re-fetch full group with members
    const fullResult = await apolloClient.query({
      query: GetMyFamilyGroup,
      fetchPolicy: 'network-only',
    });
    const fullGroup = fullResult.data?.myFamilyGroup;
    if (!fullGroup) throw new Error('Failed to fetch created group');

    return {
      id: fullGroup.id,
      name: fullGroup.name,
      slug: fullGroup.slug,
      memberCount: fullGroup.memberCount,
      createdAt: fullGroup.createdAt,
      members: fullGroup.members.map((m) => ({
        id: m.id,
        firstName: m.firstName,
        lastName: m.lastName,
        email: m.email,
        role: m.role as 'OWNER' | 'MEMBER',
        createdAt: m.createdAt,
      })),
      owner: {
        id: fullGroup.owner.id,
        firstName: fullGroup.owner.firstName,
        lastName: fullGroup.owner.lastName,
        email: fullGroup.owner.email,
        role: fullGroup.owner.role as 'OWNER' | 'MEMBER',
        createdAt: fullGroup.owner.createdAt,
      },
    };
  },
);

export const fetchFamilyGroup = createAsyncThunk<
  { group: FamilyGroup; invitations: FamilyInvitation[] },
  ThunkDeps
>(
  'familyGroup/fetch',
  async ({ apolloClient }) => {
    const [groupResult, invitationsResult] = await Promise.all([
      apolloClient.query({ query: GetMyFamilyGroup, fetchPolicy: 'network-only' }),
      apolloClient.query({ query: GetFamilyGroupInvitations, fetchPolicy: 'network-only' }).catch(() => null),
    ]);

    const fg = groupResult.data?.myFamilyGroup;
    if (!fg) throw new Error('No family group found');

    const group: FamilyGroup = {
      id: fg.id,
      name: fg.name,
      slug: fg.slug,
      memberCount: fg.memberCount,
      createdAt: fg.createdAt,
      members: fg.members.map((m) => ({
        id: m.id,
        firstName: m.firstName,
        lastName: m.lastName,
        email: m.email,
        role: m.role as 'OWNER' | 'MEMBER',
        createdAt: m.createdAt,
      })),
      owner: {
        id: fg.owner.id,
        firstName: fg.owner.firstName,
        lastName: fg.owner.lastName,
        email: fg.owner.email,
        role: fg.owner.role as 'OWNER' | 'MEMBER',
        createdAt: fg.owner.createdAt,
      },
    };

    const invitations: FamilyInvitation[] = (invitationsResult?.data?.familyGroupInvitations ?? []).map((inv) => ({
      id: inv.id,
      invitedEmail: inv.invitedEmail,
      status: inv.status as FamilyInvitation['status'],
      expiresAt: inv.expiresAt,
      createdAt: inv.createdAt,
    }));

    return { group, invitations };
  },
);

export const inviteFamilyMember = createAsyncThunk<
  FamilyInvitation,
  { email: string } & ThunkDeps
>(
  'familyGroup/invite',
  async ({ email, apolloClient }) => {
    const result = await apolloClient.mutate({
      mutation: InviteFamilyMember,
      variables: { input: { email } },
    });
    const inv = result.data?.inviteFamilyMember;
    if (!inv) throw new Error('Failed to send invitation');
    return {
      id: inv.id,
      invitedEmail: inv.invitedEmail,
      status: inv.status as FamilyInvitation['status'],
      expiresAt: inv.expiresAt,
      createdAt: inv.createdAt,
    };
  },
);

export const cancelFamilyInvitation = createAsyncThunk<
  number,
  { invitationId: number } & ThunkDeps
>(
  'familyGroup/cancelInvitation',
  async ({ invitationId, apolloClient }) => {
    await apolloClient.mutate({
      mutation: CancelFamilyInvitation,
      variables: { invitationId },
    });
    return invitationId;
  },
);

export const removeFamilyMember = createAsyncThunk<
  number,
  { memberId: number } & ThunkDeps
>(
  'familyGroup/removeMember',
  async ({ memberId, apolloClient }) => {
    await apolloClient.mutate({
      mutation: RemoveFamilyMember,
      variables: { memberId },
    });
    return memberId;
  },
);

export const leaveFamilyGroup = createAsyncThunk<
  void,
  ThunkDeps
>(
  'familyGroup/leave',
  async ({ apolloClient }) => {
    await apolloClient.mutate({ mutation: LeaveFamilyGroup });
  },
);

export const deleteFamilyGroup = createAsyncThunk<
  void,
  ThunkDeps
>(
  'familyGroup/delete',
  async ({ apolloClient }) => {
    await apolloClient.mutate({ mutation: DeleteFamilyGroup });
  },
);
