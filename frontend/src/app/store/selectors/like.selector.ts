import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LikesState } from "../reducers/likes.reducer";

export const selectLikesState = createFeatureSelector<LikesState>('likes');

export const selectPostLikes = createSelector(
  selectLikesState,
  (state: LikesState) => state.postLikes
);

export const selectCommentLikes = createSelector(
  selectLikesState,
  (state: LikesState) => state.commentLikes
);