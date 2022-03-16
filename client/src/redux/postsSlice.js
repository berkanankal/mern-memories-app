import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/getAllPosts", () => {
  return axios.get("http://localhost:5013/posts").then((res) => res.data);
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.data.push(action.payload);
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = "succeeded";
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;
