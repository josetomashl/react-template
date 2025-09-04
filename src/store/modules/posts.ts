import type { Pagination } from '@/dtos';
import type { PostItem, PostList } from '@/dtos/Post';
import axiosInstance, { type BaseResponse } from '@/plugins/axios';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '..';
import { resetMe } from './auth';

interface PostsState {
  loading: boolean;
  list: PostList[];
  item: PostItem | null;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

const initialState: PostsState = {
  loading: false,
  list: [],
  item: null,
  pagination: {
    page: 0,
    pageSize: 10,
    total: 0
  }
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
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
      .addCase(requestPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestPosts.rejected, (state) => {
        state.list = [];
        state.item = null;
        state.pagination = initialState.pagination;
        state.loading = false;
      })
      .addCase(requestPosts.fulfilled, (state, action) => {
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
      .addCase(requestPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestPost.rejected, (state) => {
        state.item = null;
        state.loading = false;
      })
      .addCase(requestPost.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.rejected, (state) => {
        state.item = null;
        state.loading = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload;
        }
        state.loading = false;
      });
  }
});

export const { setPage, setPageSize } = postsSlice.actions;

export const requestPosts = createAppAsyncThunk('posts/getList', async (data: { page: number; pageSize: number }) => {
  try {
    const response = await axiosInstance.get<undefined, BaseResponse<Pagination<PostList>>>('/posts', {
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

export const requestPost = createAppAsyncThunk('posts/getItem', async (id: string) => {
  try {
    const response = await axiosInstance.get<undefined, BaseResponse<PostItem>>(`/posts/${id}`);
    return response.data;
  } catch {
    return;
  }
});

export const createPost = createAppAsyncThunk('posts/postItem', async (data: { title: string; content: string }) => {
  try {
    const response = await axiosInstance.post<undefined, BaseResponse<PostItem>>(`/posts`, data);
    return response.data;
  } catch {
    return;
  }
});
