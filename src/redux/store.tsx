import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./reducers/loader";
import authReducer from "./reducers/auth";
import usersReducer from "./reducers/users";
import jobReducer from "./reducers/jobs";
import messageReducer from "./reducers/messages";
import legalReducer from "./reducers/legal"
import professionReducer from "./reducers/profession";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
    users: usersReducer,
    jobs: jobReducer,
    legal: legalReducer,
    messages: messageReducer,
    professions: professionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
