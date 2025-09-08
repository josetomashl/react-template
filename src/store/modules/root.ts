import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { resetMe } from './auth';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';
export interface NotificationItem {
  id: string;
  message: string;
  type: NotificationType;
}

interface RootState {
  notifications: NotificationItem[];
}

const initialState: RootState = {
  notifications: []
};

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    pushNotification: (state, action: PayloadAction<Omit<NotificationItem, 'id'>>) => {
      const id = `${Date.now()}`;
      state.notifications.push({ ...action.payload, id });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(resetMe, (state) => {
      state.notifications = [];
    });
  }
});

export const { pushNotification, removeNotification } = rootSlice.actions;
