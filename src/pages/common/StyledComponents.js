import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box;
  &:disabled {
    background-color: #bbb;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;
