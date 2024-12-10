import { addCommentData, getComments } from '../../services/commentService';
import { hideLoader, showLoader } from './loaderActions';

export const addComment = (commentRequest) => async (dispatch) => {
  try {
    const response = await addCommentData(commentRequest);
    if (response.status) {
      dispatch({
        type: 'ADD_COMMENT_SUCCESS',
        comment: response.data,
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
  console.log('postId in loadComments: ' + JSON.stringify(postId));
  try {
    dispatch(showLoader());
    const response = await getComments(postId);
    console.log('comments load action: ' + JSON.stringify(response));
    if (response.status) {
      dispatch(hideLoader());
      dispatch({
        type: 'LOAD_COMMENTS_SUCCESS',
        comment: response.data,
      });
    } else {
      dispatch(hideLoader());
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
