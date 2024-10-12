import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AddPhotoComponent } from '../add-photo/add-photo.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [MatButtonModule, AddPhotoComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

}
