import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { Subscription, take } from 'rxjs';
import { createCommentLike, createPostLike, deleteCommentLike, deletePostLike, getCommentLikes, getPostLikes } from '../../store/actions/like.action';
import { Like } from '../../models/like.model';
import { LikesState } from '../../store/reducers/likes.reducer';
import { selectCommentLikes, selectPostLikes } from '../../store/selectors/like.selector';

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [MatIconModule, NgClass],
  templateUrl: './like-button.component.html',
  styleUrl: './like-button.component.css'
})
export class LikeButtonComponent {
  isLiked=false;
  @Input() postId!:number;
  @Input() commentId!:number;
  @Input() likeAction="";
  user_id!:number;
  private userSubscription!: Subscription;

  constructor(private store:Store<{likes:LikesState}>, private authService:AuthService){
    // if(this.likeAction=="comment"){

    // }
    // else if(this.likeAction=="post"){

    // }
  }

  ngOnInit(){
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.user_id=user._id;
      }
    });
    // if(this.likeAction=="comment"){
    //   this.store.dispatch(getCommentLikes({postId:this.postId.toString(), commentId:this.commentId.toString()}));
      
    //   this.store.select(state=>state.likes).subscribe(likesState=>{
    //     console.log("likesState in comments: "+JSON.stringify(likesState))
    //     this.isLiked=likesState.likes.some(like=>like.commentId==this.commentId.toString())
    //   })
    // }
    // else if(this.likeAction=="post"){
    //   this.store.dispatch(getPostLikes({postId:this.postId.toString()}));
    //   this.store.select(state=>state.likes).subscribe(likesState=>{
    //     console.log("likesState in posts: "+JSON.stringify(likesState))
    //     this.isLiked=likesState.likes.some(like=>like.postId==this.postId.toString())
    //   })
    // }

    this.loadLikes();

    

  
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  loadLikes(){
    if (this.likeAction === "comment") {
      this.store.dispatch(getCommentLikes({ postId: this.postId.toString(), commentId: this.commentId.toString() }));
      this.store.select(selectCommentLikes).subscribe(commentLikes => {
        this.isLiked = commentLikes.some(like => like.liker_id===this.user_id && like.commentId === this.commentId.toString());
    });
      
    } else if (this.likeAction === "post") {
      this.store.dispatch(getPostLikes({ postId: this.postId.toString() }));

      this.store.select(selectPostLikes).pipe(
          take(1) // Get only the first emitted value
      ).subscribe(postLikes => {
        console.log("postLikes load: "+JSON.stringify(postLikes))
          this.isLiked = postLikes.some(like => like.like.liker_id === this.user_id && like.like.post_id === this.postId);
          console.log("this.isLiked post: " + this.isLiked);
      });
  }
    
    
  }

  onLike() {
    if (this.isLiked) {
        // If already liked, dispatch delete
        const likeId = this.getLikeId(this.postId.toString());
        if (this.commentId) {
            this.store.dispatch(deleteCommentLike({ commentId: this.commentId.toString(), likeId }));
        } else {
            this.store.dispatch(deletePostLike({ postId: this.postId.toString(), likeId }));
        }
    } else {
        // If not liked, dispatch create
        if (this.commentId) {
            this.store.dispatch(createCommentLike({ commentId: this.commentId.toString(), user_id: this.user_id.toString() }));
        } else {
            this.store.dispatch(createPostLike({ postId: this.postId.toString(), user_id: this.user_id.toString() }));
        }
    }
    this.isLiked = !this.isLiked; // Toggle after dispatch
    console.log("after post click this.isLiked: ", this.isLiked);
}


//   private getLikeId(id: string): string {
//     let likeId :any;
    
//     if(this.likeAction=='comment'){
//       console.log("commentId checked: "+id)
//       this.store.select(selectCommentLikes).subscribe(commentLikes => {
//         const like = commentLikes?.find(like => like.commentId === this.commentId.toString());
//         likeId = like ? like.id : ''; 
//     });
//     }
//     else{
//       console.log("postId checked: "+id)
//       this.store.select(selectPostLikes).subscribe(postLikes => {
//         console.log("postLikes: "+JSON.stringify(postLikes))
//         const like = postLikes?.find(like => {console.log(`checked like.post_id: ${like.post_id} and this.postId: ${this.postId}`);return like.post_id === this.postId.toString()});
//         likeId = like ? like._id : ''; 
//     });
//     }
//     console.log("likedId returned: "+likeId)
//     return likeId;
// }

private getLikeId(id: string): string {
  let likeId: string = '';
  
  if (this.likeAction === 'comment') {
      this.store.select(selectCommentLikes).pipe(take(1)).subscribe(commentLikes => {
          const like = commentLikes.find(like => like.commentId === this.commentId.toString());
          likeId = like ? like.id : ''; 
      });
  } else {
      this.store.select(selectPostLikes).pipe(take(1)).subscribe(postLikes => {
        console.log("this.postId: "+this.postId)
        console.log("postLikes: "+JSON.stringify(postLikes))
          const like = postLikes.find(like => like.like.post_id === this.postId.toString());
          console.log("like obj: "+JSON.stringify(like));
          likeId = like ? like.like._id : ''; 
      });
  }
  return likeId;
}

}
