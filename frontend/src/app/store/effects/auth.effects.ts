import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { LoaderService } from '../../services/loader.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private loaderService: LoaderService,
    private errorHandlerService: ErrorHandlerService,
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService
          .login({ username: action.username, password: action.password })
          .pipe(
            map(({ data }) => {
              this.loaderService.hideLoader();
              this.authService.setToken(data.token);
              // this.router.navigate(['user_post']);
              return AuthActions.loginSuccess({
                token: data.token,
                user: data.user,
              });
            }),
            catchError((error) => {
              this.loaderService.hideLoader();
              this.errorHandlerService.handleError(error);
              return of(AuthActions.loginFailure({ error }));
            })
          )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap((action) =>
        this.authService
          .signup({
            username: action.username,
            password: action.password,
            email: action.email,
          })
          .pipe(
            map(({ data }) => {
              this.loaderService.hideLoader();
              this.authService.setToken(data.token);
              return AuthActions.signupSuccess({
                token: data.token,
                user: data.user,
              });
            }),
            catchError((error) => {
              this.loaderService.hideLoader();
              this.errorHandlerService.handleError(error);
              return of(AuthActions.signupFailure({ error }));
            })
          )
      )
    )
  );
}
