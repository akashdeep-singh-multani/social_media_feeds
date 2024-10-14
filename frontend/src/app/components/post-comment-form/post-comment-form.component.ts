import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { addComment, addCommentSuccess } from '../../store/actions/comment.action';
import {Comment} from '../../models/comment.model'

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

  constructor(private fb:FormBuilder, private store: Store<{comments:{comments:Comment[]}}>){
    this.commentsForm=this.fb.group({
      comment: ['', [Validators.minLength(1)]]
    });
  }

  onSubmit(){
    let value=this.commentsForm.get('comment')?.value;
    let newComment:Comment={
      id: Date.now(),
      text:value,
      userId:1
    }
    this.store.dispatch(addComment({comment:newComment}));
    //for testing without calling api
    // this.store.dispatch(addCommentSuccess({ comment: newComment }));
    // this.addComment.emit(value);
    this.commentsForm.reset();
    
  }

}
