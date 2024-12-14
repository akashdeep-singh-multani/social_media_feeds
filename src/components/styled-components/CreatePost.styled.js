import styled from 'styled-components';

// Container for the whole page
export const CreatePostPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Textarea for post content
export const CreatePostStyledTextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Container for buttons (Submit & Add Photo)
export const CreatePostButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

// Submit Button for form submission
export const CreatePostStyledSubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
