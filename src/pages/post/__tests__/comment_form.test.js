import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PostCommentForm from '../comment_form';
import { addComment } from '../../../store/actions/commentActions';
import commentReducer from '../../../store/reducers/commentReducer';
import { showLoader, hideLoader } from '../../store/actions/loaderActions';
import { useUser } from '../../../hooks/useUser';

// Mocking the `useUser` hook
jest.mock('../../hooks/useUser', () => ({
  useUser: jest.fn(),
}));

// Set up the store with a mock comment reducer
const store = configureStore({
  reducer: {
    comment: commentReducer,
  },
});

describe('PostCommentForm Component', () => {
  const postId = 'post123';
  const mockUser = { _id: 'user123' }; // Mock user data
  const mockDispatch = jest.fn();

  // Mock the useUser hook to return a user object
  beforeEach(() => {
    useUser.mockReturnValue({ user: mockUser });
    store.dispatch = mockDispatch;
  });

  test('renders the comment input and submit button', () => {
    render(
      <Provider store={store}>
        <PostCommentForm postId={postId} />
      </Provider>
    );

    // Check if the comment input is rendered
    const commentInput = screen.getByPlaceholderText('Add a comment');
    expect(commentInput).toBeInTheDocument();

    // Check if the submit button is rendered
    const submitButton = screen.getByRole('button', { name: /post/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled(); // Submit button should be disabled initially
  });

  test('enables the submit button when a comment is typed', () => {
    render(
      <Provider store={store}>
        <PostCommentForm postId={postId} />
      </Provider>
    );

    const commentInput = screen.getByPlaceholderText('Add a comment');
    const submitButton = screen.getByRole('button', { name: /post/i });

    // Simulate user typing a comment
    fireEvent.change(commentInput, {
      target: { value: 'This is a test comment' },
    });

    // Check that the submit button is now enabled
    expect(submitButton).toBeEnabled();
  });

  test('dispatches addComment when the form is submitted', async () => {
    render(
      <Provider store={store}>
        <PostCommentForm postId={postId} />
      </Provider>
    );

    const commentInput = screen.getByPlaceholderText('Add a comment');
    const submitButton = screen.getByRole('button', { name: /post/i });

    // Simulate user typing a comment
    fireEvent.change(commentInput, { target: { value: 'Test comment' } });

    // Simulate form submission
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Check if the addComment action is dispatched
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: addComment.type,
          payload: expect.objectContaining({
            postId,
            text: 'Test comment',
            commenterId: mockUser._id,
          }),
        })
      );

      // Check if the loader actions are dispatched
      expect(mockDispatch).toHaveBeenCalledWith(showLoader());
      expect(mockDispatch).toHaveBeenCalledWith(hideLoader());
    });
  });

  test('does not submit the form if comment is empty', async () => {
    render(
      <Provider store={store}>
        <PostCommentForm postId={postId} />
      </Provider>
    );

    const commentInput = screen.getByPlaceholderText('Add a comment');
    const submitButton = screen.getByRole('button', { name: /post/i });

    // Simulate user typing an empty comment
    fireEvent.change(commentInput, { target: { value: '' } });

    // Check that the submit button is disabled
    expect(submitButton).toBeDisabled();

    // Try submitting the form
    fireEvent.click(submitButton);

    // Ensure that addComment is not called
    await waitFor(() => {
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });

  test('displays the loader during comment submission', async () => {
    render(
      <Provider store={store}>
        <PostCommentForm postId={postId} />
      </Provider>
    );

    const commentInput = screen.getByPlaceholderText('Add a comment');
    const submitButton = screen.getByRole('button', { name: /post/i });

    // Simulate user typing a comment
    fireEvent.change(commentInput, { target: { value: 'Test comment' } });

    // Ensure that showLoader is dispatched before the comment is added
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(showLoader());
    });
  });
});
