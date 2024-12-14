import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthForm from '../AuthForm';
import { FIELD_NAMES } from '../../constants';
import useAuthForm from '../../../hooks/useAuthForm';

// Mocking the useAuthForm hook to avoid dealing with its internals
jest.mock('../../hooks/useAuthForm', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('AuthForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockValidate = jest.fn();
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    // Reset the mock implementations before each test
    useAuthForm.mockReturnValue({
      formData: { username: '', email: '', password: '' },
      errors: {},
      isSubmitting: false,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    });
  });

  test('renders the form fields based on the fields prop', () => {
    render(
      <AuthForm
        actionName="Login"
        fields={[FIELD_NAMES.USERNAME, FIELD_NAMES.EMAIL, FIELD_NAMES.PASSWORD]}
        validate={mockValidate}
        onSubmit={mockOnSubmit}
      />
    );

    // Check if the form fields are rendered based on the fields prop
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('displays validation error messages', () => {
    useAuthForm.mockReturnValue({
      formData: { username: '', email: '', password: '' },
      errors: {
        username: 'Username is required',
        email: '',
        password: 'Password is required',
      },
      isSubmitting: false,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    });

    render(
      <AuthForm
        actionName="Login"
        fields={[FIELD_NAMES.USERNAME, FIELD_NAMES.EMAIL, FIELD_NAMES.PASSWORD]}
        validate={mockValidate}
        onSubmit={mockOnSubmit}
      />
    );

    // Check if the error messages are shown for username and password
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  test('calls handleSubmit and onSubmit when the form is submitted', async () => {
    render(
      <AuthForm
        actionName="Login"
        fields={[FIELD_NAMES.USERNAME, FIELD_NAMES.EMAIL, FIELD_NAMES.PASSWORD]}
        validate={mockValidate}
        onSubmit={mockOnSubmit}
      />
    );

    const usernameInput = screen.getByLabelText('Username');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /Login/i });

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Ensure handleSubmit was called
    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  test('disables submit button while submitting', () => {
    useAuthForm.mockReturnValue({
      formData: { username: '', email: '', password: '' },
      errors: {},
      isSubmitting: true,
      handleChange: mockHandleChange,
      handleSubmit: mockHandleSubmit,
    });

    render(
      <AuthForm
        actionName="Login"
        fields={[FIELD_NAMES.USERNAME, FIELD_NAMES.EMAIL, FIELD_NAMES.PASSWORD]}
        validate={mockValidate}
        onSubmit={mockOnSubmit}
      />
    );

    // Check if the submit button is disabled during submission
    const submitButton = screen.getByRole('button', { name: /Login/i });
    expect(submitButton).toBeDisabled();
  });

  test('enables submit button when not submitting', () => {
    render(
      <AuthForm
        actionName="Login"
        fields={[FIELD_NAMES.USERNAME, FIELD_NAMES.EMAIL, FIELD_NAMES.PASSWORD]}
        validate={mockValidate}
        onSubmit={mockOnSubmit}
      />
    );

    // Check if the submit button is enabled
    const submitButton = screen.getByRole('button', { name: /Login/i });
    expect(submitButton).toBeEnabled();
  });

  test('updates form data when input fields are changed', () => {
    render(
      <AuthForm
        actionName="Login"
        fields={[FIELD_NAMES.USERNAME, FIELD_NAMES.EMAIL, FIELD_NAMES.PASSWORD]}
        validate={mockValidate}
        onSubmit={mockOnSubmit}
      />
    );

    const usernameInput = screen.getByLabelText('Username');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Check that the form data updates as the user types
    expect(mockHandleChange).toHaveBeenCalledTimes(3); // Three inputs have been changed
  });
});
