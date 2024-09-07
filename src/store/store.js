import {configureStore} from '@reduxjs/toolkit';
import { authReducer, postsReducer } from './authSlice';

const store = configureStore({
    reducer: {
       posts: postsReducer,
       auth: authReducer
    }
});


export default store;