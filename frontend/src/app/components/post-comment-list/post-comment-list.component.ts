import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { PostCommentFormComponent } from '../post-comment-form/post-comment-form.component';
import { CommonModule } from '@angular/common';
import { Comment } from '../../models/comment.model';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadComments } from '../../store/actions/comment.action';
import { SocketManagerService } from '../../services/socket-manager.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-post-comment-list',
  standalone: true,
  imports: [CommonModule, PostCommentFormComponent, LikeButtonComponent, UserProfileComponent, MatDialogModule, MatDialogContent, MatDialogTitle],
  templateUrl: './post-comment-list.component.html',
  styleUrl: './post-comment-list.component.css'
})
export class PostCommentListComponent {
  comments$: Observable<Comment[]>;
  postId: number;
  action = "comment";
  newCommentReceived:boolean=false;

  constructor(private snackbarService:SnackbarService,@Inject(MAT_DIALOG_DATA) public data: any, private store: Store<{ comments: { comments: Comment[] } }>, public dialogRef: MatDialogRef<PostCommentListComponent>, private socketManagerService:SocketManagerService) {
    this.comments$ = this.store.select(state => state.comments?.comments);
    this.postId = data.postId;
  }

  ngOnInit() {
    this.store.dispatch(loadComments({ postId: this.postId }));
    this.socketManagerService.newPostCommentReceived$.subscribe((comment:any)=>{
      this.handleNewComment(comment);
    });
    this.socketManagerService.notificationReceived$.subscribe((notification:any)=>{
      this.handleNotification(notification);
    });
  }

  handleNewComment(comment:any){
    this.comments$.subscribe((comments:Comment[])=>{
      const commentExists=comments.some(cmnt=>cmnt._id===comment._id);
      if(!commentExists && !this.newCommentReceived){
        this.newCommentReceived=true;
        this.store.dispatch(loadComments({ postId: this.postId }));
        setTimeout(()=>{
          this.newCommentReceived=false;
        },1000)
      }
    })
  }

  private handleNotification(notification: any) {
    this.snackbarService.openSuccess(notification.message);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
