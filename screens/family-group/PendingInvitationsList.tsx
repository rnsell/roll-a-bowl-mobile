import { useCallback, useState } from 'react';

import { Box, Button, Card, Caption, Paragraph, Row, useTheme } from '@/design-system';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { cancelFamilyInvitation, removeInvitation } from '@/store/family-group';
import { useApolloClientInstance } from '@/graphql';

export function PendingInvitationsList(): React.JSX.Element | null {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const apolloClient = useApolloClientInstance();
  const invitations = useAppSelector((state) => state.familyGroup.invitations);
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  const pendingInvitations = invitations.filter((inv) => inv.status === 'PENDING');

  const handleCancel = useCallback(async (invitationId: number) => {
    setCancellingId(invitationId);
    try {
      await dispatch(cancelFamilyInvitation({ invitationId, apolloClient })).unwrap();
      dispatch(removeInvitation(invitationId));
    } catch {
      // Error handling — invitation may already be cancelled
    } finally {
      setCancellingId(null);
    }
  }, [dispatch, apolloClient]);

  if (pendingInvitations.length === 0) return null;

  return (
    <Card title="Pending Invitations">
      {pendingInvitations.map((inv) => (
        <Row key={inv.id} py={1} px={2} alignItems="center" justifyContent="space-between">
          <Box flex={1}>
            <Paragraph.Regular>{inv.invitedEmail}</Paragraph.Regular>
            <Caption.Small color={colors.secondary}>
              Expires {new Date(inv.expiresAt).toLocaleDateString()}
            </Caption.Small>
          </Box>
          <Button
            label={cancellingId === inv.id ? '...' : 'Cancel'}
            variant="ghost"
            color={colors.error}
            onPress={() => handleCancel(inv.id)}
            disabled={cancellingId === inv.id}
          />
        </Row>
      ))}
    </Card>
  );
}
