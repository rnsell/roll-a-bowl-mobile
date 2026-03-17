import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FamilyGroup, FamilyGroupState, FamilyInvitation } from './family-group-types';
import { fetchFamilyGroup } from './family-group-epic';

const initialState: FamilyGroupState = {
  group: null,
  invitations: [],
  status: 'idle',
  error: null,
};

export const familyGroupSlice = createSlice({
  name: 'familyGroup',
  initialState,
  reducers: {
    setFamilyGroupLoading(state) {
      state.status = 'loading';
      state.error = null;
    },
    setFamilyGroup(state, action: PayloadAction<FamilyGroup>) {
      state.group = action.payload;
      state.status = 'ready';
      state.error = null;
    },
    setFamilyGroupInvitations(state, action: PayloadAction<FamilyInvitation[]>) {
      state.invitations = action.payload;
    },
    addInvitation(state, action: PayloadAction<FamilyInvitation>) {
      state.invitations.push(action.payload);
    },
    removeInvitation(state, action: PayloadAction<number>) {
      state.invitations = state.invitations.filter((inv) => inv.id !== action.payload);
    },
    removeMember(state, action: PayloadAction<number>) {
      if (state.group) {
        state.group.members = state.group.members.filter((m) => m.id !== action.payload);
        state.group.memberCount = state.group.members.length;
      }
    },
    setFamilyGroupError(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.error = action.payload;
    },
    clearFamilyGroup() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFamilyGroup.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFamilyGroup.fulfilled, (state, action) => {
        state.group = action.payload.group;
        state.invitations = action.payload.invitations;
        state.status = 'ready';
        state.error = null;
      })
      .addCase(fetchFamilyGroup.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Failed to load family group';
      });
  },
});

export const {
  setFamilyGroupLoading,
  setFamilyGroup,
  setFamilyGroupInvitations,
  addInvitation,
  removeInvitation,
  removeMember,
  setFamilyGroupError,
  clearFamilyGroup,
} = familyGroupSlice.actions;

export default familyGroupSlice.reducer;
