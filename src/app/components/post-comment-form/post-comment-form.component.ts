import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-post-comment-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './post-comment-form.component.html',
  styleUrl: './post-comment-form.component.css'
})
export class PostCommentFormComponent {
  commentsForm!:FormGroup;

  constructor(private fb:FormBuilder){
    this.commentsForm=this.fb.group({
      comment: ['', [Validators.minLength(1)]]
    });
  }

  onSubmit(){

  }

}
