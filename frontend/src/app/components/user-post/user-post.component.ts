import { CommonModule, NgClass } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { CommentButtonComponent } from '../comment-button/comment-button.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadPosts } from '../../store/actions/post.action';
import { Post } from '../../models/post.model';
import { Observable, Subject, Subscription, combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import {
  BASE_URL,
  POST_LIMIT,
  POST_OFFSET,
} from '../../environment/environment';
import {
  selectAllPostsLoaded,
  selectPosts,
  selectPostsByUserId,
} from '../../store/selectors/post.selectors';
import {
  createPostLike,
  deletePostLike,
  getPostLikes,
} from '../../store/actions/like.action';
import { LikeInfo } from '../../models/like-info.model';
import { AuthService } from '../../services/auth.service';
import { selectPostLikes } from '../../store/selectors/like.selector';
import { SnackbarService } from '../../services/snackbar.service';
import { SocketManagerService } from '../../services/socket-manager.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-user-post',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonModule,
    UserProfileComponent,
    CommentButtonComponent,
    LikeButtonComponent,
    NgClass,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css'],
})
export class UserPostComponent implements OnInit {
  BASE_URL = BASE_URL;
  posts$: Observable<Post[]>;
  offset: number = POST_OFFSET;
  limit: number = POST_LIMIT;
  private loading: boolean = false;
  private destroy$ = new Subject<void>();
  allPostsLoaded$: Observable<boolean> =
    this.store.select(selectAllPostsLoaded);
  action = 'feed';
  private newPostReceived = false;
  likeAction = 'post';
  user_id!: string;
  postLikes$: Observable<LikeInfo[]>;
  postWithLikes$!: Observable<Post[]>;
  @Input() myProfileObj: { userId: number } = { userId: -1 };

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<{ posts: { posts: Post[] } }>,
    private snackbarService: SnackbarService,
    private socketManagerService: SocketManagerService,
    private loaderService: LoaderService
  ) {
    this.posts$ = this.store.select(selectPosts);
    this.postLikes$ = this.store.select(selectPostLikes);

    this.syncPostsWithLikes();
  }

  ngOnInit() {
    this.user_id = this.authService.getLoggedInUser()._id;
    this.loadPosts();
    this.loadPostlikes();

    this.socketManagerService.newPostReceived$
      .pipe(takeUntil(this.destroy$))
      .subscribe((newPost) => {
        this.handleNewPost(newPost);
      });
    this.socketManagerService.notificationReceived$
      .pipe(takeUntil(this.destroy$))
      .subscribe((notification) => {
        this.handleNotification(notification);
      });
  }

  syncPostsWithLikes() {
    this.postWithLikes$ = combineLatest([this.posts$, this.postLikes$]).pipe(
      map(([posts, likes]) => {
        console.log('posts with likes: ' + JSON.stringify(posts));
        return posts.map((post) => ({
          ...post,
          isLiked: likes.some(
            (like) => String(like.postId) === String(post._id)
          ),
        }));
      })
    );
  }

  loadPostlikes() {
    this.posts$.subscribe((posts) => {
      posts.forEach((post) => {
        this.store.dispatch(getPostLikes({ postId: String(post._id) }));
      });
    });
  }

  private handleNewPost(newPost: any) {
    this.posts$.subscribe((posts) => {
      const postExists = posts.some((post) => post._id === newPost._id);
      if (!postExists && !this.newPostReceived) {
        this.newPostReceived = true;
        this.loaderService.showLoader();
        this.store.dispatch(
          loadPosts({ offset: 0, limit: 10, userId: this.myProfileObj.userId })
        );
        setTimeout(() => {
          this.newPostReceived = false;
        }, 1000);
      }
    });
  }

  private handleNotification(notification: any) {
    this.snackbarService.openSuccess(notification.message);
  }

  private loadPosts() {
    if (this.loading) return;
    this.loading = true;
    let myProfileUserId = this.myProfileObj.userId;
    this.loaderService.showLoader();
    this.store.dispatch(
      loadPosts({
        offset: this.offset,
        limit: this.limit,
        userId: myProfileUserId,
      })
    );

    // this.allPostsLoaded$.pipe(takeUntil(this.destroy$)).subscribe((loaded) => {
    //   if (!loaded) {
    //     this.offset += this.limit;
    //   } else {
    //     this.loading = false;
    //   }
    // });
  }

  // @HostListener('window:scroll', [])
  // onScroll(): void {
  //   if (
  //     window.innerHeight + window.scrollY >=
  //     document.body.offsetHeight - 100
  //   ) {
  //     this.allPostsLoaded$
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe((loaded) => {
  //         if (!loaded && !this.loading) {
  //           this.loadPosts();
  //         }
  //       });
  //   }
  // }

  handleCreatePostClick() {
    this.router.navigate(['create_post']);
  }

  toggleLike(event: { postId: string; isLiked: boolean }) {
    const { postId, isLiked } = event;
    if (!isLiked) {
      let likeInfo: any;
      this.postLikes$.subscribe((response) => {
        likeInfo = response.find((like) => like.postId === postId);
      });
      if (likeInfo) {
        this.loaderService.showLoader();
        this.store.dispatch(deletePostLike({ postId, likeId: likeInfo._id }));
      }
    } else {
      this.loaderService.showLoader();
      this.store.dispatch(createPostLike({ postId, userId: this.user_id }));
    }
  }

  trackByPostId(index: number, post: Post): string {
    return post._id.toString();
  }
}
