import { addCommentData, getComments } from '../../services/commentService';

export const addComment = (commentRequest) => async (dispatch) => {
  try {
    const response = await addCommentData(commentRequest);
    if (response.status) {
      dispatch({
        type: 'ADD_COMMENT_SUCCESS',
        payload: response.data,
      });
    } else {
      dispatch({
        type: 'ADD_COMMENT_FAILURE',
        error: 'Failed to add comment',
      });
    }
  } catch (error) {
    dispatch({
      type: 'ADD_COMMENT_FAILURE',
      error: error.message,
    });
  }
};

export const loadComments = (postId) => async (dispatch) => {
  try {
    const response = await getComments(postId);
    if (response.status) {
      dispatch({
        type: 'LOAD_COMMENTS_SUCCESS',
        payload: response.data,
      });
    } else {
      dispatch({
        type: 'LOAD_COMMENTS_FAILURE',
        error: 'Failed to load comments',
      });
    }
  } catch (error) {
    dispatch({
      type: 'LOAD_COMMENTS_FAILURE',
      error: error.message,
    });
  }
};
