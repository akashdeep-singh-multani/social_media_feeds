import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from '../UserProfile';
import { useUser } from '../../../hooks/useUser'; // Importing the hook
import { environment } from '../../../config/environment';

// Mock the useUser hook to simulate user state in a real environment
jest.mock('../../hooks/useUser');

describe('UserProfile', () => {
  test('should display loading state if user, commenterInfo, and posterInfo are missing', () => {
    useUser.mockReturnValue({ user: null }); // Simulate no user

    render(
      <UserProfile commenterInfo={null} posterInfo={null} action="feed" />
    );

    // Check that "Loading..." is rendered
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('should display user information from useUser hook', () => {
    const mockUser = {
      username: 'JohnDoe',
      image: 'profile.jpg',
    };

    useUser.mockReturnValue({ user: mockUser }); // Simulate logged-in user

    render(
      <UserProfile commenterInfo={null} posterInfo={null} action="feed" />
    );

    // Check if the avatar image and username are rendered
    const avatarImage = screen.getByAltText('User Avatar');
    expect(avatarImage).toHaveAttribute(
      'src',
      `${environment.BASE_URL}uploads/profile.jpg`
    );

    const title = screen.getByLabelText('Profile Name');
    expect(title).toHaveTextContent('JohnDoe');
  });

  test('should display poster info when action is "feed"', () => {
    const mockPosterInfo = {
      username: 'PosterUser',
      image: 'poster.jpg',
    };

    render(
      <UserProfile
        commenterInfo={null}
        posterInfo={mockPosterInfo}
        action="feed"
      />
    );

    // Check if poster avatar image and username are displayed correctly
    const avatarImage = screen.getByAltText('User Avatar');
    expect(avatarImage).toHaveAttribute(
      'src',
      `${environment.BASE_URL}uploads/poster.jpg`
    );

    const title = screen.getByLabelText('Profile Name');
    expect(title).toHaveTextContent('PosterUser');
  });

  test('should display commenter info when action is "comment"', () => {
    const mockCommenterInfo = {
      commenterInfo: {
        username: 'CommenterUser',
        image: 'commenter.jpg',
      },
      text: 'This is a comment.',
    };

    render(
      <UserProfile
        commenterInfo={mockCommenterInfo}
        posterInfo={null}
        action="comment"
      />
    );

    // Check if commenter's avatar image, username, and subtitle (comment) are displayed correctly
    const avatarImage = screen.getByAltText('User Avatar');
    expect(avatarImage).toHaveAttribute(
      'src',
      `${environment.BASE_URL}uploads/commenter.jpg`
    );

    const title = screen.getByLabelText('Profile Name');
    expect(title).toHaveTextContent('CommenterUser');

    const subtitle = screen.getByLabelText('Profile description');
    expect(subtitle).toHaveTextContent('This is a comment.');
  });

  test('should fallback to placeholder if no posterInfo or commenterInfo is provided', () => {
    render(
      <UserProfile commenterInfo={null} posterInfo={null} action="comment" />
    );

    // Check if the default placeholder image is shown
    const avatarImage = screen.getByAltText('User Avatar');
    expect(avatarImage).toHaveAttribute(
      'src',
      'https://via.placeholder.com/40'
    );

    const title = screen.getByLabelText('Profile Name');
    expect(title).toHaveTextContent('Anonymous User');

    // Check if subtitle (comment) is not rendered
    const subtitle = screen.queryByLabelText('Profile description');
    expect(subtitle).not.toBeInTheDocument();
  });
});
