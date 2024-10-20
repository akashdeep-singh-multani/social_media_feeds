import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { addComment, addCommentFailure, addCommentSuccess, loadComments, loadCommentsFailure, loadCommentsSuccess } from "../actions/comment.action";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { CommentService } from "../../services/comment.service";
import { CommentResponse } from "../../models/comment-response.model";
import { ErrorHandlerService } from "../../services/error-handler.service";

@Injectable()
export class CommentEffects{
    constructor(private errorHandlerService:ErrorHandlerService,private actions$: Actions, private commentService:CommentService){}

    loadComments$=createEffect(()=>
        this.actions$.pipe(
            ofType(loadComments),
            tap(() => console.log('Loading comments...')),
            mergeMap((action)=>
                this.commentService.getComments(action.postId).pipe(
                    map((response: CommentResponse)=> {
                        if(response.status){
                            console.log("dispath loadCommentSuccess: "+JSON.stringify(response.data));
                            return loadCommentsSuccess({comments:response.data});
                        }
                        else{
                            console.log("dispatching loadCommentsFailure: ");
                            return loadCommentsFailure({error:'Failed to load comments'})
                        }
                    }),
                    catchError(error=>{
                        this.errorHandlerService.handleError(error);
                        return of(loadCommentsFailure({error:error.message}))
                    })
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
                    catchError(error=>{
                        this.errorHandlerService.handleError(error);
                        return of(addCommentFailure({error:error.message}))
                    })
                )
            )
        )
    )

}