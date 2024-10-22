import { Component, SimpleChanges } from '@angular/core';
import { UserPostComponent } from '../user-post/user-post.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AddPhotoComponent } from '../add-photo/add-photo.component';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { decodeJwtToken } from '../../utils/decode-jwt-token';
import { BASE_URL } from '../../environment/environment';
import { UserService } from '../../services/user.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import * as AuthActions from '../../store/actions/auth.action';

@Component({
  selector: 'app-edit-user-profile',
  standalone: true,
  imports: [AddPhotoComponent,CommonModule,MatButtonModule,MatIconModule,FormsModule,MatCardModule,UserPostComponent],
  templateUrl: './edit-user-profile.component.html',
  styleUrl: './edit-user-profile.component.css'
})
export class EditUserProfileComponent {
  avatarUrl="";
  username="";
  isInputChanged=false;
  selectedImageObj:File | null=null;
  actionName="Edit";
  user_id!:number;

  constructor(private store:Store, private cookieService:CookieService, private userService:UserService, private errorHandlerservice:ErrorHandlerService){}

  ngOnInit(){
    const token=this.cookieService.get('jwt');;
    const user=decodeJwtToken(token).user;
    this.username=user.username;
    this.user_id=user._id;
    // console.log("this.user_id: "+this.user_id);
    this.avatarUrl=BASE_URL+'uploads/'+user.image;
  }

  onSelectedImageObj(imageObj:any){
    // this.avatarUrl=URL.createObjectURL(imageObj);
    this.selectedImageObj=imageObj;
    this.handleProfileEdit();
  }

  onProfileNameChange(event:Event){
    const input=event.target as HTMLInputElement;
    if(this.username==input.value){
      this.isInputChanged=false;
      return;
    }
    this.username=input.value;
    this.isInputChanged=true;
  }

  handleProfileEdit(){
    // this.store.dispatch()
    //for-testing purpose doing the below without ngrx
    const formData=new FormData();
    if(this.isInputChanged){
      formData.append('username',this.username);
    }
    if(this.selectedImageObj){
      formData.append('image', this.selectedImageObj)
    }
    formData.append('user_id',this.user_id.toString());
    this.userService.updateProfile(formData).subscribe((response)=>{
        if(response.status){
          this.avatarUrl=BASE_URL+'uploads/'+response.user.image;
          const newToken=response.token;
          this.store.dispatch(AuthActions.updateUserToken({token: newToken}));
          this.cookieService.set('jwt', newToken);
          console.log("response after updating user profile: "+JSON.stringify(response))
        }
        else{
          
        }
    },(error)=>{
      this.errorHandlerservice.handleError(error);
    })
  }

}
