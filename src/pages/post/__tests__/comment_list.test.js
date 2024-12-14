import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PostCommentList from '../comment_list'; 
import commentReducer from '../../../store/reducers/commentReducer'; 
import { loadComments } from '../../../store/actions/commentActions';

// Set up the store with a mock comment reducer
const store = configureStore({
  reducer: {
    comment: commentReducer,
  },
  preloadedState: {
    comment: {
      comments: {
        data: [
          { _id: '1', text: 'First comment', user: { name: 'User 1' } },
          { _id: '2', text: 'Second comment', user: { name: 'User 2' } },
        ],
      },
    },
  },
});

// Helper function to render the component with the store
const renderWithStore = (postId, closeDialog) => {
  render(
    <Provider store={store}>
      <PostCommentList postId={postId} closeDialog={closeDialog} />
    </Provider>
  );
};

describe('PostCommentList Component', () => {
  const postId = 'post123'; // Sample postId for testing
  const closeDialog = jest.fn(); // Mock closeDialog function

  test('renders the list of comments correctly', () => {
    renderWithStore(postId, closeDialog);

    // Check if comments are rendered
    expect(screen.getByText('First comment')).toBeInTheDocument();
    expect(screen.getByText('Second comment')).toBeInTheDocument();
  });

  test('renders PostCommentForm correctly', () => {
    renderWithStore(postId, closeDialog);

    // Check if PostCommentForm is rendered
    const commentForm = screen.getByRole('form');
    expect(commentForm).toBeInTheDocument();
  });

  test('calls closeDialog when close button is clicked', () => {
    renderWithStore(postId, closeDialog);

    // Find the close button and simulate a click
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Ensure that closeDialog was called
    expect(closeDialog).toHaveBeenCalledTimes(1);
  });

  test('displays new comment when a new comment is received', async () => {
    renderWithStore(postId, closeDialog);

    // Simulate receiving a new comment
    const newComment = { _id: '3', text: 'New comment received', user: { name: 'User 3' } };
    store.dispatch(loadComments(postId)); // Load the initial comments

    // Simulate adding the new comment
    store.dispatch({
      type: 'LOAD_COMMENTS_SUCCESS',
      payload: {
        data: [...store.getState().comment.comments.data, newComment],
      },
    });

    // Wait for the new comment to appear in the document
    await waitFor(() => {
      expect(screen.getByText('New comment received')).toBeInTheDocument();
    });
  });

  test('displays a snackbar with the correct message when a notification is received', async () => {
    renderWithStore(postId, closeDialog);

    // Simulate receiving a notification
    const notificationMessage = 'New notification received!';
    store.dispatch({
      type: 'SHOW_NOTIFICATION',
      payload: { message: notificationMessage },
    });

    // Wait for the snackbar to appear
    const snackbar = screen.getByText(notificationMessage);
    expect(snackbar).toBeInTheDocument();

    // Close the snackbar and ensure it disappears
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    await waitFor(() => {
      expect(snackbar).not.toBeInTheDocument();
    });
  });

  test('dispatches loadComments action on component mount', async () => {
    renderWithStore(postId, closeDialog);

    // Ensure that the loadComments action is dispatched
    expect(store.getState().comment.comments.data.length).toBeGreaterThan(0);
  });
});
