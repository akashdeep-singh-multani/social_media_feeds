import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [MatIconModule, NgClass],
  templateUrl: './like-button.component.html',
  styleUrl: './like-button.component.css'
})
export class LikeButtonComponent {
  isPostLiked=false;

  onLike(){
    this.isPostLiked=!this.isPostLiked;
  }
}
