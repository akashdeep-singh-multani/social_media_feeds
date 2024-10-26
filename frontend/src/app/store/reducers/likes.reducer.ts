import { createReducer, on } from "@ngrx/store";
import { Like } from "../../models/like.model";
import { createCommentLikeFailure, createCommentLikeSuccess, createPostLikeFailure, createPostLikeSuccess, deleteCommentLikeFailure, deleteCommentLikeSuccess, deletePostLikeFailure, deletePostLikeSuccess, getCommentLikesSuccess, getPostLikesSuccess } from "../actions/like.action";
import { LikeResponse } from "../../models/like-response.model";
import { LikeInfo } from "../../models/like-info.model";
import { selectPostLikeById } from "../selectors/like.selector";

export interface LikesState{
    postLikes: LikeInfo[];
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
    on(createPostLikeSuccess, (state, {postLike})=>{
        console.log("createPostLikeSuccess saved data: "+JSON.stringify([...state.postLikes]))
        return{
            ...state, 
            postLikes: [...state.postLikes, postLike],
            error:null
        }
        
    }),
    on(getPostLikesSuccess, (state, { postLikes }) => {
        const updatedPosts = state.postLikes.map(post => {
            // Check if the post has been liked
            const isLiked = postLikes.some(like => like.post_id === post._id);
            return {
                ...post,
                isLiked: isLiked // Set isLiked based on the presence of a like
            };
        });

        console.log("updatedPosts: "+JSON.stringify(updatedPosts))
        
        return {
            ...state,
            posts: updatedPosts
        };
    }),
    
    on(deletePostLikeSuccess, (state, {likeId})=>({
        ...state,
        postLikes: state.postLikes.filter(like=>like._id!==likeId),
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