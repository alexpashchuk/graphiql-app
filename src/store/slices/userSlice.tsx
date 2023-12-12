import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store.tsx';

type UserView = 'sign-in' | 'sign-up';

type UserData = {
  name: string;
  email: string;
  view: UserView;
};

const initialState: UserData = {
  name: '',
  email: '',
  view: 'sign-in',
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser(state, actions: PayloadAction<UserData>) {
      state.email = actions.payload.email;
      state.name = actions.payload.name;
    },
    setUserView(state, actions: PayloadAction<UserView>) {
      state.view = actions.payload;
    },
    removeUser(state) {
      state.name = '';
      state.email = '';
    },
  },
});

export const { setUser, setUserView, removeUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
