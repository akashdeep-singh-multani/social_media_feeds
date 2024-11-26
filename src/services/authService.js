import { environment } from "../config/environment";
import { apiRequest } from "../utils/apiRequest";
import Cookies from "js-cookie";

export const signupUser = async (request) => {
  return apiRequest(`${environment.BASE_URL}auth/signup`, "POST", request);
};

export const loginUser = async (request) => {
  return apiRequest(`${environment.BASE_URL}auth/login`, "POST", request);
};

export const setToken = (token) => {
  Cookies.set("jwt", token, {
    expires: 7,
    secure: true,
    sameSite: "Strict",
  });
};

export const getToken = () => {
  return Cookies.get("jwt");
};

export const removeToken = () => {
  Cookies.remove("jwt");
};
