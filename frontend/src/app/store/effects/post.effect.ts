import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostService } from "../../services/post.service";
import { addPost, addPostFailure, addPostSuccess, loadPosts, loadPostsFailure, loadPostsSuccess, setAllPostsLoaded } from "../actions/post.action";
import { catchError, map, mergeMap, of, take, tap } from "rxjs";
import { PostResponse } from "../../models/post-response.model";
import { ErrorHandlerService } from "../../services/error-handler.service";
import { Store } from "@ngrx/store";

@Injectable()
export class PostEffects {
    constructor(private store: Store, private errorHandlerService: ErrorHandlerService, private actions$: Actions, private postService: PostService) { }

    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadPosts),
            mergeMap(({ offset, limit, user_id }) =>
                this.postService.getPosts(offset, limit).pipe(
                    mergeMap((response: PostResponse) => {
                        let responseData;
                        if(user_id!==-1){
                            responseData=response.data.filter(resp=>resp.user_id._id==user_id)
                        }
                        else{
                            responseData=response.data;
                        }
                        if (response.success) {
                            const allPostsLoaded = response.data.length < limit;
                            return [
                                loadPostsSuccess({ posts: responseData }),
                                setAllPostsLoaded({ loaded: allPostsLoaded })
                            ];
                        } else {
                            return [loadPostsFailure({ error: 'Failed to load posts' })];
                        }
                    }),
                    catchError(error => {
                        this.errorHandlerService.handleError(error);
                        return of(loadPostsFailure({ error: error.message }));
                    })
                )
            )
        )
    );


    addPost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addPost),
            mergeMap(({ post }) =>
                this.postService.addPost(post).pipe(
                    map(post => {
                        this.store.dispatch(loadPosts({ offset: 0, limit: 10, user_id:-1 }))
                        return addPostSuccess({ post })
                    }),
                    catchError(error => {
                        this.errorHandlerService.handleError(error);
                        return of(addPostFailure({ error: error.message }))
                    })
                )
            )
        )
    )

}