import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import messageReducer from '../features/message/messageSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;