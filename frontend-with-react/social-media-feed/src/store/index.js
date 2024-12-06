import authReducer from './reducer/authReducer';

import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducer/postReducer';
import likesReducer from './reducer/likeReducer';
import { loaderReducer } from './reducer/loaderReducer';
import commentReducer from './reducer/commentReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postsReducer,
    likes: likesReducer,
    comment: commentReducer,
    loader: loaderReducer,
  },
});

export default store;
