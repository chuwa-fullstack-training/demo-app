import { login } from '@/api/auth';
import { KnownError } from '@/app/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface UserState {
  isAuthenticated: boolean;
  token: string | null;
  currentUser: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
  } | null;
  loading: boolean;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

const initialState: UserState = {
  isAuthenticated: false,
  currentUser: null,
  token: null,
  loading: false,
};

export const loginUser = createAsyncThunk<LoginResponse, LoginPayload, { rejectValue: KnownError }>(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return (await login(credentials)) as LoginResponse;
    } catch (err) {
      const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<LoginResponse>) => {
      state.isAuthenticated = !!action.payload;
      state.currentUser = action.payload.user;
    },
    clearUser: (state) => {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.token);
      state.loading = false;
      state.isAuthenticated = true;
      state.currentUser = action.payload.user;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
