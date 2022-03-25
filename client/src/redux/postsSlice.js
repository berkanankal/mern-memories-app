import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/getAllPosts", () => {
  return axios.get("http://localhost:5013/posts").then((res) => res.data);
});

export const addPost = createAsyncThunk("posts/addPost", (newPost) => {
  return axios
    .post("http://localhost:5013/posts", newPost)
    .then((res) => {
      return res.data;
    })
    .catch((err) => err.response.data);
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  ({ currentId, formData }) => {
    return axios
      .put(`http://localhost:5013/posts/${currentId}`, formData)
      .then((res) => {
        return res.data;
      })
      .catch((err) => err.response.data);
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", (id) => {
  return axios
    .delete(`http://localhost:5013/posts/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => err.response.data);
});

export const likePost = createAsyncThunk("posts/likePost", (id) => {
  return axios
    .put(`http://localhost:5013/posts/${id}/like`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => err.response.data);
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    currentId: null,
    fetchPosts: {
      status: "idle",
      error: null,
    },
    addPost: {
      status: "idle",
      error: null,
    },
  },
  reducers: {
    setCurrentId: (state, action) => {
      state.currentId = action.payload;
    },
  },
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
    [updatePost.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.posts.data = state.posts.data.map((post) =>
        post._id === action.payload.data._id ? action.payload.data : post
      );
    },
    [deletePost.fulfilled]: (state, action) => {
      state.posts.data = state.posts.data.filter(
        (post) => post._id !== action.payload.data._id
      );
    },
    [likePost.fulfilled]: (state, action) => {
      state.posts.data = state.posts.data.map((post) =>
        post._id === action.payload.data._id ? action.payload.data : post
      );
    },
  },
});

export const { setCurrentId } = postsSlice.actions;

export default postsSlice.reducer;
