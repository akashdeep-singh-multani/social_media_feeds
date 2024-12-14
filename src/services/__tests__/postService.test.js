import { getPosts, addNewPost } from '../postService'; // Assuming these functions are in 'postService.js'
import { apiRequest } from '../../utils/apiRequest'; // Import the API request utility
import { environment } from '../../config/environment'; // Import environment configuration
import { POST_LIMIT, POST_OFFSET } from '../../constants'; // Import constants

jest.mock('../../utils/apiRequest'); // Mock the API request module

describe('Post Service Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getPosts should make an API request to fetch posts with correct parameters', async () => {
    const mockResponse = [
      { id: 1, title: 'First Post' },
      { id: 2, title: 'Second Post' },
    ];
    apiRequest.mockResolvedValue(mockResponse); // Mock the successful response

    const response = await getPosts();

    expect(apiRequest).toHaveBeenCalledWith(
      `${environment.BASE_URL}posts/posts?offset=${POST_OFFSET}&limit=${POST_LIMIT}`,
      'GET'
    );
    expect(response).toEqual(mockResponse);
  });

  test('addNewPost should make an API request to create a new post with correct payload', async () => {
    const mockRequest = { title: 'New Post', content: 'This is a new post.' };
    const mockResponse = {
      success: true,
      message: 'Post created successfully',
      postId: 123,
    };

    apiRequest.mockResolvedValue(mockResponse); // Mock the successful response

    const response = await addNewPost(mockRequest);

    expect(apiRequest).toHaveBeenCalledWith(
      `${environment.BASE_URL}posts/create`,
      'POST',
      mockRequest
    );
    expect(response).toEqual(mockResponse);
  });

  // Test error handling for getPosts
  test('getPosts should handle API request failure', async () => {
    const mockError = { message: 'Failed to fetch posts' };
    apiRequest.mockRejectedValue(mockError); // Mock the error response

    try {
      await getPosts();
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });

  // Test error handling for addNewPost
  test('addNewPost should handle API request failure', async () => {
    const mockRequest = { title: 'New Post', content: 'This is a new post.' };
    const mockError = { message: 'Failed to create post' };
    apiRequest.mockRejectedValue(mockError); // Mock the error response

    try {
      await addNewPost(mockRequest);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });
});
