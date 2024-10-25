import { NgClass } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { Observable, Subscription, map } from 'rxjs';
import { createCommentLike, createPostLike, deleteCommentLike, deletePostLike, getCommentLikes, getPostLikes } from '../../store/actions/like.action';
import { LikesState } from '../../store/reducers/likes.reducer';
import { selectCommentLikes, selectPostLikes } from '../../store/selectors/like.selector';
import { LikeResponse } from '../../models/like-response.model';
import { LikeInfo } from '../../models/like-info.model';

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [MatIconModule, NgClass],
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class LikeButtonComponent implements OnInit, OnDestroy {
  @Input() isLiked = false;
  @Input() postId!: any;  // Make sure this is a string
  @Input() commentId?: string;  // Optional, as not all likes will be on comments
  @Input() likeAction: string = "";
  user_id!: string;  // Make sure this is a string
  private userSubscription!: Subscription;
  @Output() likeToggled = new EventEmitter<{ postId: string, isLiked: boolean }>();
  postLikes$: Observable<LikeInfo[]>;

  constructor(private store: Store<{ postLikes:  LikeInfo[]}>, private authService: AuthService) { 
    this.postLikes$=this.store.select(selectPostLikes)
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.user_id = user._id;
        this.loadLikes();
      }
    });

    this.postLikes$.subscribe(postLikes=>{
      if(postLikes)
      this.isLiked=postLikes.some(like=>like.post_id === this.postId && like.liker_id === this.user_id)
    })
    
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  loadLikes() {
    // // if (this.likeAction === "comment") {
    // //   this.store.dispatch(getCommentLikes({ postId: this.postId.toString(), commentId: this.commentId?.toString() }));
    // //   this.store.select(selectCommentLikes).subscribe(commentLikes => {
    // //     this.isLiked = commentLikes?.some(like => like.liker_id === this.user_id && like.commentId === this.commentId?.toString());
    // //   });
    // // } else if (this.likeAction === "post") {
    //   this.store.dispatch(getPostLikes({ postId: this.postId.toString() }));
    //   this.store.select(selectPostLikes).subscribe(postLikes => {
    //     console.log("postLikes: "+JSON.stringify(postLikes))
    //     console.log("user_id: "+this.user_id)
    //     console.log("this.postId: "+this.postId)
    //     this.isLiked = postLikes?.some(like => like.liker_id === this.user_id && like.post_id === this.postId);
    //   });
      
    //   console.log("this.isLiked: "+this.isLiked);
    // // }
    // // this.postLikes$.subscribe((response)=>{
    // //   console.log("response from postLikes: "+JSON.stringify(response))
    // // })

    // this.postLikes$.subscribe(postLikes=>{
    //   this.isLiked=postLikes.some(like=>like.post_id===this.postId)
    // })

    this.store.dispatch(getPostLikes({postId:this.postId}));
    
  }

  onLike() {
    this.isLiked = !this.isLiked; // Toggle the like state
    // console.log("this.Liked: "+this.isLiked)
    this.likeToggled.emit({ postId: this.postId, isLiked: this.isLiked }); // Emit the like status

    // if (this.isLiked) {
    //   // // If not liked, dispatch create
    //   // if (this.commentId) {
    //   //   this.store.dispatch(createCommentLike({ commentId: this.commentId.toString(), user_id: this.user_id }));
    //   // } else {
    //   //   this.store.dispatch(createPostLike({ postId: this.postId, user_id: this.user_id }));
    //   // }
    //   this.store.dispatch(createPostLike({ postId: this.postId, user_id: this.user_id }));
    // } else {
    //   // // If already liked, dispatch delete
    //   // if (this.commentId) {
    //   //   const likeId = this.getLikeId(this.commentId.toString());
    //   //   this.store.dispatch(deleteCommentLike({ commentId: this.commentId.toString(), likeId }));
    //   // } else {
    //   //   const likeId = this.getLikeId(this.postId.toString());
    //   //   this.store.dispatch(deletePostLike({ postId: this.postId, likeId }));
    //   // }
    //   const likeInfo=this.postLikes$.pipe(map(likes=>likes.find(like=>like.post_id === this.postId)));
    //   likeInfo.subscribe(like=>{
    //     if(like){
    //       this.store.dispatch(deletePostLike({postId:this.postId, likeId:like._id}));
    //     }
    //   })
    // }
  }

  private getLikeId(id: string): string {
    let likeId: string = '';

    if (this.likeAction === 'comment') {
      this.store.select(selectCommentLikes).subscribe(commentLikes => {
        const like = commentLikes?.find(like => like.commentId === this.commentId?.toString());
        likeId = like ? like._id : ''; 
      });
    } else {
      this.store.select(selectPostLikes).subscribe(postLikes => {
        const like = postLikes?.find(like => like.post_id === this.postId);
        likeId = like ? like._id : ''; 
      });
    }
    return likeId;
  }
}
