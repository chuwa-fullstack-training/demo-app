import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import messageReducer from '../features/message/messageSlice';
import postReducer from '../features/post/postSlice';
import profileReducer from '../features/profile/profileSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    post: postReducer,
    profile: profileReducer,
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;