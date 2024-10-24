import { createReducer, on } from "@ngrx/store";
import { Like } from "../../models/like.model";
import { createCommentLikeFailure, createCommentLikeSuccess, createPostLikeFailure, createPostLikeSuccess, deleteCommentLikeFailure, deleteCommentLikeSuccess, deletePostLikeFailure, deletePostLikeSuccess, getCommentLikesSuccess, getPostLikesSuccess } from "../actions/like.action";

export interface LikesState{
    postLikes: any[];
    commentLikes:any[],
    error:string | null;
}

export const initialState:LikesState={
    postLikes:[],
    commentLikes:[],
    error:null
} 

export const likesReducer=createReducer(
    initialState,
    on(createCommentLikeSuccess, (state, {like})=>({...state, commentLikes: [...state.commentLikes, like], error:null})),
    on(getCommentLikesSuccess, (state, {commentLikes})=>({...state, commentLikes:commentLikes.likes})),
    on(deleteCommentLikeSuccess, (state, {likeId})=>({
        ...state,
        commentLikes: state.commentLikes.filter(like=>like.id!==likeId),
        error:null
    })),
    on(createPostLikeSuccess, (state, {like})=>{
        console.log("createPostLikeSuccess saved data: "+JSON.stringify([...state.postLikes, like]))
        return{
            ...state, postLikes: [...state.postLikes, like], error:null
        }
        
    }),
    on(getPostLikesSuccess, (state, {postLikes})=>{
        console.log("getPostLikesSuccess: "+JSON.stringify(postLikes.likes))
        return {...state,postLikes:postLikes.likes}
    }),
    on(deletePostLikeSuccess, (state, {likeId})=>({
        ...state,
        postLikes: state.postLikes.filter(like=>like.id!==likeId),
        error:null
    })),

    on(createPostLikeFailure, (state, { error }) => ({
        ...state,
        error,
      })),
      on(deletePostLikeFailure, (state, { error }) => ({
        ...state,
        error,
      })),
      on(createCommentLikeFailure, (state, { error }) => ({
        ...state,
        error,
      })),
      on(deleteCommentLikeFailure, (state, { error }) => ({
        ...state,
        error,
      }))
);