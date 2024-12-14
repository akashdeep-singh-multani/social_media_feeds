import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LikeButton from '../like_button';

describe('LikeButton Component', () => {
  // A mock function to simulate the onLikeToggled callback
  const mockOnLikeToggled = jest.fn();

  beforeEach(() => {
    mockOnLikeToggled.mockClear(); // Clear any previous calls to the mock
  });

  test('renders correctly when not liked', () => {
    // Render the LikeButton with isLiked as false
    render(
      <LikeButton
        isLiked={false}
        postId="post123"
        onLikeToggled={mockOnLikeToggled}
      />
    );

    // Check that the "Like" text and the unfilled thumb icon are present
    const likeButton = screen.getByRole('button', { name: /like/i });
    expect(likeButton).toBeInTheDocument();
    expect(likeButton).toHaveTextContent('Like');
    expect(screen.getByLabelText('Like button')).toBeInTheDocument();
    expect(screen.getByText('Like')).toBeInTheDocument();
  });

  test('renders correctly when liked', () => {
    // Render the LikeButton with isLiked as true
    render(
      <LikeButton
        isLiked={true}
        postId="post123"
        onLikeToggled={mockOnLikeToggled}
      />
    );

    // Check that the "Liked" text and the filled thumb icon are present
    const likeButton = screen.getByRole('button', { name: /liked/i });
    expect(likeButton).toBeInTheDocument();
    expect(likeButton).toHaveTextContent('Liked');
    expect(screen.getByLabelText('Like button')).toBeInTheDocument();
    expect(screen.getByText('Liked')).toBeInTheDocument();
  });

  test('toggles like status when clicked', () => {
    // Render the LikeButton with initial isLiked as false
    render(
      <LikeButton
        isLiked={false}
        postId="post123"
        onLikeToggled={mockOnLikeToggled}
      />
    );

    // Simulate clicking the like button
    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.click(likeButton);

    // Check if the mock function was called with the correct arguments
    expect(mockOnLikeToggled).toHaveBeenCalledWith({
      postId: 'post123',
      newLikeStatus: true,
    });

    // Check if the button text and icon have updated
    expect(likeButton).toHaveTextContent('Liked');
    expect(screen.getByLabelText('Like button')).toBeInTheDocument();
  });

  test('does not toggle when liked is undefined', () => {
    // Render the LikeButton with isLiked as undefined
    render(
      <LikeButton
        isLiked={undefined}
        postId="post123"
        onLikeToggled={mockOnLikeToggled}
      />
    );

    // Try to click the button, but nothing should happen
    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.click(likeButton);

    // Check that the callback was not called
    expect(mockOnLikeToggled).not.toHaveBeenCalled();
  });

  test('synchronizes with new isLiked prop', () => {
    // Initially render the LikeButton with isLiked as false
    const { rerender } = render(
      <LikeButton
        isLiked={false}
        postId="post123"
        onLikeToggled={mockOnLikeToggled}
      />
    );

    // Check if the button is showing 'Like'
    expect(screen.getByText('Like')).toBeInTheDocument();

    // Re-render with isLiked as true
    rerender(
      <LikeButton
        isLiked={true}
        postId="post123"
        onLikeToggled={mockOnLikeToggled}
      />
    );

    // Check if the button is showing 'Liked' after prop change
    expect(screen.getByText('Liked')).toBeInTheDocument();
  });
});
