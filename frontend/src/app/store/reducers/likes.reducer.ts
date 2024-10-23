import { createReducer, on } from "@ngrx/store";
import { Like } from "../../models/like.model";
import { createCommentLikeSuccess, createPostLikeSuccess, deleteCommentLikeSuccess, deletePostLikeSuccess, getCommentLikesSuccess, getPostLikesSuccess } from "../actions/like.action";

export interface LikesState{
    likes: Like[];
    error:string | null;
}

export const initialState:LikesState={
    likes:[],
    error:null
} 

export const likesReducer=createReducer(
    initialState,
    on(createCommentLikeSuccess, (state, {like})=>({...state, likes: [...state.likes, like]})),
    on(getCommentLikesSuccess, (state, {likes})=>({...state, likes})),
    on(deleteCommentLikeSuccess, (state, {likeId})=>({
        ...state,
        likes: state.likes.filter(like=>like.id!==likeId)
    })),
    on(createPostLikeSuccess, (state, {like})=>({...state, likes: [...state.likes, like]})),
    on(getPostLikesSuccess, (state, {likes})=>({...state, likes})),
    on(deletePostLikeSuccess, (state, {likeId})=>({
        ...state,
        likes: state.likes.filter(like=>like.id!==likeId)
    }))
);