import { createSlice } from "@reduxjs/toolkit";

// Initial state for authentication slice
const initialAuthState = {
    status: false,
    userData: null,
};

// Initial state for posts slice
const initialPostsState = {
    posts: [],
    loading: true
};

// Auth slice
const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    },
});

// Posts slice
const postSlice = createSlice({
    name: "posts",
    initialState: initialPostsState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.loading = false;  // Set loading to false once posts are fetched
        },
        clearPosts: (state) => {
            state.posts = [];
        }
    }
});

// Export the actions from both slices
export const { login, logout } = authSlice.actions;
export const { setPosts } = postSlice.actions;

// Export the reducers for each slice
export const authReducer = authSlice.reducer;
export const postsReducer = postSlice.reducer;