import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/store/store.tsx';
import { SIGN_IN, SIGN_UP } from '@/constants/constants.ts';

type AuthView = typeof SIGN_IN | typeof SIGN_UP;

type UserData = {
  view: AuthView;
};

const initialState: UserData = {
  view: SIGN_IN,
};

const userSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthView(state, actions: PayloadAction<AuthView>) {
      state.view = actions.payload;
    },
  },
});

export const { setAuthView } = userSlice.actions;

export const selectAuthView = (state: RootState) => state.user;

export default userSlice.reducer;
