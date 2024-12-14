import {
  signupUser,
  loginUser,
  setToken,
  getToken,
  removeToken,
  getLoggedInUser,
} from '../authService';
import Cookies from 'js-cookie';
import { apiRequest } from '../../utils/apiRequest';
import { decodeJwtToken } from '../../utils/decode-jwt-token';

jest.mock('../../utils/apiRequest'); // Mocking the API request module
jest.mock('js-cookie'); // Mocking Cookies module

describe('Auth Service Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('signupUser should make an API request to sign up a user', async () => {
    const mockRequest = {
      username: 'user1',
      email: 'user1@example.com',
      password: 'password123',
    };
    const mockResponse = { token: 'jwt_token' };

    apiRequest.mockResolvedValue(mockResponse); // Mocking the API request success

    const response = await signupUser(mockRequest);

    expect(apiRequest).toHaveBeenCalledWith(
      'http://localhost:5000/auth/signup',
      'POST',
      mockRequest
    );
    expect(response).toEqual(mockResponse);
  });

  test('signupUser should handle API request failure', async () => {
    const mockRequest = {
      username: 'user1',
      email: 'user1@example.com',
      password: 'password123',
    };
    const mockError = { message: 'User already exists' };

    apiRequest.mockRejectedValue(mockError); // Mocking API request failure

    try {
      await signupUser(mockRequest);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });

  test('loginUser should make an API request to log in a user', async () => {
    const mockRequest = { username: 'user1', password: 'password123' };
    const mockResponse = { token: 'jwt_token' };

    apiRequest.mockResolvedValue(mockResponse); // Mocking the API request success

    const response = await loginUser(mockRequest);

    expect(apiRequest).toHaveBeenCalledWith(
      'http://localhost:5000/auth/login',
      'POST',
      mockRequest
    );
    expect(response).toEqual(mockResponse);
  });

  test('loginUser should handle API request failure', async () => {
    const mockRequest = { username: 'user1', password: 'wrongpassword' };
    const mockError = { message: 'Invalid credentials' };

    apiRequest.mockRejectedValue(mockError); // Mocking API request failure

    try {
      await loginUser(mockRequest);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });

  test('setToken should store JWT token in cookies', () => {
    const mockToken = 'jwt_token';

    setToken(mockToken);

    expect(Cookies.set).toHaveBeenCalledWith('jwt', mockToken, {
      expires: 7,
      secure: true,
      sameSite: 'Strict',
    });
  });

  test('getToken should retrieve JWT token from cookies', () => {
    const mockToken = 'jwt_token';
    Cookies.get.mockReturnValue(mockToken); // Mocking the cookie retrieval

    const token = getToken();

    expect(Cookies.get).toHaveBeenCalledWith('jwt');
    expect(token).toBe(mockToken);
  });

  test('removeToken should remove JWT token from cookies', () => {
    removeToken();

    expect(Cookies.remove).toHaveBeenCalledWith('jwt');
  });

  test('getLoggedInUser should decode the JWT token and return user info', () => {
    const mockToken = 'jwt_token';
    const mockUser = { username: 'user1', email: 'user1@example.com' };

    // Mock the decoding of JWT token
    decodeJwtToken.mockReturnValue({ user: mockUser });

    Cookies.get.mockReturnValue(mockToken); // Mocking the cookie retrieval

    const user = getLoggedInUser();

    expect(Cookies.get).toHaveBeenCalledWith('jwt');
    expect(decodeJwtToken).toHaveBeenCalledWith(mockToken);
    expect(user).toEqual(mockUser);
  });

  test('getLoggedInUser should return null if token is not found', () => {
    Cookies.get.mockReturnValue(null); // No token in cookies

    const user = getLoggedInUser();

    expect(user).toBeNull();
  });
});
