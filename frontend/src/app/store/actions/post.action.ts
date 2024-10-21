import { createAction, props } from "@ngrx/store";
import { Post } from "../../models/post.model";
import { PostResponse } from "../../models/post-response.model";

export const addPost=createAction(
    '[Post] Add Post',
    props<{post:FormData}>()
);

export const addPostSuccess=createAction(
    '[Post] Add Post Success',
    props<{post: Post}>()
);

export const addPostFailure=createAction(
    '[Post] Add Post Failure',
    props<{error:string}>()
);

export const loadPosts=createAction(
    '[Post] Load Posts',
    props<{offset:number, limit:number}>()
);

export const loadPostsSuccess=createAction(
    '[Post] Load Posts Success',
    props<{posts: Post[]}>()
);

export const loadPostsFailure=createAction(
    '[Post] Load Post Failure',
    props<{error:string}>()
);

export const setAllPostsLoaded=createAction(
    '[Post] Set All Posts Loaded',
    props<{loaded:boolean}>()
)

