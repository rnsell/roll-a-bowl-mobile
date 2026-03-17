export interface FamilyMember {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'OWNER' | 'MEMBER';
  createdAt: string;
}

export interface FamilyGroup {
  id: number;
  name: string;
  slug: string;
  memberCount: number;
  createdAt: string;
  members: FamilyMember[];
  owner: FamilyMember;
}

export type InvitationStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED' | 'CANCELLED';

export interface FamilyInvitation {
  id: number;
  invitedEmail: string;
  status: InvitationStatus;
  expiresAt: string;
  createdAt: string;
}

export type FamilyGroupStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface FamilyGroupState {
  group: FamilyGroup | null;
  invitations: FamilyInvitation[];
  status: FamilyGroupStatus;
  error: string | null;
}
