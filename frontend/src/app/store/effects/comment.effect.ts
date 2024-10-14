import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { addComment, addCommentFailure, addCommentSuccess, loadComments, loadCommentsFailure, loadCommentsSuccess } from "../actions/comment.action";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { CommentService } from "../../services/comment.service";

@Injectable()
export class CommentEffects{
    constructor(private actions$: Actions, private commentService:CommentService){}

    loadComments$=createEffect(()=>
        this.actions$.pipe(
            ofType(loadComments),
            tap(() => console.log('Loading comments...')),
            mergeMap(()=>
                this.commentService.getComments().pipe(
                    map(comments=> loadCommentsSuccess({comments})),
                    catchError(error=>of(loadCommentsFailure({error:error.message})))
                )
            )
        )
    );

    addComment$=createEffect(()=>
        this.actions$.pipe(
            ofType(addComment),
            tap(() => console.log('Adding comments...')),
            mergeMap(action=>
                this.commentService.addComment(action.comment).pipe(
                    map(comment=> addCommentSuccess({comment})),
                    catchError(error=>of(addCommentFailure({error:error.message})))
                )
            )
        )
    )

}