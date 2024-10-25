import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createCommentLike, createCommentLikeFailure, createCommentLikeSuccess, createPostLike, createPostLikeFailure, createPostLikeSuccess, deleteCommentLike, deleteCommentLikeFailure, deleteCommentLikeSuccess, deletePostLike, deletePostLikeFailure, deletePostLikeSuccess, getCommentLikes, getCommentLikesFailure, getCommentLikesSuccess, getPostLikeFailure, getPostLikes, getPostLikesSuccess } from "../actions/like.action";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Like } from "../../models/like.model";
import { BASE_URL } from "../../environment/environment";
import { LikeService } from "../../services/like.service";

@Injectable()
export class LikeEffects{
    constructor(private action$:Actions, private httpClient:HttpClient, private likeService:LikeService){}

    createCommentLike$=createEffect(()=>
        this.action$.pipe(
            ofType(createCommentLike),
            mergeMap(action=>
                // this.httpClient.post<Like>(BASE_URL+`/comments/${action.commentId}/likes`, {user_id: action.user_id})
                this.likeService.createCommentLike(action.commentId, action.user_id)    
                .pipe(
                        map(like=>createCommentLikeSuccess({like})),
                        catchError(error=>of(createCommentLikeFailure({error})))
                    )
            )
        )
    );

    getCommentLikes$=createEffect(()=>
        this.action$.pipe(
            ofType(getCommentLikes),
            mergeMap(action=>
                // this.httpClient.get<Like[]>(BASE_URL+`/comments/${action.commentId}/likes`)
                this.likeService.getCommentLikes(action.commentId || "")
                    .pipe(
                        map(commentLikes=>getCommentLikesSuccess({commentLikes})),
                        catchError(error=>of(getCommentLikesFailure({error})))
                    )
            )
        )
    );


    deleteCommentLike$=createEffect(()=>
        this.action$.pipe(
            ofType(deleteCommentLike),
            mergeMap(action=>
                // this.httpClient.delete(BASE_URL+`/comments/${action.commentId}/likes/${action.likeId}`)
                this.likeService.deleteCommentLike(action.commentId || "", action.likeId)
                    .pipe(
                        map(()=>deleteCommentLikeSuccess({likeId:action.likeId})),
                        catchError(error=>of(deleteCommentLikeFailure({error})))
                    )
            )
        )
    );

    createPostLike$ = createEffect(() =>
        this.action$.pipe(
            ofType(createPostLike),
            tap(()=>console.log("effect called")),
            mergeMap(action =>
                this.likeService.createPostLike(action.postId, action.user_id)
                // this.httpClient.post<Like>(BASE_URL+`posts/${action.postId}/likes`, { user_id: action.user_id })
                .pipe(
                    tap(response => console.log("like from API: ", response)), // Log the response
                    map(response => createPostLikeSuccess({postLike:response.data[0]})),
                    catchError(error => of(createPostLikeFailure({ error })))
                )
            )
        )
    );

    // Effect to get likes for a post
    getPostLikes$ = createEffect(() =>
        this.action$.pipe(
            ofType(getPostLikes),
            mergeMap(action =>
                // this.httpClient.get<Like[]>(BASE_URL+`posts/${action.postId}/likes`)
                this.likeService.getPostLikes(action.postId)
                    .pipe(
                        map(postLikes => {
                            console.log("Fetched postLikes: ", JSON.stringify(postLikes))
                            return getPostLikesSuccess( {postLikes:postLikes.data} )
                        }),
                        catchError(error => of(getPostLikeFailure({ error })))
                    )
            )
        )
    );

    // Effect to delete a like from a post
    deletePostLike$ = createEffect(() =>
        this.action$.pipe(
            ofType(deletePostLike),
            mergeMap(action =>
                // this.httpClient.delete(BASE_URL+`posts/${action.postId}/likes/${action.likeId}`)
                this.likeService.deletePostLike(action.postId, action.likeId)
                    .pipe(
                        map(() => deletePostLikeSuccess({ likeId: action.likeId })),
                        catchError(error => of(deletePostLikeFailure({ error })))
                    )
            )
        )
    );
}