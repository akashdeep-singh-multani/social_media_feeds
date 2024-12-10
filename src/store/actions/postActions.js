import { addNewPost, getPosts } from '../../services/postService';

export const loadPost = () => async (dispatch) => {
  try {
    const response = await getPosts();
    const posts = response.data;
    console.log('posts in actions: ' + JSON.stringify(posts));
    dispatch({
      type: '[Post] Load Posts Success',
      posts,
    });
  } catch (error) {
    dispatch({
      type: '[Post] Load Posts Failure',
      error,
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  try {
    const response = await addNewPost(formData);
    const post = response.data;
    dispatch({
      type: '[Post] Add Post Success',
      post,
    });
  } catch (error) {
    dispatch({
      type: '[Post] Add Post Failure',
      error,
    });
  }
};

export const setAllPostsLoaded = (loaded) => ({
  type: '[Post] Set All Posts Loaded',
  loaded,
});
