import type { Pagination } from '@/dtos';
import type { UserItem, UserList } from '@/dtos/User';
import axiosInstance, { type BaseResponse } from '@/plugins/axios';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '..';
import { resetMe } from './auth';

interface UsersState {
  loading: boolean;
  list: UserList[];
  item: UserItem | null;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

const initialState: UsersState = {
  loading: false,
  list: [],
  item: null,
  pagination: {
    page: 0,
    pageSize: 10,
    total: 0
  }
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<UserList[]>) => {
      state.list = action.payload;
    },
    setItem: (state, action: PayloadAction<UserItem>) => {
      state.item = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.pageSize = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(resetMe, (state) => {
      state.loading = false;
      state.list = [];
      state.item = null;
      state.pagination = initialState.pagination;
    });
    builder
      .addCase(requestUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestUsers.rejected, (state) => {
        state.list = [];
        state.item = null;
        state.pagination = initialState.pagination;
        state.loading = false;
      })
      .addCase(requestUsers.fulfilled, (state, action) => {
        if (action.payload) {
          state.list = action.payload.items;
          state.pagination = {
            page: action.payload.page,
            pageSize: action.payload.pageSize,
            total: action.payload.total
          };
        }
        state.loading = false;
      });
    builder
      .addCase(requestUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestUser.rejected, (state) => {
        state.item = null;
        state.loading = false;
      })
      .addCase(requestUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
  }
});

export const { setList, setItem, setPage, setPageSize } = usersSlice.actions;

export const requestUsers = createAppAsyncThunk('users/getList', async (data: { page: number; pageSize: number }) => {
  try {
    const response = await axiosInstance.get<undefined, BaseResponse<Pagination<UserList>>>('/users', {
      params: {
        page: data.page,
        pageSize: data.pageSize
      }
    });
    return response.data;
  } catch {
    return;
  }
});

export const requestUser = createAppAsyncThunk('users/getItem', async (id: string) => {
  try {
    const response = await axiosInstance.get<undefined, BaseResponse<UserItem>>(`/users/${id}`);
    return response.data;
  } catch {
    return;
  }
});
