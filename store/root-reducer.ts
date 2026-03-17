import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './user';
import { familyGroupReducer } from './family-group';

export const rootReducer = combineReducers({
  user: userReducer,
  familyGroup: familyGroupReducer,
});
