import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user.model";

export const login=createAction(
    '[Auth] Login',
    props<{username:string, password:string}>()
);

export const loginSuccess=createAction(
    '[Auth] Login Success',
    props<{token:string, user:User}>()
);

export const loginFailure=createAction(
    '[Auth] Login Failure',
    props<{error:string}>()
);

export const signup=createAction(
    '[Auth] Signup',
    props<{username:string, password:string, email:string}>()
);

export const signupSuccess=createAction(
    '[Auth] Signup Success',
    props<{token:string, user:User}>()
);

export const signupFailure=createAction(
    '[Auth] Signup Failure',
    props<{error:string}>()
);

export const logout=createAction('[Auth] Logout');

export const updateUserToken=createAction(
    '[Auth] Update User Token',
    props<{token:string}>()
);