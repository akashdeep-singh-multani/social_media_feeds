import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Signup from '../Signup';
import * as AuthActions from '../../../store/actions/authActions';

// Mocking the Redux store
const mockStore = configureStore({
  reducer: {
    auth: (state = { isLoggedIn: false }) => state, // Simple mock reducer
  },
});

jest.mock('../../store/actions/authActions', () => ({
  signup: jest.fn(),
}));

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

describe('Signup Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test('should render signup form with username, email, and password fields', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );

    // Check if input fields are present
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('should show validation errors when required fields are empty', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );

    // Simulate submitting the form without filling out fields
    fireEvent.click(screen.getByText(/signup/i));

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  test('should submit form and call signup action', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );

    // Simulate filling in the form
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'testuser@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    // Simulate submitting the form
    fireEvent.click(screen.getByText(/signup/i));

    await waitFor(() => {
      // Check if the signup action was called with the correct data
      expect(AuthActions.signup).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });
    });
  });

  test('should navigate to /user_post if user is already logged in', async () => {
    // Mock `useNavigate` and Redux state for logged-in user
    const mockNavigate = jest.fn();
    jest.mock('react-router', () => ({
      useNavigate: () => mockNavigate,
    }));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );

    // Simulate logged-in user in the Redux store
    store = mockStore({
      auth: { isLoggedIn: true },
    });

    // Ensure navigation is triggered if already logged in
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/user_post');
    });
  });
});
