import { createAction, props } from "@ngrx/store";
import {Like} from '../../models/like.model';

export const createCommentLike=createAction(
    '[Like] Create Comment Like',
    props<{postId?: string; commentId: string; user_id: string}>()
);

export const createCommentLikeSuccess=createAction(
    '[Like] Create Comment Like Success',
    props<{like:any}>()
);

export const createCommentLikeFailure=createAction(
    '[Like] Create Comment Like Failure',
    props<{error:any}>()
);

export const getCommentLikes=createAction(
    '[Like] Get Comment Likes',
    props<{postId?:string, commentId?: string}>()
);

export const getCommentLikesSuccess=createAction(
    '[Like] Create Comment Likes Success',
    props<{commentLikes:any}>()  
);

export const getCommentLikesFailure=createAction(
    '[Like] Get Comment Likes Failure',
    props<{error:any}>()
);


export const deleteCommentLike = createAction(
    '[Like] Delete Comment Like',
    props<{ postId?: string; commentId?: string; likeId: string }>()
  );
  
  export const deleteCommentLikeSuccess = createAction(
    '[Like] Delete Comment Like Success',
    props<{ likeId: string }>()
  );
  
  export const deleteCommentLikeFailure = createAction(
    '[Like] Delete Comment Like Failure',
    props<{ error: any }>()
  );

  export const createPostLike=createAction(
    '[Like] Create Post Like',
    props<{postId:string, user_id:string}>()
  );

  export const createPostLikeSuccess=createAction(
    '[Like] Create Post Like Success',
    props<{like:any}>()
  );

  export const createPostLikeFailure=createAction(
    '[Like] Create Post Like Failure',
    props<{error:string}>()
  );

  export const getPostLikes=createAction(
    '[Like] Get Post Likes',
    props<{postId:string}>()
  );

  export const getPostLikesSuccess=createAction(
    '[Like] Get Post Like Success',
    props<{postLikes:any}>()
  );

  export const getPostLikeFailure=createAction(
    '[Like] Get Post Like Failure',
    props<{error:string}>()
  );

  export const deletePostLike=createAction(
    '[Like] Delete Post Like',
    props<{postId:string; likeId:string}>()
  );

  export const deletePostLikeSuccess=createAction(
    '[Like] Delete Post Like Success',
    props<{likeId:string}>()
  );

  export const deletePostLikeFailure=createAction(
    '[Like] Delete Post Like Failure',
    props<{error:string}>()
  );