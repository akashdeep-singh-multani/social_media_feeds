import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CommentButton from '../comment_button';

describe('CommentButton Component', () => {
  const postId = 'post123'; // Sample postId for testing

  test('renders comment button correctly', () => {
    render(<CommentButton postId={postId} />);

    // Check if the comment button with comment icon is rendered
    const commentButton = screen.getByRole('button', {
      name: /add a comment/i,
    });
    expect(commentButton).toBeInTheDocument();
  });

  test('opens the modal when the comment button is clicked', () => {
    render(<CommentButton postId={postId} />);

    // Check if the modal is initially closed
    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();

    // Find the comment button and simulate a click to open the modal
    const commentButton = screen.getByRole('button', {
      name: /add a comment/i,
    });
    fireEvent.click(commentButton);

    // After click, modal should be open
    const openedModal = screen.getByRole('dialog');
    expect(openedModal).toBeInTheDocument();
  });

  test('closes the modal when the close button is clicked', async () => {
    render(<CommentButton postId={postId} />);

    // Open the modal first
    const commentButton = screen.getByRole('button', {
      name: /add a comment/i,
    });
    fireEvent.click(commentButton);

    // Ensure the modal is open
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    // Find the close button in the modal and simulate a click
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Ensure the modal is closed
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  test('closes the modal when clicking outside the modal', async () => {
    render(<CommentButton postId={postId} />);

    // Open the modal first
    const commentButton = screen.getByRole('button', {
      name: /add a comment/i,
    });
    fireEvent.click(commentButton);

    // Ensure the modal is open
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    // Click outside the modal to close it
    fireEvent.click(document.body);

    // Ensure the modal is closed
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  test('renders PostCommentList inside the modal', async () => {
    render(<CommentButton postId={postId} />);

    // Open the modal first
    const commentButton = screen.getByRole('button', {
      name: /add a comment/i,
    });
    fireEvent.click(commentButton);

    // Ensure the modal is open and PostCommentList is rendered inside
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    // Check if PostCommentList is rendered and passed the correct postId
    expect(screen.getByText('Post comments list')).toBeInTheDocument();
  });
});
