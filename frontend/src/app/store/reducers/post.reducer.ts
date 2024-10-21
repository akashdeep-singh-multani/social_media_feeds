import { createReducer, on } from "@ngrx/store";
import { Post } from "../../models/post.model";
import { addPostFailure, addPostSuccess, loadPostsFailure, loadPostsSuccess, setAllPostsLoaded } from "../actions/post.action";
import { addCommentSuccess, loadCommentsFailure } from "../actions/comment.action";

export interface PostState{
    posts: Post[];
    error:string | null;
    allPostsLoaded:boolean;
}

export const initialState:PostState={
    posts:[],
    error:null,
    allPostsLoaded:false
}

export const postsReducer=createReducer(
    initialState,
    on(loadPostsSuccess, (state, {posts})=>{
        // if(posts.length===0){
        //     return {
        //         ...state,
        //         error:null
        //     }
        // }
        // return{
        //     ...state,
        // posts:Array.isArray(posts) ? [...posts] : [],
        // error:null
        // }
        return{
            ...state,
            posts: [...state.posts, ...posts],
            error:null
        }
    }),
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
    })),
    on(setAllPostsLoaded, (state, {loaded})=>({
        ...state,
        allPostsLoaded: loaded
    }))
)