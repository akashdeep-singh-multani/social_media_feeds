import { createAction, props } from "@ngrx/store";
import { Comment } from "../../models/comment.model";

export const addComment=createAction(
    '[Comment] Add Comment',
    props<{comment: Comment}>()
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
    '[Comment] Load Comments'
);

export const loadCommentsSuccess=createAction(
    '[Comment] Load Comments Success',
    props<{comments: Comment[]}>()
);

export const loadCommentsFailure=createAction(
    '[Comment] Load Comments Failure',
    props<{error:string}>()
);