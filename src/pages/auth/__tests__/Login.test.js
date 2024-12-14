import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Login';
import configureStore from 'redux-mock-store';
import * as AuthActions from '../../../store/actions/authActions';
import { ACTION_NAMES, VALIDATION_MESSAGES } from '../../../constants';
import useAuthForm from '../../../hooks/useAuthForm';

// Mocking necessary hooks and actions
jest.mock('../../hooks/useAuthForm', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../store/actions/authActions', () => ({
  login: jest.fn(),
}));

const mockStore = configureStore([]);
const store = mockStore({
  auth: { isLoggedIn: false }, // Adjust to match the actual state structure
});

describe('Login Component', () => {
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Mock useAuthForm hook to avoid actual form logic
    useAuthForm.mockReturnValue({
      formData: { username: '', password: '' },
      errors: {},
      isSubmitting: false,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    });
  });

  test('renders the login form with fields for username and password', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('displays validation error messages when form is submitted with empty fields', async () => {
    useAuthForm.mockReturnValue({
      formData: { username: '', password: '' },
      errors: {
        username: VALIDATION_MESSAGES.USERNAME_REQUIRED,
        password: VALIDATION_MESSAGES.PASSWORD_REQUIRED,
      },
      isSubmitting: false,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: ACTION_NAMES.LOGIN }));

    expect(
      await screen.findByText(VALIDATION_MESSAGES.USERNAME_REQUIRED)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(VALIDATION_MESSAGES.PASSWORD_REQUIRED)
    ).toBeInTheDocument();
  });

  test('dispatches login action when form is submitted with valid data', async () => {
    const validFormData = { username: 'testuser', password: 'password123' };
    useAuthForm.mockReturnValue({
      formData: validFormData,
      errors: {},
      isSubmitting: false,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Simulate form submission
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: ACTION_NAMES.LOGIN }));

    await waitFor(() => {
      expect(AuthActions.login).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
      });
    });
  });

  test('redirects user to /user_post after successful login', async () => {
    const storeWithLoggedInUser = mockStore({
      auth: { isLoggedIn: true },
    });

    render(
      <Provider store={storeWithLoggedInUser}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/user_post');
    });
  });

  test('disables the submit button during form submission', () => {
    useAuthForm.mockReturnValue({
      formData: { username: 'testuser', password: 'password123' },
      errors: {},
      isSubmitting: true,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const submitButton = screen.getByRole('button', {
      name: ACTION_NAMES.LOGIN,
    });
    expect(submitButton).toBeDisabled();
  });

  test('enables the submit button when not submitting', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const submitButton = screen.getByRole('button', {
      name: ACTION_NAMES.LOGIN,
    });
    expect(submitButton).toBeEnabled();
  });
});
