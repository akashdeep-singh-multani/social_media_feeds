import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LikesState } from "../reducers/likes.reducer";

export const selectLikesState = createFeatureSelector<LikesState>('likes');

export const selectPostLikes = createSelector(
    selectLikesState,
    (state: LikesState) => state.postLikes
);

export const selectPostLikeById = (postId: string) => createSelector(
    selectPostLikes,
    (likes) => likes.find(like => like.post_id === postId)
);

export const selectLikeIdByPostId = (postId: string) => createSelector(
    selectPostLikes,
    (postLikes) => {
        const like = postLikes.find(like => like.post_id === postId);
        return like ? like._id : null;
    }
);

export const selectCommentLikes = createSelector(
    selectLikesState,
    (state: LikesState) => state.commentLikes
);