import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { authSlice } from './modules/auth';
import { rootSlice } from './modules/root';
import { userSlice } from './modules/user';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: {
    root: rootSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
