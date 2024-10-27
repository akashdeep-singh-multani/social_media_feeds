import { Injectable } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from '../actions/auth.action';
import { catchError, map, mergeMap, of } from "rxjs";
import { ErrorHandlerService } from "../../services/error-handler.service";

@Injectable()
export class AuthEffects {
    constructor(private errorHandlerService: ErrorHandlerService, private actions$: Actions, private authService: AuthService) { }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            mergeMap(action =>
                this.authService.login({ username: action.username, password: action.password }).pipe(
                    map(({ token, user }) => {
                        this.authService.setToken(token);
                        return AuthActions.loginSuccess({ token, user })
                    }),
                    catchError(error => {
                        this.errorHandlerService.handleError(error);
                        return of(AuthActions.loginFailure({ error }))
                    })
                )
            )
        )
    );

    signup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.signup),
            mergeMap(action =>
                this.authService.signup({ username: action.username, password: action.password, email: action.email }).pipe(
                    map(({ token, user }) => {
                        this.authService.setToken(token);
                        return AuthActions.signupSuccess({ token, user })
                    }),
                    catchError(error => {
                        this.errorHandlerService.handleError(error);
                        return of(AuthActions.signupFailure({ error }))
                    })
                )
            )
        )
    );
}