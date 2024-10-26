import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { CommentButtonComponent } from '../comment-button/comment-button.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { loadPosts } from '../../store/actions/post.action';
import { Post } from '../../models/post.model';
import { Observable, Subject, Subscription, forkJoin, of } from 'rxjs';
import { distinctUntilChanged, map, take, takeUntil, tap } from 'rxjs/operators';
import { BASE_URL } from '../../environment/environment';
import { SocketService } from '../../services/socket.service';
import { selectAllPostsLoaded, selectPosts, selectPostsState, selectPostsWithLikes } from '../../store/selectors/post.selectors';
import { createPostLike, deletePostLike, getPostLikes } from '../../store/actions/like.action';
import { LikeInfo } from '../../models/like-info.model';
import { AuthService } from '../../services/auth.service';
import { selectLikeIdByPostId, selectPostLikeById, selectPostLikes } from '../../store/selectors/like.selector';
import { LikesState } from '../../store/reducers/likes.reducer';

@Component({
  selector: 'app-user-post',
  standalone: true,
  imports: [CommonModule, MatButtonModule, UserProfileComponent, CommentButtonComponent, LikeButtonComponent, NgClass, MatCardModule, MatIconModule],
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent implements OnInit {
  BASE_URL=BASE_URL;
  posts$: Observable<Post[]>;
  userId!: number; // Replace with actual user ID logic
  isButtonDisabled = false;

  constructor(private store: Store<{ posts: Post[] }>, private authService:AuthService) {
    
      // this.posts$ = this.store.pipe(select(selectPosts));
      this.posts$ = this.store.pipe(select(selectPostsWithLikes));
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.userId=user._id;
      }
    })
      this.loadPosts();
  }

  loadPosts() {
      // Dispatch an action to load posts
      this.store.dispatch(loadPosts({ offset: 0, limit: 10 }));

      // After loading posts, fetch the likes for each post
      this.store.pipe(select(selectPosts)).subscribe(posts => {
          posts.forEach(post => {
              // Dispatch action to get likes for each post
              this.store.dispatch(getPostLikes({ postId: post._id.toString() }));
          });
      });
  }

  isLiked(postId: number): Observable<boolean> {
    // console.log("postId checked: "+postId);
    return this.store.pipe(
      select(selectPostLikeById(postId?.toString())),
      map(likeInfo => !!likeInfo) // Convert LikeInfo or undefined to boolean
  );
  }

  toggleLike(postId: number) {
    // if(this.isButtonDisabled) return;
    // this.isButtonDisabled=true;
    // Select the likeId for the post
    this.store.select(selectLikeIdByPostId(postId.toString())).pipe(take(1)).subscribe(likeId => {
        if (likeId) {
            // Dispatch delete like action if already liked
            this.store.dispatch(deletePostLike({ postId:postId.toString(), likeId }));
        } else {
            // Dispatch create like action
            this.store.dispatch(createPostLike({ postId:postId.toString(), user_id: this.userId.toString() }));
        }
    });
}
}