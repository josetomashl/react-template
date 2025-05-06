import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  type: 'error' | 'warning' | 'success';
  content: string;
}

interface RootState {
  notification: NotificationState | null;
  isAuthenticated: boolean;
}

const initialState: RootState = {
  notification: null,
  isAuthenticated: false,
};

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<Omit<NotificationState, 'type'> & Partial<Pick<NotificationState, 'type'>>>
    ) => {
      state.notification = {
        type: action.payload.type ?? 'success',
        content: action.payload.content,
      };
    },
    hideNotification: (state) => {
      state.notification = null;
    },
    reset: (state) => {
      state.notification = initialState.notification;
      state.isAuthenticated = initialState.isAuthenticated;
    },
  },
});

export const { showNotification, hideNotification } = rootSlice.actions;
