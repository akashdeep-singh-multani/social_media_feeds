import styled from 'styled-components';
import SubmitButton from '../reusable-components/SubmitButton';

const FeedContainer = styled.div`
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 8px;
`;

const CreatePostButton = styled(SubmitButton)`
  background-color: #1877f2;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #166fe5;
  }
`;

const PostList = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const PostCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition:
    transform 0.2s ease,
    background-color 0.2s;
  overflow: hidden;

  &:hover {
    background-color: #f0f2f5;
    transform: scale(1.02);
  }
`;

const PostImage = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    object-fit: cover;
  }
`;

const PostActions = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  align-items: center;
`;

const PostText = styled.p`
  font-size: 14px;
  color: #050505;
`;

const NoPosts = styled.div`
  text-align: center;
  color: #606770;
  font-size: 16px;
`;

export const PostStyled = {
  FeedContainer,
  CreatePostButton,
  PostList,
  PostCard,
  PostImage,
  PostActions,
  PostText,
  NoPosts,
};
