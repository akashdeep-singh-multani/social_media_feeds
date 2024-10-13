import { Component } from '@angular/core';
import {MatDialog, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { PostCommentFormComponent } from '../post-comment-form/post-comment-form.component';
import { CommonModule } from '@angular/common';
import { Comment } from '../../models/comment.model';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadComments } from '../../store/actions/comment.action';

@Component({
  selector: 'app-post-comment-list',
  standalone: true,
  imports: [CommonModule,PostCommentFormComponent,LikeButtonComponent,UserProfileComponent,MatDialogModule, MatDialogContent, MatDialogTitle],
  templateUrl: './post-comment-list.component.html',
  styleUrl: './post-comment-list.component.css'
})
export class PostCommentListComponent {
  comments$: Observable<Comment[]>=of([{id:1,text:'test1',userId:1}]);

  constructor(private store: Store<{comments:{comments:Comment[]}}>,public dialogRef: MatDialogRef<PostCommentListComponent>){
    this.comments$=this.store.select(state=>state.comments?.comments)
    // this.comments$=of([{id:1,text:'test1',userId:1}])
  }

  ngOnInit(){
    this.store.dispatch(loadComments());
  }

  onCommentAddition(comment:string){
    // console.log("comment fetched in parent: "+comment);
    this.store.select(state=>state.comments).subscribe((result)=>{
      console.log("store: "+result.comments)
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }
}