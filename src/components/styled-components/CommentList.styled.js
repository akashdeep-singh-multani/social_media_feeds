import styled from 'styled-components';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
export const CommentListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
  background-color: #fafafa;
  border-radius: 10px;
`;

// Wrapper for the Dialog
export const DialogWrapper = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

// Dialog Title
export const DialogTitleWrapper = styled(DialogTitle)`
  font-size: 18px;
  font-weight: bold;
  padding: 16px 24px;
  border-bottom: 1px solid #e0e0e0;
`;

// Dialog Content Wrapper (for comments list and form)
export const DialogContentWrapper = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
`;

// Comments List Wrapper
export const CommentsList = styled.div`
  flex-grow: 1;
  margin-bottom: 12px;
  overflow-y: auto;
  max-height: 300px; /* Limit the height of the comments list */
`;

// Individual Comment Item Wrapper
export const CommentItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px;
  border-bottom: 1px solid #e1e1e1;
  &:last-child {
    border-bottom: none;
  }
`;
export const AvatarImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 12px;
`;
export const UserInfoWrapper = styled.div`
  flex-grow: 1;
`;
export const Username = styled.h3`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin: 0;
  display: inline-block;
`;

// Comment Text Styling
export const CommentText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0 0;
`;

// Close Button Styling (Dialog action)
export const DialogActionsWrapper = styled(DialogActions)`
  padding: 12px 16px;
  border-top: 1px solid #e0e0e0;
`;

// Close Button
export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  font-weight: bold;
  cursor: pointer;
  padding: 8px 16px;
  font-size: 14px;

  &:hover {
    background-color: #f1f1f1;
    border-radius: 5px;
  }
`;

// Snackbar for notifications
export const SnackbarWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 400px;
  background-color: #323232;
  color: #fff;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

// Form styling for the comment input and submit button (aligned horizontally)
export const CommentFormWrapper = styled.form`
  display: flex;
  align-items: center;
  margin-top: 10px;
  width: 100%;
`;

// Styling for the input field where user types the comment
export const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
`;
export const InputField = styled.input`
  width: 90%;
  padding: 8px;
  font-size: 14px;
  border: none;
  outline: none;
  border-radius: 4px;
  margin-right: 12px;
  background-color: #f5f5f5;
`;
export const PostButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  background-color: #0095f6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #007bb5;
  }
`;
// Input field for comment
export const CommentInput = styled.textarea`
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  background-color: #fafafa;
  font-size: 14px;
  color: #333;
  resize: none;
  outline: none;
  transition: border 0.3s ease;
  height: 40px;

  &::placeholder {
    color: #ccc;
    font-style: italic;
  }

  &:focus {
    border-color: #007bff;
  }
`;

// Submit Button Styling
export const SubmitButtonWrapper = styled.div`
  margin-left: 10px;
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
