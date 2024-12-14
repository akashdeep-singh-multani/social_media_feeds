import {
  createNewPostLike,
  getPostLikesData,
  deletePostLikesData,
  createNewCommentLike,
  getCommentLikesData,
  deleteCommentLikesData,
} from '../likeService';
import { apiRequest } from '../../utils/apiRequest'; // Import the API request utility
import { environment } from '../../config/environment'; // Import environment configuration

jest.mock('../../utils/apiRequest'); // Mocking the API request module

describe('Like Service Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createNewPostLike should make an API request to create a post like', async () => {
    const mockRequest = { postId: '123', userId: '1' };
    const mockResponse = { success: true, message: 'Like added successfully' };

    apiRequest.mockResolvedValue(mockResponse); // Mock the successful response

    const response = await createNewPostLike(mockRequest);

    expect(apiRequest).toHaveBeenCalledWith(
      `${environment.BASE_URL}like/posts/${mockRequest.postId}/likes`,
      'POST',
      mockRequest
    );
    expect(response).toEqual(mockResponse);
  });

  test('getPostLikesData should make an API request to get post likes data', async () => {
    const mockRequest = { postId: '123' };
    const mockResponse = [
      { likeId: '1', userId: '1' },
      { likeId: '2', userId: '2' },
    ];

    apiRequest.mockResolvedValue(mockResponse); // Mock the successful response

    const response = await getPostLikesData(mockRequest);

    expect(apiRequest).toHaveBeenCalledWith(
      `${environment.BASE_URL}like/posts/${mockRequest.postId}/likes`,
      'GET'
    );
    expect(response).toEqual(mockResponse);
  });

  test('deletePostLikesData should make an API request to delete a post like', async () => {
    const mockRequest = { postId: '123', likeId: '1' };
    const mockResponse = {
      success: true,
      message: 'Like removed successfully',
    };

    apiRequest.mockResolvedValue(mockResponse); // Mock the successful response

    const response = await deletePostLikesData(mockRequest);

    expect(apiRequest).toHaveBeenCalledWith(
      `${environment.BASE_URL}like/posts/${mockRequest.postId}/likes/${mockRequest.likeId}`,
      'DELETE'
    );
    expect(response).toEqual(mockResponse);
  });

  test('createNewCommentLike should make an API request to create a comment like', async () => {
    const mockRequest = { commentId: '456', userId: '1' };
    const mockResponse = {
      success: true,
      message: 'Comment like added successfully',
    };

    apiRequest.mockResolvedValue(mockResponse); // Mock the successful response

    const response = await createNewCommentLike(mockRequest);

    expect(apiRequest).toHaveBeenCalledWith(
      `${environment.BASE_URL}like/comments/${mockRequest.commentId}/likes`,
      'POST',
      { userId: mockRequest.userId }
    );
    expect(response).toEqual(mockResponse);
  });

  test('getCommentLikesData should make an API request to get comment likes data', async () => {
    const mockRequest = { commentId: '456' };
    const mockResponse = [
      { likeId: '1', userId: '1' },
      { likeId: '2', userId: '2' },
    ];

    apiRequest.mockResolvedValue(mockResponse); // Mock the successful response

    const response = await getCommentLikesData(mockRequest);

    expect(apiRequest).toHaveBeenCalledWith(
      `${environment.BASE_URL}like/comments/${mockRequest.commentId}/likes`,
      'GET'
    );
    expect(response).toEqual(mockResponse);
  });

  test('deleteCommentLikesData should make an API request to delete a comment like', async () => {
    const mockRequest = { commentId: '456', likeId: '1' };
    const mockResponse = {
      success: true,
      message: 'Comment like removed successfully',
    };

    apiRequest.mockResolvedValue(mockResponse); // Mock the successful response

    const response = await deleteCommentLikesData(mockRequest);

    expect(apiRequest).toHaveBeenCalledWith(
      `${environment.BASE_URL}like/comments/${mockRequest.commentId}/likes/${mockRequest.likeId}`,
      'DELETE'
    );
    expect(response).toEqual(mockResponse);
  });

  // Test error handling for each function
  test('createNewPostLike should handle API request failure', async () => {
    const mockRequest = { postId: '123', userId: '1' };
    const mockError = { message: 'Failed to add like' };

    apiRequest.mockRejectedValue(mockError); // Mock the error response

    try {
      await createNewPostLike(mockRequest);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });

  test('getPostLikesData should handle API request failure', async () => {
    const mockRequest = { postId: '123' };
    const mockError = { message: 'Failed to fetch likes' };

    apiRequest.mockRejectedValue(mockError); // Mock the error response

    try {
      await getPostLikesData(mockRequest);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });

  test('deletePostLikesData should handle API request failure', async () => {
    const mockRequest = { postId: '123', likeId: '1' };
    const mockError = { message: 'Failed to remove like' };

    apiRequest.mockRejectedValue(mockError); // Mock the error response

    try {
      await deletePostLikesData(mockRequest);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });

  test('createNewCommentLike should handle API request failure', async () => {
    const mockRequest = { commentId: '456', userId: '1' };
    const mockError = { message: 'Failed to add comment like' };

    apiRequest.mockRejectedValue(mockError); // Mock the error response

    try {
      await createNewCommentLike(mockRequest);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });

  test('getCommentLikesData should handle API request failure', async () => {
    const mockRequest = { commentId: '456' };
    const mockError = { message: 'Failed to fetch comment likes' };

    apiRequest.mockRejectedValue(mockError); // Mock the error response

    try {
      await getCommentLikesData(mockRequest);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });

  test('deleteCommentLikesData should handle API request failure', async () => {
    const mockRequest = { commentId: '456', likeId: '1' };
    const mockError = { message: 'Failed to remove comment like' };

    apiRequest.mockRejectedValue(mockError); // Mock the error response

    try {
      await deleteCommentLikesData(mockRequest);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });
});
