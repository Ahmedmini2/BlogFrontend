import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPost, getPosts , deletePost , createPost as apiCreatePost , updatePostApi } from '../services/api';

// Async thunk for fetching paginated posts
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ page, pageSize }, { rejectWithValue }) => {
    try {
      const response = await getPosts(page, pageSize);
      return {
        posts: response.data.posts,
        totalPages: response.data.totalPages,
        totalCount: response.data.totalCount,

      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getPost(id); // Fetch the single post
      return response.data; // Return the post data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, updatedPost }, { rejectWithValue }) => {
    try {
      const response = await updatePostApi(id, updatedPost); // Call your update API
      return response.data; // Return the updated post data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteThePost = createAsyncThunk(
  'posts/deletePost',
  async (id, { rejectWithValue }) => {
    try {
      await deletePost(id); // Call the API to delete the post
      return id; // Return the ID of the deleted post
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating a new post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (newPost, { rejectWithValue }) => {
    try {
      const response = await apiCreatePost(newPost); // Call the API to create a post
      return response.data; // Return the created post
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    post: {}, // Initialize an object for a single post
    loading: false,
    error: null,
    page: 1,
    pageSize: 10,
    totalPages: 1,
    totalCount: 1,
  },
  reducers: {
    incrementPage: (state) => {
      if (state.page < state.totalPages) {
        state.page += 1; // Increment page number
      }
    },
    decrementPage: (state) => {
      if (state.page > 1) {
        state.page -= 1; // Decrement page number
      }
    },
    resetPosts: (state) => {
      state.posts = [];
      state.page = 1;
      state.totalPages = 1;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteThePost.fulfilled, (state, action) => {
        // Remove the deleted post from the state
        state.posts = state.posts.filter(post => post.id !== action.payload);
        state.post = {}; // Clear the post details if the deleted post was displayed
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        // Append the new posts to the existing posts array
        state.posts = [...state.posts, ...action.payload.posts];
        state.totalPages = action.payload.totalPages;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
      })
      .addCase(fetchPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload; 
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
      })
      
      .addCase(deleteThePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
      })
      
      
  },
});

// Export actions and reducer
export const { incrementPage, decrementPage, resetPosts } = postsSlice.actions;
export default postsSlice.reducer;