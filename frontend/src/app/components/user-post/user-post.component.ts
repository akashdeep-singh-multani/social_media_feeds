import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { CommentButtonComponent } from '../comment-button/comment-button.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadPosts } from '../../store/actions/post.action';
import { Post } from '../../models/post.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-post',
  standalone: true,
  imports: [CommonModule,MatButtonModule,UserProfileComponent, CommentButtonComponent,LikeButtonComponent,NgClass,MatCardModule, MatIconModule],
  templateUrl: './user-post.component.html',
  styleUrl: './user-post.component.css'
})
export class UserPostComponent {
  posts:Post[]=[];
  posts$: Observable<Post[]>=of([{text:"",image:""}]);

  constructor(private router: Router, private store:Store<{posts:{posts:Post[]}}>){
    this.posts$=this.store.select(state=>state.posts?.posts);
  }

  ngOnInit(){
    this.store.dispatch(loadPosts());
    this.store.select(state=>state.posts?.posts).subscribe((result)=>{
      console.log(result)
      this.posts=result;
    })
  }

  handleCreatePostClick(){
    this.router.navigate(['create_post']);
  }
  
}
