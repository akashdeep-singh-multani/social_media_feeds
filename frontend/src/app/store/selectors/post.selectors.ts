import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostState } from "../reducers/post.reducer";
import { LikesState } from "../reducers/likes.reducer";

export const selectPostsState = createFeatureSelector<PostState>('posts');
export const selectLikesState = createFeatureSelector<LikesState>('likes');

export const selectAllPostsLoaded = createSelector(
    selectPostsState,
    (state: PostState) => state.allPostsLoaded
);

export const selectPosts = createSelector(
    selectPostsState,
    (state: PostState) => state.posts
);

export const selectPostsWithLikes = createSelector(
    selectPostsState,
    selectLikesState,
    (postsState: PostState, likesState: LikesState) => {
        return postsState.posts.map(post => {
            const isLiked = likesState.postLikes.some(like => String(like.post_id) === String(post._id));
            return {
                ...post,
                isLiked: isLiked
            };
        });
    }
);