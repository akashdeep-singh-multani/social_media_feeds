import { environment } from '../config/environment';
import { apiRequest } from '../utils/apiRequest';

export const updateProfile = (request) => {
  return apiRequest(`${environment.BASE_URL}user/edit`, 'PATCH', request);
};
