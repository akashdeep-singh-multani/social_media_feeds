import { createReducer, on } from "@ngrx/store";
import { User } from "../../models/user.model";
import * as AuthActions from '../actions/auth.action';

export interface AuthState{
    user:User | null;
    token:string | null;
    error:string | null
}

export const initialState:AuthState={
    user:null,
    token:null,
    error:null,
}

export const authReducer=createReducer(
    initialState,
    on(AuthActions.loginSuccess, (state, {token, user})=>({
        ...state,
        token,
        user,
        error:null
    })),
    on(AuthActions.loginFailure, (state, {error})=>({
        ...state,
        error,
    })),
    on(AuthActions.signupSuccess, (state, {token, user})=>({
        ...state,
        token,
        user,
        error:null
    })),
    on(AuthActions.signupFailure, (state, {error})=>({
        ...state,
        error,
    })),
    on(AuthActions.logout, ()=>initialState),
    on(AuthActions.updateUserToken, (state, {token})=>({
        ...state,
        token
    }))
);