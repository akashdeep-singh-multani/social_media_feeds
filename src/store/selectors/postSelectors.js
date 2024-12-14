export const selectPostsState = (state) => state?.post.posts || [];
export const selectLikesState = (state) => state?.likes.postLikes || [];

export const selectAllPostsLoaded = (state) =>
  selectPostsState(state).allPostsLoaded;

export const selectPosts = (state) => {
  const postsState = selectPostsState(state);
  return postsState && Array.isArray(postsState) ? postsState : [];
};
export const selectPostsByUserId = (userId) => (state) => {
  const posts = selectPosts(state);
  return posts.filter((post) => String(post.userId) === userId);
};

export const selectPostsWithLikes = (state) => {
  const posts = selectPostsState(state) || [];
  const postLikes = selectLikesState(state) || [];
  console.log('posts: ' + JSON.stringify(posts));
  console.log('postLikes: ' + JSON.stringify(postLikes));
  return posts.map((post) => {
    const isLiked = postLikes.some((like) => {
      return String(like.postId) === String(post._id);
    });
    return { ...post, isLiked };
  });
};

export const selectPostLikes = (state) => selectLikesState(state);
