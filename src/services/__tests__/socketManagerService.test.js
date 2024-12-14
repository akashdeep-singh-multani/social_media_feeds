import { render, screen, waitFor } from '@testing-library/react';
import SocketManagerService from '../socketManagerService';
import { Subject } from 'rxjs';
import SocketService from '../socketService';
import React from 'react';

// Mocking SocketService
jest.mock('./socketService', () => {
  return jest.fn(() => ({
    newPostSubject: new Subject(),
    newPostLikesSubject: new Subject(),
    newPostCommentsSubject: new Subject(),
    notificationSubject: new Subject(),
    reconnect: jest.fn(),
    disconnect: jest.fn(),
  }));
});

describe('SocketManagerService', () => {
  let socketServiceMock;

  beforeEach(() => {
    socketServiceMock = SocketService(); // Get the mocked SocketService instance
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize and subscribe to socket streams', async () => {
    render(<SocketManagerService />);

    // Emit test events
    const newPost = { id: 1, title: 'New Post' };
    const newPostLike = { id: 1, postId: 1, userId: 1 };
    const newPostComment = {
      id: 1,
      postId: 1,
      userId: 1,
      comment: 'Nice Post!',
    };
    const notification = { message: 'You have a new follower' };

    socketServiceMock.newPostSubject.next(newPost);
    socketServiceMock.newPostLikesSubject.next(newPostLike);
    socketServiceMock.newPostCommentsSubject.next(newPostComment);
    socketServiceMock.notificationSubject.next(notification);

    // Assert that the state updates as expected
    await waitFor(() => {
      expect(screen.getByText('New Post')).toBeInTheDocument(); // From newPost
      expect(screen.getByText('Nice Post!')).toBeInTheDocument(); // From newPostComment
      expect(screen.getByText('You have a new follower')).toBeInTheDocument(); // From notification
    });
  });

  test('should call reconnect and disconnect correctly', async () => {
    render(<SocketManagerService />);

    // Test reconnect method call
    socketServiceMock.reconnect();
    expect(socketServiceMock.reconnect).toHaveBeenCalledTimes(1);

    // Simulate component unmount (cleanup)
    screen.unmount();
    expect(socketServiceMock.disconnect).toHaveBeenCalledTimes(1);
  });

  test('should clean up subscriptions on unmount', () => {
    const mockUnsubscribe = jest.fn();
    const subject = new Subject();
    subject.unsubscribe = mockUnsubscribe; // Mock unsubscribe

    render(<SocketManagerService />);

    // Simulate unmount
    screen.unmount();

    // Ensure that all subscriptions are cleaned up
    expect(mockUnsubscribe).toHaveBeenCalledTimes(4); // 4 subjects are being subscribed to
  });
});
