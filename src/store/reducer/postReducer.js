const initialState = {
  posts: [],
  error: null,
  allPostsLoaded: false,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case '[Post] Load Posts Success':
      if (action.posts.length === 0) {
        return {
          ...state,
          posts: [],
          error: null,
        };
      }
      return {
        ...state,
        posts: Array.isArray(action.posts) ? [...action.posts] : [],
        error: null,
      };

    case '[Post] Add Post Success':
      return {
        ...state,
        posts: [...state.posts, action.post],
        error: null,
      };

    case '[Post] Load Posts Failure':
    case '[Post] Add Post Failure':
      return {
        ...state,
        error: action.error,
      };

    case '[Post] Set All Posts Loaded':
      return {
        ...state,
        allPostsLoaded: action.loaded,
      };

    default:
      return state;
  }
};

export default postsReducer;
