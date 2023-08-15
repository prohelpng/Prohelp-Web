import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../store";

// Define a type for the slice state
interface MessageState {
  conversations: any;
}

// Define the initial state using that type
const initialState: MessageState = {
    conversations: [],
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<any>) => {
      state.conversations = action.payload;
    },
  },
});

export const { setConversations } = messageSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const getAuth = (state: RootState) => state.auth.isAuth;
// export const getProfile = (state: RootState) => state.auth.profile;

export default messageSlice.reducer;
