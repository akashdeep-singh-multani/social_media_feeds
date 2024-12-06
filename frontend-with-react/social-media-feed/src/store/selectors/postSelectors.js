export const selectPostsState = (state) => state?.posts || [];
export const selectLikesState = (state) => state?.likes || [];

export const selectAllPostsLoaded = (state) =>
  selectPostsState(state).allPostsLoaded;

// export const selectPosts = (state) => selectPostsState(state).posts;
export const selectPosts = (state) => {
  // Ensure posts state is always an array
  const postsState = selectPostsState(state);
  return postsState && Array.isArray(postsState.posts) ? postsState.posts : [];
};
export const selectPostsByUserId = (userId) => (state) => {
  const posts = selectPosts(state);
  return posts.filter((post) => String(post.userId) === userId);
};

export const selectPostsWithLikes = (state) => {
  const posts = selectPostsState(state)?.posts || [];
  const postLikes = selectLikesState(state)?.postLikes || [];
  return posts.map((post) => {
    const isLiked = postLikes.some(
      (like) => String(like.postId) === String(post._id)
    );
    return { ...post, isLiked };
  });
};
