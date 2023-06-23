import { createSlice } from "@reduxjs/toolkit";

const initialState = [{ id: "1", title: "test", body: "bla bla bla bla" }];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action) {
      state.push(action.payload);
    },
    removePost(state, action) {
      const postId = action.payload;
      return state.filter((post) => post.id !== postId);
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const {addPost, removePost} = postsSlice.actions

export default postsSlice.reducer;
