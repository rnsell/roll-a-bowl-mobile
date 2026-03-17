import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserState } from './user-types';
import { bootstrapUser } from './user-epic';

const initialState: UserState = {
  profile: null,
  status: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser() {
      return initialState;
    },
    updateFamilyGroup(
      state,
      action: PayloadAction<{
        familyGroupId: number | null;
        familyRole: 'owner' | 'member' | null;
        familyGroupName: string | null;
      }>,
    ) {
      if (state.profile) {
        state.profile.familyGroupId = action.payload.familyGroupId;
        state.profile.familyRole = action.payload.familyRole;
        state.profile.familyGroupName = action.payload.familyGroupName;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bootstrapUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(bootstrapUser.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'ready';
        state.error = null;
      })
      .addCase(bootstrapUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Failed to load user data';
      });
  },
});

export const { clearUser, updateFamilyGroup } = userSlice.actions;
export default userSlice.reducer;
