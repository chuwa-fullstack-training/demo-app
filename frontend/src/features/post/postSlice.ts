import { KnownError } from '@/app/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getPostById, getPosts, likePost as likePostApi } from '@/api/post';

export interface Post {
  _id: string;
  text: string;
  name: string;
  avatar: string;
  likes: {
    user: string;
    _id: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PostState {
  posts: Post[];
  currentPost: Post | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  currentPost: null,
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[], void, { rejectValue: KnownError }>(
  'post/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPosts();
      return response;
    } catch (err) {
      const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
      console.log(error)
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchPostById = createAsyncThunk<Post, string, { rejectValue: KnownError }>(
  'post/fetchPostById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getPostById(id);
      return response;
    } catch (err) {
      const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const likePost = createAsyncThunk<Post['likes'], string, { rejectValue: KnownError }>(
  'post/likePost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await likePostApi(postId);
      return response;
    } catch (err) {
      const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);



const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(fetchPostById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
        state.status = 'succeeded';
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch post';
      });
  },
});

export default postSlice.reducer;
