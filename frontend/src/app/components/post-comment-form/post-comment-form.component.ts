import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { addComment, addCommentSuccess } from '../../store/actions/comment.action';
import { CookieService } from 'ngx-cookie-service';
import { decodeJwtToken } from '../../utils/decode-jwt-token';


@Component({
  selector: 'app-post-comment-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './post-comment-form.component.html',
  styleUrl: './post-comment-form.component.css'
})
export class PostCommentFormComponent {
  commentsForm!:FormGroup;
  // @Output() addComment=new EventEmitter();
  @Input() postId!:number;
  // get userId by managed state details after login, will do after making all the needed components
  userId!:number;

  // <{comments:{comments:Comment[]}}>
  constructor(private fb:FormBuilder, private store: Store, private cookieService:CookieService){
    this.commentsForm=this.fb.group({
      comment: ['', [Validators.minLength(1)]]
    });
    // this.store.select(selectUser).subscribe((response:any)=>{
    //   this.userId=response?.id;
    // })
    const token=this.cookieService.get('jwt');;
    const user=decodeJwtToken(token).user;
    this.userId=user._id;
  }

  onSubmit(){
    let value=this.commentsForm.get('comment')?.value;
    let newComment={
      post_id:this.postId,
      text:value,
      commenter_id:this.userId
    }
    this.store.dispatch(addComment({comment:newComment}));
    //for testing without calling api
    // this.store.dispatch(addCommentSuccess({ comment: newComment }));
    // this.addComment.emit(value);
    this.commentsForm.reset();
    
  }

}
