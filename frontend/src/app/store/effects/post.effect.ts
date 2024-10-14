import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostService } from "../../services/post.service";
import { addPost, addPostFailure, addPostSuccess, loadPosts, loadPostsFailure, loadPostsSuccess } from "../actions/post.action";
import { catchError, map, mergeMap, of, take, tap } from "rxjs";

@Injectable()
export class PostEffects{
    constructor(private actions$: Actions, private postService: PostService){}

    loadPosts$=createEffect(()=>
        this.actions$.pipe(
            ofType(loadPosts),
            take(1),
            tap(() => console.log('Loading posts...')),
            mergeMap(()=>
                this.postService.getPosts().pipe(
                    map(posts=> loadPostsSuccess({posts})),
                    catchError(error=>of(loadPostsFailure({error:error.message})))
                )
            )
        )
    );

    addPost$=createEffect(()=>
        this.actions$.pipe(
            ofType(addPost),
            tap(() => console.log('Adding posts...')),
            mergeMap(action=>
                this.postService.addPost(action.post).pipe(
                    map(post=> addPostSuccess({post})),
                    catchError(error=>of(addPostFailure({error:error.message})))
                )
            )
        )
    )

}