import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders social media feed link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Social Media Feed/i); // Adjusted regex for correct text
  expect(linkElement).toBeInTheDocument();
});
