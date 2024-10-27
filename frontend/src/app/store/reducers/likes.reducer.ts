import { createReducer, on } from "@ngrx/store";
import { createCommentLikeFailure, createCommentLikeSuccess, createPostLikeFailure, createPostLikeSuccess, deleteCommentLikeFailure, deleteCommentLikeSuccess, deletePostLikeFailure, deletePostLikeSuccess, getCommentLikesSuccess, getPostLikesSuccess } from "../actions/like.action";
import { LikeInfo } from "../../models/like-info.model";

export interface LikesState {
    postLikes: LikeInfo[];
    commentLikes: any[],
    error: string | null;
}

export const initialState: LikesState = {
    postLikes: [],
    commentLikes: [],
    error: null
}

export const likesReducer = createReducer(
    initialState,
    on(createCommentLikeSuccess, (state, { like }) => ({ ...state, commentLikes: [...state.commentLikes, like], error: null })),
    on(getCommentLikesSuccess, (state, { commentLikes }) => ({ ...state, commentLikes: commentLikes.likes })),
    on(deleteCommentLikeSuccess, (state, { likeId }) => ({
        ...state,
        commentLikes: state.commentLikes.filter(like => like.id !== likeId),
        error: null
    })),
    on(createPostLikeSuccess, (state, { postLike }) => {
        return {
            ...state,
            postLikes: [...state.postLikes, postLike],
            error: null
        }

    }),
    on(getPostLikesSuccess, (state, { postLikes }) => {
        const updatedPosts = state.postLikes.map(post => {
            const isLiked = postLikes.some(like => like.post_id === post._id);
            return {
                ...post,
                isLiked: isLiked
            };
        })

        return {
            ...state,
            posts: updatedPosts
        };
    }),

    on(deletePostLikeSuccess, (state, { likeId }) => ({
        ...state,
        postLikes: state.postLikes.filter(like => like._id !== likeId),
        error: null
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