import { createAction, props } from "@ngrx/store";
import { Comment } from "../../models/comment.model";
import { CommentRequest } from "../../models/comment-request.model";

export const addComment=createAction(
    '[Comment] Add Comment',
    props<{comment: CommentRequest}>()
);

export const addCommentSuccess=createAction(
    '[Comment] Add Comment Success',
    props<{comment:Comment}>()
);

export const addCommentFailure=createAction(
    '[Comment] Add Comment Failure',
    props<{error:string}>()
);

export const loadComments=createAction(
    '[Comment] Load Comments',
    props<{postId:number}>()
);

export const loadCommentsSuccess=createAction(
    '[Comment] Load Comments Success',
    props<{comments: Comment[]}>()
);

export const loadCommentsFailure=createAction(
    '[Comment] Load Comments Failure',
    props<{error:string}>()
);