import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, AppState } from '@/store/hooks';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{ state: AppState; dispatch: AppDispatch }>();
