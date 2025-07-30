import type { AuthResponse, LoginRequest, RefreshRequest, RegisterRequest } from '@/dtos/Auth';
import type { User } from '@/dtos/User';
import axiosInstance from '@/plugins/axios';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  loading: boolean;
  me: User | null;
}

const initialState: AuthState = {
  loading: false,
  me: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateMe: (state, action: PayloadAction<User | null>) => {
      state.me = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestLogin.rejected, (state) => {
        state.loading = false;
        state.me = null;
      })
      .addCase(requestLogin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.me = action.payload.user;
        }
      });
    builder
      .addCase(requestRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestRegister.rejected, (state) => {
        state.loading = false;
        state.me = null;
      })
      .addCase(requestRegister.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.me = action.payload.user;
        }
      });
    builder
      .addCase(requestRefresh.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestRefresh.rejected, (state) => {
        state.loading = false;
        state.me = null;
      })
      .addCase(requestRefresh.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.me = action.payload.user;
        }
      });
  }
});

export const { updateMe } = authSlice.actions;

export const requestLogin = createAsyncThunk('requestLogin', async (payload: LoginRequest) => {
  try {
    const response = await axiosInstance.post<LoginRequest, AuthResponse>('/login', payload);
    return response;
  } catch {
    return;
  }
});
export const requestRegister = createAsyncThunk('requestRegister', async (payload: RegisterRequest) => {
  try {
    const response = await axiosInstance.post<RegisterRequest, AuthResponse>('/register', payload);
    console.log('succ', response);

    return response;
  } catch {
    return;
  }
});
export const requestRefresh = createAsyncThunk('requestRefresh', async (payload: RefreshRequest) => {
  try {
    const response = await axiosInstance.post<RefreshRequest, AuthResponse>('/refresh', payload);
    return response;
  } catch {
    return;
  }
});
