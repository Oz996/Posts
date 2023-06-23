import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slice/postsSlice";
import userReducer from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
  },
});
