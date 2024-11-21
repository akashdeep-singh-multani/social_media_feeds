import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import {
  addComment,
  addCommentSuccess,
} from '../../store/actions/comment.action';
import { CookieService } from 'ngx-cookie-service';
import { decodeJwtToken } from '../../utils/decode-jwt-token';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-post-comment-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './post-comment-form.component.html',
  styleUrl: './post-comment-form.component.css',
})
export class PostCommentFormComponent {
  commentsForm!: FormGroup;
  @Input() postId!: number;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private cookieService: CookieService,
    private loaderService: LoaderService
  ) {
    this.commentsForm = this.fb.group({
      comment: ['', [Validators.minLength(1)]],
    });
    const token = this.cookieService.get('jwt');
    const user = decodeJwtToken(token).user;
    this.userId = user._id;
  }

  onSubmit() {
    let value = this.commentsForm.get('comment')?.value;
    let newComment = {
      postId: this.postId,
      text: value,
      commenterId: this.userId,
    };
    this.loaderService.showLoader();
    this.store.dispatch(addComment({ comment: newComment }));
    this.commentsForm.reset();
  }
}
