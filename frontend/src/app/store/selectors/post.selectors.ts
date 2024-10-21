import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostState } from "../reducers/post.reducer";

export const selectPostsState=createFeatureSelector<PostState>('posts');

export const selectAllPostsLoaded=createSelector(
    selectPostsState,
    (state:PostState)=> state.allPostsLoaded
);
