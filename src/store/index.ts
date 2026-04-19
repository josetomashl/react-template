import { configureStore } from '@reduxjs/toolkit';

import { postsSlice } from '@/store/modules/posts';
import { rootSlice } from '@/store/modules/root';

export const store = configureStore({
  devTools: false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: {
    root: rootSlice.reducer,
    posts: postsSlice.reducer
  }
});
