import { Component } from '@angular/core';
import {MatDialog, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { PostCommentFormComponent } from '../post-comment-form/post-comment-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-comment-list',
  standalone: true,
  imports: [CommonModule,PostCommentFormComponent,LikeButtonComponent,UserProfileComponent,MatDialogModule, MatDialogContent, MatDialogTitle],
  templateUrl: './post-comment-list.component.html',
  styleUrl: './post-comment-list.component.css'
})
export class PostCommentListComponent {
  arraySample=Array(10)
  constructor(public dialogRef: MatDialogRef<PostCommentListComponent>){}

  closeDialog(){
    this.dialogRef.close();
  }
}
