import { useCallback } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import { Box, Heading, Button, Card, Caption, useTheme } from '@/design-system';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFamilyMember, removeMember, leaveFamilyGroup, deleteFamilyGroup, clearFamilyGroup } from '@/store/family-group';
import { updateFamilyGroup } from '@/store/user';
import { useApolloClientInstance } from '@/graphql';
import { MemberRow } from './MemberRow';
import { InviteMemberForm } from './InviteMemberForm';
import { PendingInvitationsList } from './PendingInvitationsList';

export function FamilyGroupDetails(): React.JSX.Element {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const apolloClient = useApolloClientInstance();
  const router = useRouter();
  const group = useAppSelector((state) => state.familyGroup.group);
  const familyGroupStatus = useAppSelector((state) => state.familyGroup.status);
  const userProfile = useAppSelector((state) => state.user.profile);
  const isOwner = userProfile?.familyRole === 'owner';

  const clearFamilyState = useCallback(() => {
    dispatch(clearFamilyGroup());
    dispatch(updateFamilyGroup({ familyGroupId: null, familyRole: null, familyGroupName: null }));
  }, [dispatch]);

  const handleRemoveMember = useCallback((memberId: number, memberName: string) => {
    Alert.alert(
      'Remove Member',
      `Are you sure you want to remove ${memberName} from the family group?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(removeFamilyMember({ memberId, apolloClient })).unwrap();
              dispatch(removeMember(memberId));
            } catch {
              // Error handled by thunk
            }
          },
        },
      ],
    );
  }, [dispatch, apolloClient]);

  const handleLeave = useCallback(() => {
    Alert.alert(
      'Leave Family Group',
      'Are you sure you want to leave? Your contributed recipes will remain in the family library.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(leaveFamilyGroup({ apolloClient })).unwrap();
              clearFamilyState();
            } catch {
              // Error handled by thunk
            }
          },
        },
      ],
    );
  }, [dispatch, apolloClient, clearFamilyState]);

  const handleDelete = useCallback(() => {
    Alert.alert(
      'Delete Family Group',
      'This will permanently delete the family group and all family recipes. All members will lose access. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(deleteFamilyGroup({ apolloClient })).unwrap();
              clearFamilyState();
            } catch {
              // Error handled by thunk
            }
          },
        },
      ],
    );
  }, [dispatch, apolloClient, clearFamilyState]);

  if (familyGroupStatus === 'loading' || !group) {
    return (
      <Box mt={4} alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );
  }

  return (
    <Box>
      <Heading.Regular>{group.name}</Heading.Regular>
      <Box mt={0.5}>
        <Caption.Regular color={colors.secondary}>
          {group.memberCount} {group.memberCount === 1 ? 'member' : 'members'}
        </Caption.Regular>
      </Box>

      <Box mt={3}>
        <Card title="Members">
          {group.members.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
              showRemove={isOwner && member.id !== userProfile?.id}
              onRemove={() => handleRemoveMember(member.id, `${member.firstName} ${member.lastName}`)}
            />
          ))}
        </Card>
      </Box>

      {isOwner ? (
        <>
          <Box mt={3}>
            <InviteMemberForm />
          </Box>
          <Box mt={3}>
            <PendingInvitationsList />
          </Box>
        </>
      ) : null}

      <Box mt={4} alignItems="center">
        {isOwner ? (
          <Button
            label="Delete Family Group"
            variant="ghost"
            color={colors.error}
            onPress={handleDelete}
          />
        ) : (
          <Button
            label="Leave Family Group"
            variant="ghost"
            color={colors.error}
            onPress={handleLeave}
          />
        )}
      </Box>
    </Box>
  );
}
