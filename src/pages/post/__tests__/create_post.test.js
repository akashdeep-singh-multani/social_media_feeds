import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import CreatePost from '../create_post';
import { addPost } from '../../../store/actions/postActions';
import { showLoader, hideLoader } from '../../../store/actions/loaderActions';
import postReducer from '../../store/reducers/postReducer';
import loaderReducer from '../../store/reducers/loaderReducer';
import * as ReactRedux from 'react-redux';
import { POST_CONTENT_PLACEHOLDER } from '../../constants';

// Mock the `useUser` hook to return a user object
jest.mock('../../hooks/useUser', () => ({
  useUser: () => ({
    user: { _id: 'user123' }, // Mock user data
  }),
}));

// Create a test store with the necessary reducers
const store = configureStore({
  reducer: {
    posts: postReducer,
    loader: loaderReducer,
  },
  preloadedState: {
    loader: { loading: false },
    posts: [],
  },
});

// Helper function to render the component with a router and store
const renderWithStoreAndRouter = () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/create_post']}>
        <Routes>
          <Route path="/create_post" element={<CreatePost />} />
          <Route path="/user_post" element={<div>User Posts</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('CreatePost Component', () => {
  test('renders CreatePost component correctly', () => {
    renderWithStoreAndRouter();

    // Check if the post content textarea is rendered
    const textarea = screen.getByPlaceholderText(POST_CONTENT_PLACEHOLDER);
    expect(textarea).toBeInTheDocument();

    // Check if the submit button is rendered
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  test('handles text input correctly', () => {
    renderWithStoreAndRouter();

    const textarea = screen.getByPlaceholderText(POST_CONTENT_PLACEHOLDER);
    fireEvent.change(textarea, { target: { value: 'New Post Content' } });

    expect(textarea.value).toBe('New Post Content');
  });

  test('handles image selection correctly', () => {
    renderWithStoreAndRouter();

    // Simulate selecting an image
    const image = new File(['image content'], 'image.jpg', {
      type: 'image/jpeg',
    });
    const photoInput = screen.getByLabelText(/add a photo/i);
    fireEvent.change(photoInput, { target: { files: [image] } });

    // Check if the selected image was set (you could extend this to verify further if the state updates as needed)
    expect(photoInput.files[0].name).toBe('image.jpg');
  });

  test('submits post and navigates to user post page', async () => {
    renderWithStoreAndRouter();

    // Find the textarea and submit button
    const textarea = screen.getByPlaceholderText(POST_CONTENT_PLACEHOLDER);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Fill in the post text
    fireEvent.change(textarea, { target: { value: 'Test post content' } });

    // Mock the navigate function
    const navigate = jest.fn();
    jest.spyOn(ReactRedux, 'useNavigate').mockImplementation(() => navigate);

    // Mock the dispatch method
    const mockDispatch = jest.fn();
    jest
      .spyOn(ReactRedux, 'useDispatch')
      .mockImplementation(() => mockDispatch);

    // Fire submit button click
    fireEvent.click(submitButton);

    // Check if the dispatch is called with the addPost action
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: addPost.type,
          payload: expect.any(FormData),
        })
      );

      // Check if loader actions are dispatched
      expect(mockDispatch).toHaveBeenCalledWith(showLoader());
      expect(mockDispatch).toHaveBeenCalledWith(hideLoader());

      // Check if navigate was called to route to '/user_post'
      expect(navigate).toHaveBeenCalledWith('/user_post');
    });
  });
});
