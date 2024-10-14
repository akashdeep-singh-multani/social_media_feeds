import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AddPhotoComponent } from '../add-photo/add-photo.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addPost, addPostSuccess } from '../../store/actions/post.action';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule,CommonModule,AddPhotoComponent,MatButtonModule, AddPhotoComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  selectedImageBase64Uri: string | ArrayBuffer | null="";
  // @ViewChild('postText') postText!:ElementRef;
  postText="";

  constructor(private router: Router, private store:Store<{posts:{posts:Post[]}}>){}

  handlePhotoSelection(image: string | ArrayBuffer | null){
    this.selectedImageBase64Uri=image;
  }

  handleCreatePostSubmission(){
    let request:Post={
      text:this.postText,
      image:this.selectedImageBase64Uri
    }
    this.store.dispatch(addPost({post:request}));
    //have to call the ngrx effects also call the api then only have to do following
    this.store.dispatch(addPostSuccess({post:request}))
    this.router.navigate(['user_post'])
  }

}
