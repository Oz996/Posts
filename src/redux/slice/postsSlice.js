import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
  id: "",
  title: "",
  body:""
}]

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
    addReaction(state,action){
      const { postId, reaction} = action.payload
      const existingPost = state.find(post => post.id === postId)
      if (existingPost){
        existingPost.reaction[reaction]++
      }
    }
  },
});

export const selectAllPosts = (state) => state.posts;

export const {addPost, removePost} = postsSlice.actions

export default postsSlice.reducer;
