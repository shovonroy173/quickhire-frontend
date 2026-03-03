import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ToastMessage {
  id: string;
  title: string;
  type: 'success' | 'error' | 'info';
}

interface UiState {
  toasts: ToastMessage[];
}

const initialState: UiState = {
  toasts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    pushToast: (state, action: PayloadAction<Omit<ToastMessage, 'id'>>) => {
      state.toasts.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        ...action.payload,
      });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { pushToast, removeToast } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
