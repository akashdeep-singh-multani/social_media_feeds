import { Component, SimpleChanges } from '@angular/core';
import { UserPostComponent } from '../user-post/user-post.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AddPhotoComponent } from '../add-photo/add-photo.component';

@Component({
  selector: 'app-edit-user-profile',
  standalone: true,
  imports: [AddPhotoComponent,CommonModule,MatButtonModule,MatIconModule,FormsModule,MatCardModule,UserPostComponent],
  templateUrl: './edit-user-profile.component.html',
  styleUrl: './edit-user-profile.component.css'
})
export class EditUserProfileComponent {
  avatarUrl="https://html.com/wp-content/uploads/flamingo.jpg";
  username="test";
  isInputChanged=false;
  selectedImageObj:File | null=null;
  // selectedImageUrl="";
  actionName="Edit"

  // ngOnChanges(changes: SimpleChanges) {
  //   // This will not catch emitted events directly, but can be used for input changes
  //   console.log('Input properties changed:', changes);
  // }

  onSelectedImageObj(imageObj:any){
    // this.selectedImageUrl=URL.createObjectURL(imageObj);
    this.avatarUrl=URL.createObjectURL(imageObj);
    this.selectedImageObj=imageObj;
  }

  onProfileNameChange(event:Event){
    const input=event.target as HTMLInputElement;
    if(this.username==input.value){
      this.isInputChanged=false;
      return;
    }
    this.isInputChanged=true;
  }

}
