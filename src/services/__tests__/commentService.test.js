import { addCommentData, getComments } from './commentService'; // Import the functions
import { apiRequest } from '../../utils/apiRequest'; // Import the API request utility
import { environment } from '../../config/environment'; // Import environment configuration

jest.mock('../../utils/apiRequest'); // Mocking the API request module

describe('Comment Service Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('addCommentData should make an API request to add a comment', async () => {
    const mockRequest = {
      postId: '123',
      userId: '1',
      content: 'This is a comment',
    };
    const mockResponse = {
      success: true,
      message: 'Comment added successfully',
    };

    apiRequest.mockResolvedValue(mockResponse); // Mock the successful response

    const response = await addCommentData(mockRequest);

    expect(apiRequest).toHaveBeenCalledWith(
      `${environment.BASE_URL}comments/create`,
      'POST',
      mockRequest
    );
    expect(response).toEqual(mockResponse);
  });

  test('addCommentData should handle API request failure', async () => {
    const mockRequest = {
      postId: '123',
      userId: '1',
      content: 'This is a comment',
    };
    const mockError = { message: 'Failed to add comment' };

    apiRequest.mockRejectedValue(mockError); // Mock the error response

    try {
      await addCommentData(mockRequest);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });

  test('getComments should make an API request to get comments for a post', async () => {
    const mockPostId = '123';
    const mockResponse = [
      { commentId: '1', userId: '1', content: 'This is a comment' },
      { commentId: '2', userId: '2', content: 'This is another comment' },
    ];

    apiRequest.mockResolvedValue(mockResponse); // Mock the successful response

    const response = await getComments(mockPostId);

    expect(apiRequest).toHaveBeenCalledWith(
      `${environment.BASE_URL}comments/load/${mockPostId}`,
      'GET'
    );
    expect(response).toEqual(mockResponse);
  });

  test('getComments should handle API request failure', async () => {
    const mockPostId = '123';
    const mockError = { message: 'Failed to fetch comments' };

    apiRequest.mockRejectedValue(mockError); // Mock the error response

    try {
      await getComments(mockPostId);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });
});
