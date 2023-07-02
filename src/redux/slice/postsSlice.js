import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [
  {
    id: "",
    title: "",
    body: "",
    email: "",
    reactions: {
      thumbsUp: 0,
      cool: 0,
      wow: 0,
      funny: 0,
      love: 0,
    },
  },
];

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData) => {
    try {
      const res = await axios.post("http://localhost:3000/posts", postData);
      console.log(res.data)
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const showPosts = createAsyncThunk("posts/showPosts", async () => {
  const res = await axios.get("http://localhost:3000/posts");
  console.log(res.data)
  return res.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    removePost(state, action) {
      const postId = action.payload;
      return state.filter((post) => post.id !== postId);
    },
    incrementReaction(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    decrementReaction(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]--;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(showPosts.fulfilled, (state, action) => {
      return action.payload;
    })
  },
});

export const selectAllPosts = (state) => state.posts;

export const { removePost, incrementReaction, decrementReaction } =
  postsSlice.actions;

export default postsSlice.reducer;
