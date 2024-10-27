import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createCommentLike, createCommentLikeFailure, createCommentLikeSuccess, createPostLike, createPostLikeFailure, createPostLikeSuccess, deleteCommentLike, deleteCommentLikeFailure, deleteCommentLikeSuccess, deletePostLike, deletePostLikeFailure, deletePostLikeSuccess, getCommentLikes, getCommentLikesFailure, getCommentLikesSuccess, getPostLikeFailure, getPostLikes, getPostLikesSuccess } from "../actions/like.action";
import { catchError, map, mergeMap, of } from "rxjs";
import { LikeService } from "../../services/like.service";
import { Store } from "@ngrx/store";

@Injectable()
export class LikeEffects {
    constructor(private store: Store, private action$: Actions, private likeService: LikeService) { }

    createCommentLike$ = createEffect(() =>
        this.action$.pipe(
            ofType(createCommentLike),
            mergeMap(action =>
                this.likeService.createCommentLike(action.commentId, action.user_id)
                    .pipe(
                        map(like => createCommentLikeSuccess({ like })),
                        catchError(error => of(createCommentLikeFailure({ error })))
                    )
            )
        )
    );

    getCommentLikes$ = createEffect(() =>
        this.action$.pipe(
            ofType(getCommentLikes),
            mergeMap(action =>
                this.likeService.getCommentLikes(action.commentId || "")
                    .pipe(
                        map(commentLikes => getCommentLikesSuccess({ commentLikes })),
                        catchError(error => of(getCommentLikesFailure({ error })))
                    )
            )
        )
    );


    deleteCommentLike$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteCommentLike),
            mergeMap(action =>
                this.likeService.deleteCommentLike(action.commentId || "", action.likeId)
                    .pipe(
                        map(() => deleteCommentLikeSuccess({ likeId: action.likeId })),
                        catchError(error => of(deleteCommentLikeFailure({ error })))
                    )
            )
        )
    );

    createPostLike$ = createEffect(() =>
        this.action$.pipe(
            ofType(createPostLike),
            mergeMap(action =>
                this.likeService.createPostLike(action.postId, action.user_id)
                    .pipe(
                        map(response => {
                            this.store.dispatch(getPostLikes({ postId: action.postId }));
                            return createPostLikeSuccess({ postLike: response.data[0] })
                        }),
                        catchError(error => of(createPostLikeFailure({ error })))
                    )
            )
        )
    );

    getPostLikes$ = createEffect(() =>
        this.action$.pipe(
            ofType(getPostLikes),
            mergeMap(action =>
                this.likeService.getPostLikes(action.postId)
                    .pipe(
                        map(postLikes => {
                            return getPostLikesSuccess({ postLikes: postLikes.data })
                        }),
                        catchError(error => of(getPostLikeFailure({ error })))
                    )
            )
        )
    );

    deletePostLike$ = createEffect(() =>
        this.action$.pipe(
            ofType(deletePostLike),
            mergeMap(action =>
                this.likeService.deletePostLike(action.postId, action.likeId)
                    .pipe(
                        map(() => deletePostLikeSuccess({ likeId: action.likeId })),
                        catchError(error => of(deletePostLikeFailure({ error })))
                    )
            )
        )
    );
}