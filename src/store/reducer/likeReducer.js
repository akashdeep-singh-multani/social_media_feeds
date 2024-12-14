const initialState = {
  postLikes: [],
  commentLikes: [],
  error: null,
};

const likesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_COMMENT_LIKE_SUCCESS':
      return {
        ...state,
        commentLikes: [...state.commentLikes, action.payload],
        error: null,
      };
    case 'GET_COMMENT_LIKES_SUCCESS':
      return {
        ...state,
        commentLikes: action.payload.likes,
        error: null,
      };
    case 'DELETE_COMMENT_LIKES_SUCCESS':
      return {
        ...state,
        commentLikes: state.commentLikes.filter(
          (like) => like.id !== action.payload.id
        ),
        error: null,
      };
    case 'CREATE_POST_LIKE_SUCCESS':
      return {
        ...state,
        postLikes: [...state.postLikes, action.payload],
        error: null,
      };
    case 'GET_POST_LIKES_SUCCESS':
      return {
        ...state,
        postLikes: action.postLikes,
        error: null,
      };
    case 'DELETE_POST_LIKE_SUCCESS':
      return {
        ...state,
        postLikes: state.postLikes.filter((like) => like.id !== action.payload),
        error: null,
      };
    case 'CREATE_COMMENT_LIKE_FAILURE':
    case 'DELETE_COMMENT_LIKE_FAILURE':
    case 'CREATE_POST_LIKE_FAILURE':
    case 'DELETE_POST_LIKE_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default likesReducer;
