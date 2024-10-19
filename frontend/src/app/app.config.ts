import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { commentsReducer } from './store/reducers/comment.reducer';
import { postsReducer } from './store/reducers/post.reducer';
import { CommentEffects } from './store/effects/comment.effect';
import { PostEffects } from './store/effects/post.effect';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { authReducer } from './store/reducers/auth.reducer';
import { AuthEffects } from './store/effects/auth.effects';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './guards/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [AuthGuard,CookieService,provideHttpClient(withFetch()),provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideStore({comments: commentsReducer, posts: postsReducer, auth:authReducer}), provideEffects([CommentEffects, PostEffects, AuthEffects])],
  

};
