import { createReducer, on } from "@ngrx/store";
import { Comment } from "../../models/comment.model";
import { addCommentFailure, addCommentSuccess, loadCommentsFailure, loadCommentsSuccess } from "../actions/comment.action";

export interface CommentState{
    comments: Comment[];
    error:string | null;
}

export const initialState:CommentState={
    comments:[],
    error:null
}

export const commentsReducer=createReducer(
    initialState,
    on(loadCommentsSuccess, (state, {comments})=>({
        ...state,
        comments:comments,
        error:null
    })),
    on(addCommentSuccess, (state, {comment})=>({
        ...state,
        comments:[...state.comments,comment],
        error:null
    })),
    on(loadCommentsFailure, (state,{error})=>({
        ...state,
        error:error
    })),
    on(addCommentFailure, (state,{error})=>({
        ...state,
        error:error
    }))
);