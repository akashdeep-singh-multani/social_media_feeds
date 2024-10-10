import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-post-comment-list',
  standalone: true,
  imports: [],
  templateUrl: './post-comment-list.component.html',
  styleUrl: './post-comment-list.component.css'
})
export class PostCommentListComponent {
  constructor(public dialogRef: MatDialogRef<PostCommentListComponent>){}

  closeDialog(){
    this.dialogRef.close();
  }
}
