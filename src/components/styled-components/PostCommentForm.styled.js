import styled from 'styled-components';

// Wrapper for the entire comment form
export const CommentFormWrapper = styled.form`
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
`;

// Wrapper for the input and button to be aligned in one line
export const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%; // Make the input and button take up full width available
`;

// Style for the input field
export const CommentInput = styled.input`
  flex-grow: 1; // Make the input take up all available space
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 10px;
`;

// Wrapper for the submit button
export const SubmitButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

// Style for the submit button
export const SubmitButton = styled.button`
  background-color: #1877f2; /* Facebook's primary blue */
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  height: 40px; /* Align the button with the input box height */

  &:hover {
    background-color: #166fe5;
  }

  &:active {
    background-color: #145dbf;
  }

  &:disabled {
    background-color: #d0d0d0;
    cursor: not-allowed;
  }
`;
