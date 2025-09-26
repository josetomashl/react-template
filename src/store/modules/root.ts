import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface NotificationItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
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
  }
});

export const { pushNotification, removeNotification } = rootSlice.actions;
