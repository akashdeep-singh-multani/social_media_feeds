import { environment } from '../config/environment';
import { POST_LIMIT, POST_OFFSET } from '../constants';
import { apiRequest } from '../utils/apiRequest';

export const getPosts = async () => {
  return apiRequest(
    `${environment.BASE_URL}posts/posts?offset=${POST_OFFSET}&limit=${POST_LIMIT}`,
    'GET'
  );
};

export const addNewPost = async (request) => {
  return apiRequest(`${environment.BASE_URL}posts/create`, 'POST', request);
};
