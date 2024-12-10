import styled from 'styled-components';

export const LikeButtonStyled = styled.button`
  background: none;
  border: none;
  color: #606770;
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #1877f2; /* Blue on hover like Facebook */
  }

  svg {
    margin-right: 8px;
  }

  &.liked {
    color: #1877f2; /* Blue when liked */
  }
`;
