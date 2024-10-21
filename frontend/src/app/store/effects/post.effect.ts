import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostService } from "../../services/post.service";
import { addPost, addPostFailure, addPostSuccess, loadPosts, loadPostsFailure, loadPostsSuccess, setAllPostsLoaded } from "../actions/post.action";
import { catchError, map, mergeMap, of, take, tap } from "rxjs";
import { PostResponse } from "../../models/post-response.model";
import { ErrorHandlerService } from "../../services/error-handler.service";
import { Store } from "@ngrx/store";

@Injectable()
export class PostEffects{
    constructor(private store:Store,private errorHandlerService:ErrorHandlerService,private actions$: Actions, private postService: PostService){}

    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadPosts),
            tap(() => console.log('Loading posts...')),
            mergeMap(({ offset, limit }) =>
                this.postService.getPosts(offset, limit).pipe(
                    mergeMap((response: PostResponse) => {
                        console.log("loadPosts: ", JSON.stringify(response));
                        if (response.success) {
                            const allPostsLoaded = response.data.length < limit;
    
                            return [
                                loadPostsSuccess({ posts: response.data }),
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
    

    addPost$=createEffect(()=>
        this.actions$.pipe(
            ofType(addPost),
            tap(() => {
                console.log('Adding posts...');
                // this.store.dispatch(loadPosts());
            }),
            mergeMap(({post})=>
                this.postService.addPost(post).pipe(
                    map(post=> {
                        console.log("addPostSuccess: "+JSON.stringify(post))
                        return addPostSuccess({post})
                    }),
                    catchError(error=>{
                        this.errorHandlerService.handleError(error);
                        return of(addPostFailure({error:error.message}))
                    })
                )
            )
        )
    )

}