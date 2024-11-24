import { environment } from "../config/environment";
import { apiRequest } from "../utils/apiRequest";

export const signupUser = async (request) => {
  return apiRequest(`${environment.BASE_URL}/signup`, "POST", request);
};

export const loginUser = async (request) => {
  return apiRequest(`${environment.BASE_URL}/login`, "POST", request);
};
