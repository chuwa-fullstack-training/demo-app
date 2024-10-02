import { createCurrentUserProfile, getCurrentUserProfile, getGithubRepos, GithubRepo, Profile, ProfilePayload, updateCurrentUserProfile } from '@/api/profile';
import { KnownError } from '@/app/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
}

export const fetchUserProfile = createAsyncThunk<Profile, void, { rejectValue: KnownError }>(
  'user/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      return (await getCurrentUserProfile()) as Profile;
    } catch (err) {
      const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateUserProfile = createAsyncThunk<Profile, ProfilePayload, { rejectValue: KnownError }>(
  'user/updateUserProfile',
  async (profile, { rejectWithValue }) => {
    try {
      return (await updateCurrentUserProfile(profile)) as Profile;
    } catch (err) {
      const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const createUserProfile = createAsyncThunk<Profile, ProfilePayload, { rejectValue: KnownError }>(
  'user/createUserProfile',
  async (profile, { rejectWithValue }) => {
    try {
      return (await createCurrentUserProfile(profile)) as Profile;
    } catch (err) {
      const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchGithubRepos = createAsyncThunk<GithubRepo[], string, { rejectValue: KnownError }>(
  'user/fetchGithubRepos',
  async (username, { rejectWithValue }) => {
    try {
      return (await getGithubRepos(username)) as GithubRepo[];
    } catch (err) {
      const error: AxiosError<KnownError> = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState: ProfileState = {
  profile: null,
  loading: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUserProfile.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUserProfile.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    });
    builder.addCase(createUserProfile.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default profileSlice.reducer;
