import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/getAllPosts", () => {
  return axios.get("http://localhost:5013/posts").then((res) => res.data);
});

export const addPost = createAsyncThunk("posts/addPost", (newMovie) => {
  return axios
    .post("http://localhost:5013/posts", newMovie)
    .then((res) => {
      return res.data;
    })
    .catch((err) => err.response.data);
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    fetchPosts: {
      status: "idle",
      error: null,
    },
    addPost: {
      status: "idle",
      error: null,
    },
  },
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.fetchPosts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.fetchPosts.status = "succeeded";
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.fetchPosts.error = action.error.message;
    },
    [addPost.pending]: (state) => {
      state.addPost.status = "loading";
    },
    [addPost.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.posts.data.push(action.payload.data);
      } else {
        state.addPost.error = action.payload.message;
      }
    },
    [addPost.rejected]: (state, action) => {
      state.addPost.error = action.error.message;
    },
  },
});

export default postsSlice.reducer;
