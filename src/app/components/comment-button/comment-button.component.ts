import { Component } from '@angular/core';
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

  constructor(private dialog:MatDialog){}

  handleCommentClick(){
    this.dialog.open(PostCommentListComponent,{
      width:'100%',
      height:'100%',
      position:{bottom:'0px'},
      panelClass:'full-screen-dialog'
    })
  }
}
