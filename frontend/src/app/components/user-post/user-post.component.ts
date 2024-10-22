import { CommonModule, NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { CommentButtonComponent } from '../comment-button/comment-button.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addPost, loadPosts } from '../../store/actions/post.action';
import { Post } from '../../models/post.model';
import { Observable, of } from 'rxjs';
import { BASE_URL } from '../../environment/environment';
import { SocketService } from '../../services/socket.service';
import { selectAllPostsLoaded } from '../../store/selectors/post.selectors';

@Component({
  selector: 'app-user-post',
  standalone: true,
  imports: [CommonModule, MatButtonModule, UserProfileComponent, CommentButtonComponent, LikeButtonComponent, NgClass, MatCardModule, MatIconModule],
  templateUrl: './user-post.component.html',
  styleUrl: './user-post.component.css'
})
export class UserPostComponent {
  // posts:Post[]=[];
  BASE_URL = BASE_URL;
  posts$: Observable<Post[]> ;
  offset:number=0;
  limit:number=2;
  private scrollTimeout:any;
  loading:boolean=false;
  // allPostsLoaded: boolean=false;
  allPostsLoaded$: Observable<boolean>;
  action="feed";

  constructor( private router: Router, private store: Store<{ posts: { posts: Post[] } }>) {
    this.posts$ = this.store.select(state => state.posts?.posts);
    this.allPostsLoaded$=this.store.select(selectAllPostsLoaded);
  }

  ngOnInit() {
    console.log("user-post ngOnInit called")
    this.loadPosts();

    // this.posts$.subscribe(posts=>{
    //   console.log("post received: "+JSON.stringify(posts));
    // }
    // )

    // this.socketService.listenToNewPosts().subscribe((newPost: any) => {
    //   console.log("socket listened post: " + JSON.stringify(newPost));
    //   const formData = new FormData();
    //   formData.append('text', newPost.text);
    //   formData.append('user_id', newPost.user_id);
    //   formData.append('image', newPost.image);

    //   this.store.dispatch(addPost({ post: formData }))
    // })
    // this.store.select(state=>state.posts?.posts).subscribe((result)=>{
    //   console.log("result from posts"+result)
    //   this.posts=result;
    // })
  }

  private loadPosts(){
    if(this.loading) return;
    this.loading=true;
    this.store.dispatch(loadPosts({offset: this.offset, limit:this.limit}));
    
    this.allPostsLoaded$.subscribe(loaded=>{
      if(!loaded){
        this.offset +=this.limit;
      }
      else{
        this.loading=false;
      }
    })
  }

  @HostListener('window:scroll', [])
  onScroll(): void{
      if((window.innerHeight+window.scrollY) >= document.body.offsetHeight - 100){
        this.allPostsLoaded$.subscribe(loaded=>{
          if(!loaded && !this.loading)
            this.loadPosts();
        })
        
      }

    
  }
  

  handleCreatePostClick() {
    this.router.navigate(['create_post']);
  }

}
