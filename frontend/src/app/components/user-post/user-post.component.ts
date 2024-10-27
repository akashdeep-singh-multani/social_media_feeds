import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener, Input } from '@angular/core';
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
import { BASE_URL } from '../../environment/environment';
import { selectAllPostsLoaded, selectPosts, selectPostsByUserId } from '../../store/selectors/post.selectors';
import { createPostLike, deletePostLike, getPostLikes } from '../../store/actions/like.action';
import { LikeInfo } from '../../models/like-info.model';
import { AuthService } from '../../services/auth.service';
import { selectPostLikes } from '../../store/selectors/like.selector';
import { SnackbarService } from '../../services/snackbar.service';
import { SocketManagerService } from '../../services/socket-manager.service';

@Component({
  selector: 'app-user-post',
  standalone: true,
  imports: [CommonModule, MatButtonModule, UserProfileComponent, CommentButtonComponent, LikeButtonComponent, NgClass, MatCardModule, MatIconModule],
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent implements OnInit, OnDestroy {
  BASE_URL = BASE_URL;
  posts$: Observable<Post[]>;
  offset: number = 0;
  limit: number = 2;
  private loading: boolean = false;
  private destroy$ = new Subject<void>();
  allPostsLoaded$: Observable<boolean> = this.store.select(selectAllPostsLoaded);
  action = "feed";
  private newPostReceived = false;
  likeAction = "post";
  private userSubscription!: Subscription;
  user_id!: string;
  postLikes$: Observable<LikeInfo[]>;
  postWithLikes$!: Observable<Post[]>;
  @Input() myProfileObj:{user_id:number}={user_id:-1};

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<{ posts: { posts: Post[] } }>,
    private snackbarService: SnackbarService,
    private socketManagerService: SocketManagerService
  ) {
    this.posts$ = this.store.select(selectPosts);
    this.postLikes$ = this.store.select(selectPostLikes);

    this.syncPostsWithLikes();
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.user_id = user._id;
        this.loadPosts();
        this.loadPostlikes();
      }
    });

    this.socketManagerService.newPostReceived$.pipe(takeUntil(this.destroy$)).subscribe(newPost => {
      this.handleNewPost(newPost);
    });
    this.socketManagerService.notificationReceived$.pipe(takeUntil(this.destroy$)).subscribe(notification => {
      this.handleNotification(notification);
    });

  }

  syncPostsWithLikes() {
    this.postWithLikes$ = combineLatest([this.posts$, this.postLikes$]).pipe(
      map(([posts, likes]) => {
        return posts.map(post => ({
          ...post,
          isLiked: likes.some(like => String(like.post_id) === String(post._id))
        }));
      })
    );
  }


  loadPostlikes() {
    this.posts$.subscribe(posts => {
      posts.forEach(post => {
        this.store.dispatch(getPostLikes({ postId: String(post._id) }));
      });
    })
  }

  isPostLiked(post_id: number) {
    return !!this.postLikes$.subscribe((response) => {
      return response.find(like => like.post_id === post_id.toString());
    })
  }

  // private initializeSocket() {
  //   this.socketService.listenToNewPosts()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((newPost: any) => {
  //       this.handleNewPost(newPost);
  //     });

  //   this.socketService.listenToNotifications()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((notification: any) => {
  //       this.handleNotification(notification);
  //     });
  // }

  private handleNewPost(newPost: any) {
    this.posts$.subscribe(posts => {
      const postExists = posts.some(post => post._id === newPost._id);
      if (!postExists && !this.newPostReceived) {
        this.newPostReceived = true;
        this.store.dispatch(loadPosts({ offset: 0, limit: 10, user_id: this.myProfileObj.user_id }));
        setTimeout(() => {
          this.newPostReceived = false;
        }, 1000);
      }
    });
  }

  private handleNotification(notification: any) {
    // alert(notification.message);
    this.snackbarService.openSuccess(notification.message);
  }

  private loadPosts() {
    if (this.loading) return;
    this.loading = true;
    let myProfileUserId=this.myProfileObj.user_id;
      this.store.dispatch(loadPosts({ offset: this.offset, limit: this.limit, user_id:myProfileUserId }));

    this.allPostsLoaded$.pipe(takeUntil(this.destroy$)).subscribe(loaded => {
      if (!loaded) {
        this.offset += this.limit;
      } else {
        this.loading = false;
      }
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      this.allPostsLoaded$.pipe(takeUntil(this.destroy$)).subscribe(loaded => {
        if (!loaded && !this.loading) {
          this.loadPosts();
        }
      });
    }
  }

  handleCreatePostClick() {
    this.router.navigate(['create_post']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.userSubscription.unsubscribe();
  }

  toggleLike(event: { postId: string; isLiked: boolean }) {
    const { postId, isLiked } = event;
    if (!isLiked) {
      let likeInfo: any;
      this.userSubscription = this.postLikes$.subscribe((response) => {
        likeInfo = response.find(like => like.post_id === postId)
      })
      if (likeInfo) {
        this.store.dispatch(deletePostLike({ postId, likeId: likeInfo._id }))
      }

    }
    else {
      this.store.dispatch(createPostLike({ postId, user_id: this.user_id }));
    }
  }
}