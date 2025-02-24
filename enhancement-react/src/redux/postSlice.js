import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: {
    pst: [],
    isPending: false,
    error: null,
  },
};

export const postList = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      console.log("this is response data", response);
      return response.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPosts",
  async (newpost, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, newpost);
      return response.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePosts",
  async ({ id, updatepost }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatepost);
      return response.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/removePosts",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch post
    builder
      .addCase(postList.pending, (state) => {
        state.posts.pst = [];
        state.posts.isPending = true;
        state.posts.error = null;
      })
      .addCase(postList.fulfilled, (state, action) => {
        state.posts.pst = action.payload;
        state.posts.isPending = false;
        state.posts.error = null;
      })
      .addCase(postList.rejected, (state, action) => {
        state.posts.pst = [];
        state.posts.isPending = false;
        state.posts.error = action.payload;
      })
      // create post
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.pst.push(action.payload);
      })

      // update post
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.pst.findIndex(
          (element) => element.id === action.payload.id
        );
        console.log("this is index value",index);
        
        if (index !== -1) {
          state.posts.pst[index] = action.payload;
        }
      })

      // delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts.pst = state.posts.pst.filter(
          (pst) => pst.id !== action.payload
        );
      });
  },
});

export default postSlice.reducer;
