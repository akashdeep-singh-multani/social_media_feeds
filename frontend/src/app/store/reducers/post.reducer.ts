import { createReducer, on } from "@ngrx/store";
import { Post } from "../../models/post.model";
import { addPostFailure, addPostSuccess, loadPostsFailure, loadPostsSuccess } from "../actions/post.action";
import { addCommentSuccess, loadCommentsFailure } from "../actions/comment.action";

export interface PostState{
    posts: Post[];
    error:string | null;
}

export const initialState:PostState={
    posts:[],
    error:null
}

export const postsReducer=createReducer(
    initialState,
    on(loadPostsSuccess, (state, {posts})=>({
        ...state,
        posts:Array.isArray(posts) ? [...posts] : [],
        error:null
    })),
    on(addPostSuccess, (state, {post})=>({
        ...state,
        posts: [...state.posts, post],
        error: null
    })),
    on(loadPostsFailure, (state,{error})=>({
        ...state,
        error:error
    })),
    on(addPostFailure, (state,{error})=>({
        ...state,
        error:error
    }))
)