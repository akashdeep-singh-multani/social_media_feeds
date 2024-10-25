import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
import { Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { BASE_URL } from '../../environment/environment';
import { SocketService } from '../../services/socket.service';
import { selectAllPostsLoaded } from '../../store/selectors/post.selectors';
import { createPostLike, deletePostLike, getPostLikes } from '../../store/actions/like.action';
import { LikeInfo } from '../../models/like-info.model';
import { AuthService } from '../../services/auth.service';
import { selectPostLikes } from '../../store/selectors/like.selector';

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
  private newPostReceived = false; // Prevent duplicate dispatching
  private isSocketInitialized = false; // Prevent multiple socket listeners
  likeAction = "post";
  // postLikes: { [key: string]: any} = {}; // Dictionary for tracking likes
  // postLikes:LikeInfo[]=[];
  private userSubscription!: Subscription;
  user_id!:string;
  postLikes$:Observable<LikeInfo[]>;

  constructor(
    private authService:AuthService,
    private router: Router,
    private store: Store<{ posts: { posts: Post[] } }>,
    private socketService: SocketService // Add SocketService here
  ) {
    this.posts$ = this.store.select(state => state.posts?.posts);
    this.postLikes$=this.store.select(selectPostLikes);
  }

  ngOnInit() {
    this.postLikes$.pipe(distinctUntilChanged(),takeUntil(this.destroy$)).subscribe((response)=>{
      console.log("postLikes subscribe ngOnInit: "+JSON.stringify(response))
    })
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.user_id = user._id;
        
      }
    });
    
    this.loadPosts();
    this.loadPostlikes();

    if (!this.isSocketInitialized) {
      this.initializeSocket();
      this.isSocketInitialized = true;
    }
  }
  

  loadPostlikes(){
    this.posts$.subscribe(posts=>{
      posts.forEach(post=>{
        this.store.dispatch(getPostLikes({postId:post._id.toString()}));
      });
    })
  }

  isPostLiked(post_id:number){
    return !!this.postLikes$.subscribe((response)=>{
      return response.find(like => like.post_id === post_id.toString());
    })
  }

  private initializeSocket() {
    this.socketService.listenToNewPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((newPost: any) => {
        this.handleNewPost(newPost);
      });

    this.socketService.listenToNotifications()
      .pipe(takeUntil(this.destroy$))
      .subscribe((notification: any) => {
        this.handleNotification(notification);
      });
  }

  private handleNewPost(newPost: any) {
    this.posts$.subscribe(posts => {
      const postExists = posts.some(post => post._id === newPost._id);
      if (!postExists && !this.newPostReceived) {
        this.newPostReceived = true;
        this.store.dispatch(loadPosts({ offset: 0, limit: 10 }));

        setTimeout(() => {
          this.newPostReceived = false;
        }, 1000);
      }
    });
  }

  private handleNotification(notification: any) {
    console.log("handle notification called");
    alert(notification.message);
  }

  private loadPosts() {
    if (this.loading) return;
    this.loading = true;
    this.store.dispatch(loadPosts({ offset: this.offset, limit: this.limit }));

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
    // this.postLikes[postId] = isLiked; // Update the dictionary with the like status
    // console.log("this.postLikes[postId]: "+postId+" "+this.postLikes[postId])
    // console.log(`Post ID: ${postId}, Liked: ${isLiked}`);
    // this.store.dispatch(getPostLikes({ postId })); // Optionally dispatch post likes
    console.log("isLiked in: "+isLiked);
    if(!isLiked){
      let likeInfo:any;
      this.userSubscription=this.postLikes$.subscribe((response)=>{
        // console.log("postLikes subscribe: "+JSON.stringify(response))
        likeInfo=response.find(like=>like.post_id === postId)
      })
      console.log("likeInfo while delete: "+JSON.stringify(likeInfo))
      if(likeInfo){
        this.store.dispatch(deletePostLike({postId, likeId:likeInfo._id}))
      }
      
    }
    else{
      console.log("user_id"+this.user_id)
      this.store.dispatch(createPostLike({postId, user_id:this.user_id}));
    }
  }
}




