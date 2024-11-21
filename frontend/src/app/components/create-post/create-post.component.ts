import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AddPhotoComponent } from '../add-photo/add-photo.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addPost } from '../../store/actions/post.action';
import { CookieService } from 'ngx-cookie-service';
import { decodeJwtToken } from '../../utils/decode-jwt-token';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    AddPhotoComponent,
    MatButtonModule,
    AddPhotoComponent,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  selectedImageObject: File | null = null;
  postText = '';
  userId!: number;

  constructor(
    private router: Router,
    private store: Store,
    private cookieService: CookieService,
    private loaderService: LoaderService
  ) {
    const token = this.cookieService.get('jwt');
    const user = decodeJwtToken(token).user;
    this.userId = user._id;
  }

  handlePhotoSelection(imageObj: File | null) {
    this.selectedImageObject = imageObj;
  }

  handleCreatePostSubmission() {
    const formData = new FormData();
    formData.append('text', this.postText);
    formData.append('userId', this.userId.toString());
    if (this.selectedImageObject) {
      formData.append('image', this.selectedImageObject);
    }
    this.loaderService.showLoader();
    this.store.dispatch(addPost({ post: formData }));
    this.router.navigate(['user_post']);
  }
}
