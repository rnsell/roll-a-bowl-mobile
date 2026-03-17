export type FamilyRole = 'owner' | 'member';

export interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isPremium: boolean;
  familyGroupId: number | null;
  familyRole: FamilyRole | null;
  familyGroupName: string | null;
}

export type UserStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface UserState {
  profile: UserProfile | null;
  status: UserStatus;
  error: string | null;
}
