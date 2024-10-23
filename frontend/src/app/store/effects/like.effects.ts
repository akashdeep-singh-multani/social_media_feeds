import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createCommentLike, createCommentLikeFailure, createCommentLikeSuccess, createPostLike, createPostLikeFailure, createPostLikeSuccess, deleteCommentLike, deleteCommentLikeFailure, deleteCommentLikeSuccess, deletePostLike, deletePostLikeFailure, deletePostLikeSuccess, getCommentLikes, getCommentLikesFailure, getCommentLikesSuccess, getPostLikeFailure, getPostLikes, getPostLikesSuccess } from "../actions/like.action";
import { catchError, map, mergeMap, of } from "rxjs";
import { Like } from "../../models/like.model";
import { BASE_URL } from "../../environment/environment";

@Injectable()
export class LikeEffects{
    constructor(private action$:Actions, private httpClient:HttpClient){}

    createCommentLike$=createEffect(()=>
        this.action$.pipe(
            ofType(createCommentLike),
            mergeMap(action=>
                this.httpClient.post<Like>(BASE_URL+`/comments/${action.commentId}/likes`, {user_id: action.user_id})
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
                this.httpClient.get<Like[]>(BASE_URL+`/comments/${action.commentId}/likes`)
                    .pipe(
                        map(likes=>getCommentLikesSuccess({likes})),
                        catchError(error=>of(getCommentLikesFailure({error})))
                    )
            )
        )
    );


    deleteCommentLike$=createEffect(()=>
        this.action$.pipe(
            ofType(deleteCommentLike),
            mergeMap(action=>
                this.httpClient.delete(BASE_URL+`/comments/${action.commentId}/likes/${action.likeId}`)
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
            mergeMap(action =>
                this.httpClient.post<Like>(BASE_URL+`posts/${action.postId}/likes`, { user_id: action.user_id })
                    .pipe(
                        map(like => createPostLikeSuccess({ like })),
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
                this.httpClient.get<Like[]>(BASE_URL+`posts/${action.postId}/likes`)
                    .pipe(
                        map(likes => getPostLikesSuccess({ likes })),
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
                this.httpClient.delete(BASE_URL+`posts/${action.postId}/likes/${action.likeId}`)
                    .pipe(
                        map(() => deletePostLikeSuccess({ likeId: action.likeId })),
                        catchError(error => of(deletePostLikeFailure({ error })))
                    )
            )
        )
    );
}