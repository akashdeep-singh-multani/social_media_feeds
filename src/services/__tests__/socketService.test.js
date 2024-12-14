import { render, screen, waitFor } from '@testing-library/react';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';
import SocketService from '../socketService';
import React from 'react';

// Mock the socket.io-client library
jest.mock('socket.io-client', () => ({
  io: jest.fn(() => ({
    on: jest.fn(),
    off: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
  })),
}));

describe('SocketService', () => {
  let socketMock;
  let newPostSubject,
    newPostLikesSubject,
    newPostCommentsSubject,
    notificationSubject;

  beforeEach(() => {
    // Reset the mocks before each test
    socketMock = io();
    newPostSubject = new Subject();
    newPostLikesSubject = new Subject();
    newPostCommentsSubject = new Subject();
    notificationSubject = new Subject();

    // Mock the socket listeners
    socketMock.on.mockImplementation((event, callback) => {
      if (event === 'newPost') {
        newPostSubject.subscribe(callback);
      } else if (event === 'newPostComment') {
        newPostCommentsSubject.subscribe(callback);
      } else if (event === 'newPostLike') {
        newPostLikesSubject.subscribe(callback);
      } else if (event === 'notification') {
        notificationSubject.subscribe(callback);
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize socket listeners and update state on new events', async () => {
    render(<SocketService />);

    const newPost = { id: 1, title: 'New Post' };
    const newPostLike = { id: 1, postId: 1, userId: 1 };
    const newPostComment = {
      id: 1,
      postId: 1,
      userId: 1,
      comment: 'Nice Post!',
    };
    const notification = { message: 'You have a new follower' };

    // Simulate emitting socket events
    newPostSubject.next(newPost);
    newPostLikesSubject.next(newPostLike);
    newPostCommentsSubject.next(newPostComment);
    notificationSubject.next(notification);

    // Assert that the state has been updated
    await waitFor(() => {
      expect(screen.getByText('New Post')).toBeInTheDocument(); // From newPost
      expect(screen.getByText('Nice Post!')).toBeInTheDocument(); // From newPostComment
      expect(screen.getByText('You have a new follower')).toBeInTheDocument(); // From notification
    });
  });

  test('should call reconnect and disconnect correctly', async () => {
    render(<SocketService />);

    // Test reconnect method call
    socketMock.connect();
    expect(socketMock.connect).toHaveBeenCalledTimes(1);

    // Test disconnect method call
    socketMock.disconnect();
    expect(socketMock.disconnect).toHaveBeenCalledTimes(1);
  });

  test('should cleanup socket listeners on unmount', () => {
    const socketOffMock = jest.fn();
    socketMock.off = socketOffMock;

    render(<SocketService />);

    // Simulate unmount
    screen.unmount();

    // Ensure that all socket listeners are removed
    expect(socketOffMock).toHaveBeenCalledWith('newPost', expect.any(Function));
    expect(socketOffMock).toHaveBeenCalledWith(
      'newPostLike',
      expect.any(Function)
    );
    expect(socketOffMock).toHaveBeenCalledWith(
      'newPostComment',
      expect.any(Function)
    );
    expect(socketOffMock).toHaveBeenCalledWith(
      'notification',
      expect.any(Function)
    );
  });
});
