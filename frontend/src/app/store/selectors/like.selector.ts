import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LikesState } from "../reducers/likes.reducer";

export const selectLikesState = createFeatureSelector<LikesState>('likes');

export const selectPostLikes = createSelector(
  selectLikesState,
  (state: LikesState) => state.postLikes
);

export const selectPostLikeById=(postId:string)=>createSelector(
    selectPostLikes,
    (postLikes)=>postLikes.find(like=>like.post_id===postId)
);

export const selectCommentLikes = createSelector(
  selectLikesState,
  (state: LikesState) => state.commentLikes
);