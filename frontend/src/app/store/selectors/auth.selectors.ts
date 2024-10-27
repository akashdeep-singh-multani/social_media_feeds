import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducers/auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
    selectAuthState,
    (state: AuthState) => !!state.token
);

export const selectToken = createSelector(
    selectAuthState,
    (state: AuthState) => state.token
);

export const selectError = createSelector(
    selectAuthState,
    (state: AuthState) => state.error
);