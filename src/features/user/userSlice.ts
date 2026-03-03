import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AUTH_STORAGE_KEY } from '@/lib/constants';
import { User } from './types';

interface UserState {
  token: string | null;
  currentUser: User | null;
}

const getInitialToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY);
};

const initialState: UserState = {
  token: getInitialToken(),
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.currentUser = action.payload.user;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(AUTH_STORAGE_KEY, action.payload.token);
      }
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    clearCredentials: (state) => {
      state.token = null;
      state.currentUser = null;
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    },
  },
});

export const { clearCredentials, setCredentials, setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
