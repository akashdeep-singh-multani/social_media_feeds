import { NgClass } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { Observable, Subscription, map } from 'rxjs';
import { selectCommentLikes, selectPostLikes } from '../../store/selectors/like.selector';
import { LikeResponse } from '../../models/like-response.model';
import { LikeInfo } from '../../models/like-info.model';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [MatIconModule, NgClass],
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.css']
})
export class LikeButtonComponent {
  @Input() isLiked!: any;
  @Input() postId!: any;
  @Output() likeToggled = new EventEmitter<{ postId: string, isLiked: boolean }>();

  onLike() {
    if (this.isLiked === undefined) return;
    this.isLiked = !this.isLiked;
    this.likeToggled.emit({ postId: this.postId, isLiked: this.isLiked });
  }
}