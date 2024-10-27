import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addComment, addCommentFailure, addCommentSuccess, loadComments, loadCommentsFailure, loadCommentsSuccess } from "../actions/comment.action";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { CommentService } from "../../services/comment.service";
import { CommentResponse } from "../../models/comment-response.model";
import { ErrorHandlerService } from "../../services/error-handler.service";
import { Store } from "@ngrx/store";

@Injectable()
export class CommentEffects {
    constructor(private store: Store, private errorHandlerService: ErrorHandlerService, private actions$: Actions, private commentService: CommentService) { }

    loadComments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadComments),
            mergeMap((action) =>
                this.commentService.getComments(action.postId).pipe(
                    map((response: CommentResponse) => {
                        if (response.status) {
                            return loadCommentsSuccess({ comments: response.data });
                        }
                        else {
                            return loadCommentsFailure({ error: 'Failed to load comments' })
                        }
                    }),
                    catchError(error => {
                        this.errorHandlerService.handleError(error);
                        return of(loadCommentsFailure({ error: error.message }))
                    })
                )
            )
        )
    );

    addComment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addComment),
            mergeMap(action =>
                this.commentService.addComment(action.comment).pipe(
                    map((comment) => {
                        return addCommentSuccess({ comment: comment.data })
                    }),
                    catchError(error => {
                        this.errorHandlerService.handleError(error);
                        return of(addCommentFailure({ error: error.message }))
                    })
                )
            )
        )
    )

}