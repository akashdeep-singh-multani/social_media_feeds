import { Injectable, OnDestroy } from '@angular/core';
import { SocketService } from './socket.service';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketManagerService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private newPostReceivedSource = new Subject<any>;
  private newPostLikeReceivedSource = new Subject<any>;
  private newPostCommentReceivedSource = new Subject<any>;
  private notificationReceivedSource = new Subject<any>;

  newPostReceived$ = this.newPostReceivedSource.asObservable();
  newPostLikeReceived$ = this.newPostLikeReceivedSource.asObservable();
  newPostCommentReceived$ = this.newPostCommentReceivedSource.asObservable();
  notificationReceived$ = this.notificationReceivedSource.asObservable()

  constructor(private socketService: SocketService) {
    this.initializeSockets();
  }

  private initializeSockets() {
    this.socketService.listenToNewPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((newPost: any) => {
        this.newPostReceivedSource.next(newPost);
      });

    this.socketService.listenToNewPostLikes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((newPost: any) => {
        this.newPostLikeReceivedSource.next(newPost);
      });

    this.socketService.listenToNewPostComments()
      .pipe(takeUntil(this.destroy$))
      .subscribe((newPost: any) => {
        this.newPostCommentReceivedSource.next(newPost);
      });

      this.socketService.listenToNotifications()
      .pipe(takeUntil(this.destroy$))
      .subscribe((notification: any) => {
        this.notificationReceivedSource.next(notification);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
