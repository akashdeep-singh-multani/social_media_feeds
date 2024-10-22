import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PostCommentListComponent } from '../post-comment-list/post-comment-list.component';

@Component({
  selector: 'app-comment-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './comment-button.component.html',
  styleUrl: './comment-button.component.css'
})
export class CommentButtonComponent {
  @Input() postId!: number;

  constructor(private dialog: MatDialog) { }

  handleCommentClick() {
    this.dialog.open(PostCommentListComponent, {
      width: '90vw',
      height: '90vh',
      position: { bottom: '0vh', top: '10vh' },
      panelClass: 'full-screen-dialog',
      data: {
        postId: this.postId
      }
    })
  }
}
