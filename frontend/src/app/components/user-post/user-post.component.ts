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
import { addPost, loadPosts } from '../../store/actions/post.action';
import { Post } from '../../models/post.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BASE_URL } from '../../environment/environment';
import { SocketService } from '../../services/socket.service';
import { selectAllPostsLoaded } from '../../store/selectors/post.selectors';

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

  constructor(
    private router: Router,
    private store: Store<{ posts: { posts: Post[] } }>,
    private socketService: SocketService // Add SocketService here
  ) {
    this.posts$ = this.store.select(state => state.posts?.posts);
  }

  ngOnInit() {
    this.loadPosts();

    if (!this.isSocketInitialized) {
      this.initializeSocket();
      this.isSocketInitialized = true;
    }
  }

  private initializeSocket() {
    this.socketService.listenToNewPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((newPost: any) => {
        this.handleNewPost(newPost);
      });
  }

  private handleNewPost(newPost: any) {
    this.posts$.subscribe(posts => {
      const postExists = posts.some(post => post._id === newPost._id);
      if (!postExists && !this.newPostReceived) {
        this.newPostReceived = true;

        const formData = new FormData();
        formData.append('text', newPost.text);
        formData.append('user_id', newPost.user_id);
        formData.append('image', newPost.image);

        this.store.dispatch(loadPosts({ offset: 0, limit: 10 }))

        setTimeout(() => {
          this.newPostReceived = false;
        }, 1000);
      }
    });
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
  }
}
