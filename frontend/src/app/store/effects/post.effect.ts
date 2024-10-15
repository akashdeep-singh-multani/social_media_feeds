import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostService } from "../../services/post.service";
import { addPost, addPostFailure, addPostSuccess, loadPosts, loadPostsFailure, loadPostsSuccess } from "../actions/post.action";
import { catchError, map, mergeMap, of, take, tap } from "rxjs";
import { PostResponse } from "../../models/post-response.model";

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
                    map((response:PostResponse)=> {
                        // console.log("fetched posts: ",posts)
                        // const posts=response.data;
                        if(response.success){
                            return loadPostsSuccess({posts:response.data})
                        }
                        else{
                            return loadPostsFailure({error:'Failed to load posts'})
                        }
                        
                    }),
                    catchError(error=>{
                        console.error("error fetching posts: ",error);
                        return of(loadPostsFailure({error:error.message}))
                    }
                    )
                )
            )
        )
    );

    addPost$=createEffect(()=>
        this.actions$.pipe(
            ofType(addPost),
            tap(() => console.log('Adding posts...')),
            mergeMap(({post})=>
                this.postService.addPost(post).pipe(
                    map(post=> addPostSuccess({post})),
                    catchError(error=>of(addPostFailure({error:error.message})))
                )
            )
        )
    )

}