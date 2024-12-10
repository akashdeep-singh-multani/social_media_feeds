import { environment } from '../config/environment';
import { apiRequest } from '../utils/apiRequest';

export const createNewPostLike = (request) => {
  return apiRequest(
    `${environment.BASE_URL}like/posts/${request.postId}/likes`,
    'POST',
    request
  );
};

export const getPostLikesData = (request) => {
  return apiRequest(
    `${environment.BASE_URL}like/posts/${request.postId}/likes`,
    'GET'
  );
};

export const deletePostLikesData = (request) => {
  return apiRequest(
    `${environment.BASE_URL}like/posts/${request.postId}/likes/${request.likeId}`,
    'DELETE'
  );
};

export const createNewCommentLike = (request) => {
  return apiRequest(
    `${environment.BASE_URL}like/comments/${request.commentId}/likes`,
    'POST',
    { userId: request.userId }
  );
};

export const getCommentLikesData = (request) => {
  return apiRequest(
    `${environment.BASE_URL}like/comments/${request.commentId}/likes`,
    'GET'
  );
};

export const deleteCommentLikesData = (request) => {
  return apiRequest(
    `${environment.BASE_URL}like/comments/${request.commentId}/likes/${request.likeId}`,
    'DELETE'
  );
};
