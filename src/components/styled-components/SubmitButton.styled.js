// src/styled-components/Button.styled.js
import styled from 'styled-components';

// Facebook-inspired button
export const Button = styled.button`
  background-color: #1877f2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;

  /* Disabled state */
  &:disabled {
    background-color: #d0d0d0;
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Hover effect */
  &:hover {
    background-color: #166fe5; /* Darker blue on hover */
  }

  /* Active state (pressed effect) */
  &:active {
    background-color: #145dbf; /* Even darker blue on active */
    transform: scale(0.98); /* Slightly scale down the button */
  }

  /* Focus state */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(24, 119, 242, 0.3); /* Subtle focus ring */
  }
`;
