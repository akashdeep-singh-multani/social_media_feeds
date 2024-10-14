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
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideStore({comments: commentsReducer, posts: postsReducer}), provideEffects([CommentEffects, PostEffects])],
  

};
