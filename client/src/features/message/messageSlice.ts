import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageState {
  content: string | null;
  type: 'success' | 'error' | 'info' | 'warning' | null;
}

const initialState: MessageState = {
  content: null,
  type: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<MessageState>) => {
      state.content = action.payload.content;
      state.type = action.payload.type;
    },
    clearMessage: (state) => {
      state.content = null;
      state.type = null;
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;