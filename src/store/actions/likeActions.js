import {
  createNewCommentLike,
  deleteCommentLikesData,
  getCommentLikesData,
  getPostLikesData,
  deletePostLikesData,
  createNewPostLike,
} from '../../services/likeService';

export const createCommentLike = (commentId, userId) => async (dispatch) => {
  try {
    const like = await createNewCommentLike(commentId, userId);
    dispatch({
      type: 'CREATE_COMMENT_LIKE_SUCCESS',
      payload: like,
    });
  } catch (error) {
    dispatch({
      type: 'CREATE_COMMENT_LIKE_FAILURE',
      payload: error,
    });
  }
};

export const getCommentLikes = (commentId) => async (dispatch) => {
  try {
    const commentLikes = await getCommentLikesData(commentId);
    dispatch({ type: 'GET_COMMENT_LIKES_SUCCESS', payload: commentLikes });
  } catch (error) {
    dispatch({ type: 'GET_COMMENT_LIKES_FAILURE', payload: error });
  }
};

export const deleteCommentLike = (commentId, likeId) => async (dispatch) => {
  try {
    await deleteCommentLikesData(commentId, likeId);
    dispatch({ type: 'DELETE_COMMENT_LIKE_SUCCESS', payload: likeId });
  } catch (error) {
    dispatch({ type: 'DELETE_COMMENT_LIKE_FAILURE', payload: error });
  }
};

export const createPostLike = (postId, userId) => async (dispatch) => {
  try {
    const response = await createNewPostLike(postId, userId);
    dispatch({ type: 'CREATE_POST_LIKE_SUCCESS', payload: response.data[0] });
  } catch (error) {
    dispatch({ type: 'CREATE_POST_LIKE_FAILURE', payload: error });
  }
};

export const getPostLikes = (postId) => async (dispatch) => {
  try {
    const postLikes = await getPostLikesData(postId);
    dispatch({ type: 'GET_POST_LIKES_SUCCESS', payload: postLikes.data });
  } catch (error) {
    dispatch({ type: 'GET_POST_LIKES_FAILURE', payload: error });
  }
};

export const deletePostLike = (postId, likeId) => async (dispatch) => {
  try {
    await deletePostLikesData(postId, likeId);
    dispatch({ type: 'DELETE_POST_LIKE_SUCCESS', payload: likeId });
  } catch (error) {
    dispatch({ type: 'DELETE_POST_LIKE_FAILURE', payload: error });
  }
};
