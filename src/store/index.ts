import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { authSlice } from './modules/auth';
import { postsSlice } from './modules/posts';
import { rootSlice } from './modules/root';
import { usersSlice } from './modules/users';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: {
    root: rootSlice.reducer,
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    posts: postsSlice.reducer
  }
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{ state: AppState; dispatch: AppDispatch }>();
