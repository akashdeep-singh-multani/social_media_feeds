import { Component } from '@angular/core';
import {MatDialog, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { LikeButtonComponent } from '../like-button/like-button.component';

@Component({
  selector: 'app-post-comment-list',
  standalone: true,
  imports: [LikeButtonComponent,UserProfileComponent,MatDialogModule, MatDialogContent, MatDialogTitle],
  templateUrl: './post-comment-list.component.html',
  styleUrl: './post-comment-list.component.css'
})
export class PostCommentListComponent {
  constructor(public dialogRef: MatDialogRef<PostCommentListComponent>){}

  closeDialog(){
    this.dialogRef.close();
  }
}
