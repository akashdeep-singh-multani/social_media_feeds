import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AddPhotoComponent } from '../add-photo/add-photo.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addPost, addPostSuccess } from '../../store/actions/post.action';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { decodeJwtToken } from '../../utils/decode-jwt-token';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule,CommonModule,AddPhotoComponent,MatButtonModule, AddPhotoComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  selectedImageObject: File | null=null;
  // @ViewChild('postText') postText!:ElementRef;
  postText="";
  //get the user_id from state, the following user_id is for testing only until i make user related functionalities.
  user_id!:number;

  // <{posts:{posts:Post[]}}>
  constructor(private router: Router, private store:Store, private cookieService:CookieService){
    // this.store.select(selectUser).subscribe((response:any)=>{
    //   this.user_id=response?.id;
    // })
    const token=this.cookieService.get('jwt');;
    const user=decodeJwtToken(token).user;
    this.user_id=user._id;
  }

  handlePhotoSelection(imageObj: File | null){
    this.selectedImageObject=imageObj;
  }

  handleCreatePostSubmission(){
    // let request:Post={
    //   text:this.postText,
    //   image:this.selectedImageObject
    // }
    const formData=new FormData();
    formData.append('text', this.postText);
    formData.append('user_id', this.user_id.toString());
    // console.log("this.selectedImageObject: "+this.selectedImageObject)
    if(this.selectedImageObject){
      formData.append('image', this.selectedImageObject);
    }
    // formData.forEach((value, key) => {
    //   console.log(`${key}:`, value);
    // });
    this.store.dispatch(addPost({post:formData}));
    //have to call the ngrx effects also call the api then only have to do following
    // this.store.dispatch(addPostSuccess({post:request}))
    this.router.navigate(['user_post'])
  }

}
