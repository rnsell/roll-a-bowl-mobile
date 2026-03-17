import { graphql } from '../generated';

// ─── Queries ─────────────────────────────────────────────────────────

export const GetFamilyGroupInvitations = graphql(`
  query GetFamilyGroupInvitations {
    familyGroupInvitations {
      id
      invitedEmail
      status
      expiresAt
      createdAt
    }
  }
`);

export const GetFamilyRecipes = graphql(`
  query GetFamilyRecipes {
    familyRecipes {
      id
      name
      slug
      instructions
      sourceUrl
      contributedByUserId
      lastModifiedByUserId
      createdAt
      updatedAt
    }
  }
`);

export const GetFamilyRecipe = graphql(`
  query GetFamilyRecipe($slug: String!) {
    familyRecipe(slug: $slug) {
      id
      name
      slug
      instructions
      sourceUrl
      contributedByUserId
      lastModifiedByUserId
      createdAt
      updatedAt
    }
  }
`);

// ─── Family Group Mutations ──────────────────────────────────────────

export const CreateFamilyGroup = graphql(`
  mutation CreateFamilyGroup($input: CreateFamilyGroupInput!) {
    createFamilyGroup(input: $input) {
      id
      name
      slug
      memberCount
      createdAt
    }
  }
`);

export const DeleteFamilyGroup = graphql(`
  mutation DeleteFamilyGroup {
    deleteFamilyGroup
  }
`);

// ─── Invitation Mutations ────────────────────────────────────────────

export const InviteFamilyMember = graphql(`
  mutation InviteFamilyMember($input: InviteFamilyMemberInput!) {
    inviteFamilyMember(input: $input) {
      id
      invitedEmail
      status
      expiresAt
      createdAt
    }
  }
`);

export const CancelFamilyInvitation = graphql(`
  mutation CancelFamilyInvitation($invitationId: Int!) {
    cancelFamilyInvitation(invitationId: $invitationId)
  }
`);

// ─── Membership Mutations ────────────────────────────────────────────

export const RemoveFamilyMember = graphql(`
  mutation RemoveFamilyMember($memberId: Int!) {
    removeFamilyMember(memberId: $memberId)
  }
`);

export const LeaveFamilyGroup = graphql(`
  mutation LeaveFamilyGroup {
    leaveFamilyGroup
  }
`);

// ─── Family Recipe Mutations ─────────────────────────────────────────

export const ShareRecipeToFamily = graphql(`
  mutation ShareRecipeToFamily($input: ShareRecipeToFamilyInput!) {
    shareRecipeToFamily(input: $input) {
      id
      name
      slug
      contributedByUserId
      createdAt
    }
  }
`);

export const CreateFamilyRecipe = graphql(`
  mutation CreateFamilyRecipe($input: CreateFamilyRecipeInput!) {
    createFamilyRecipe(input: $input) {
      id
      name
      slug
      contributedByUserId
      createdAt
    }
  }
`);

export const UpdateFamilyRecipe = graphql(`
  mutation UpdateFamilyRecipe($input: UpdateFamilyRecipeInput!) {
    updateFamilyRecipe(input: $input) {
      id
      name
      slug
      instructions
      lastModifiedByUserId
      updatedAt
    }
  }
`);

export const DeleteFamilyRecipe = graphql(`
  mutation DeleteFamilyRecipe($slug: String!) {
    deleteFamilyRecipe(slug: $slug)
  }
`);
