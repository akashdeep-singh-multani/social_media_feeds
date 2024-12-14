import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import UserPost from '../user_posts';
import { loadPost } from '../../store/actions/postActions';
import postReducer from '../../store/reducers/postReducer';
import likeReducer from '../../store/reducers/likeReducer';
import * as SocketManagerService from '../../services/socketManagerService';

import {
  getPostLikes,
  createPostLike,
  deletePostLike,
} from '../../store/actions/likeActions'; // Real actions

// Create a real store using @reduxjs/toolkit
const store = configureStore({
  reducer: {
    posts: postReducer,
    postLikes: likeReducer,
  },
  preloadedState: {
    posts: [
      {
        _id: '1',
        text: 'This is a post',
        image: 'image.jpg',
        userId: { name: 'John Doe', avatar: 'avatar.jpg' },
      },
    ],
    postLikes: [{ _id: 'like1', postId: '1' }],
  },
});

describe('UserPost Component', () => {
  beforeEach(() => {
    // Reset state if needed
  });

  test('renders UserPost component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserPost />
        </MemoryRouter>
      </Provider>
    );

    // Check if the create post button is rendered
    const createPostButton = screen.getByRole('button', {
      name: /create post/i,
    });
    expect(createPostButton).toBeInTheDocument();

    // Check if the post content is rendered
    const postText = screen.getByText(/this is a post/i);
    expect(postText).toBeInTheDocument();

    // Check if the like button is rendered
    const likeButton = screen.getByLabelText(/like this post/i);
    expect(likeButton).toBeInTheDocument();
  });

  test('calls getPostLikes on mount', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserPost />
        </MemoryRouter>
      </Provider>
    );

    // In a real test, this would interact with your Redux store's actions
    expect(getPostLikes).toHaveBeenCalled();
  });

  test('handles like toggle functionality', async () => {
    const mockDispatch = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserPost />
        </MemoryRouter>
      </Provider>
    );

    const likeButton = screen.getByLabelText(/like this post/i);

    // Simulate a like button click
    fireEvent.click(likeButton);
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        createPostLike(expect.any(Object))
      )
    );

    // Simulate an un-like button click
    fireEvent.click(likeButton);
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        deletePostLike(expect.any(Object))
      )
    );
  });

  test('handles comment button click', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserPost />
        </MemoryRouter>
      </Provider>
    );

    // Initially, the comment dialog should not be open
    expect(screen.queryByText('No Posts yet')).toBeInTheDocument();

    const commentButton = screen.getByLabelText(/comment on this post/i);
    fireEvent.click(commentButton);

    // After clicking, the dialog should open
    const commentDialog = screen.queryByText('No Posts yet');
    expect(commentDialog).not.toBeInTheDocument();
  });

  test('handles new post event via socket', async () => {
    // Setup mock for SocketManagerService with real implementation
    const mockNewPost = { _id: '2', text: 'New post via socket' };
    SocketManagerService.newPostReceivedSource.subscribe.mockImplementation(
      (callback) => {
        callback(mockNewPost);
      }
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserPost />
        </MemoryRouter>
      </Provider>
    );

    // Simulate new post being received through socket
    await waitFor(() =>
      expect(store.dispatch).toHaveBeenCalledWith(
        loadPost({ offset: 0, limit: 10, userId: 'user123' })
      )
    );
  });
});
