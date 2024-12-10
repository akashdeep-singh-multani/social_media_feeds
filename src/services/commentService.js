import { environment } from '../config/environment';
import { apiRequest } from '../utils/apiRequest';

export const addCommentData = (request) => {
  return apiRequest(`${environment.BASE_URL}comments/create`, 'POST', request);
};

export const getComments = (postId) => {
  return apiRequest(`${environment.BASE_URL}comments/load/${postId}`, 'GET');
};
