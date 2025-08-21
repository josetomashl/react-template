import type { AuthResponse, LoginRequest, RefreshRequest, RegisterRequest } from '@/dtos/Auth';
import type { UserItem } from '@/dtos/User';
import axiosInstance, { type BaseResponse } from '@/plugins/axios';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  loading: boolean;
  me: UserItem | null;
}

const initialState: AuthState = {
  loading: false,
  me: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateMe: (state, action: PayloadAction<UserItem>) => {
      state.me = action.payload;
    },
    resetMe: (state) => {
      state.me = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestLogin.rejected, (state) => {
        state.me = null;
        state.loading = false;
      })
      .addCase(requestLogin.fulfilled, (state, action) => {
        if (action.payload) {
          state.me = action.payload.customer;
        }
        state.loading = false;
      });
    builder
      .addCase(requestRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestRegister.rejected, (state) => {
        state.me = null;
        state.loading = false;
      })
      .addCase(requestRegister.fulfilled, (state, action) => {
        if (action.payload) {
          state.me = action.payload.customer;
        }
        state.loading = false;
      });
    builder
      .addCase(requestRefresh.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestRefresh.rejected, (state) => {
        state.me = null;
        state.loading = false;
      })
      .addCase(requestRefresh.fulfilled, (state, action) => {
        if (action.payload) {
          state.me = action.payload.customer;
        }
        state.loading = false;
      });
  }
});

export const { updateMe, resetMe } = authSlice.actions;

export const requestLogin = createAsyncThunk('requestLogin', async (payload: LoginRequest) => {
  try {
    const response = await axiosInstance.post<LoginRequest, BaseResponse<AuthResponse>>('/login', payload);
    return response.data;
  } catch {
    return;
  }
});
export const requestRegister = createAsyncThunk('requestRegister', async (payload: RegisterRequest) => {
  try {
    const response = await axiosInstance.post<RegisterRequest, BaseResponse<AuthResponse>>('/register', payload);
    return response.data;
  } catch {
    return;
  }
});
export const requestRefresh = createAsyncThunk('requestRefresh', async (payload: RefreshRequest) => {
  try {
    const response = await axiosInstance.post<RefreshRequest, BaseResponse<AuthResponse>>('/refresh', payload);
    return response.data;
  } catch {
    return;
  }
});
