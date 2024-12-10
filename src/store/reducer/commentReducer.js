const initialState = {
  comments: [],
  error: null,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_COMMENTS_SUCCESS':
      return {
        ...state,
        comments: action.comment,
        error: null,
      };
    case 'ADD_COMMENT_SUCCESS':
      return {
        ...state,
        comments: [...state.comments, action.comment],
        error: null,
      };
    case 'LOAD_COMMENTS_FAILURE':
    case 'ADD_COMMENT_FAILURE':
      return {
        ...state,
        error: action.comment,
      };
    default:
      return state;
  }
};

export default commentReducer;
