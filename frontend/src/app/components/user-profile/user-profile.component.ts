import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Comment } from '../../models/comment.model';
import { BASE_URL } from '../../environment/environment';
import { CookieService } from 'ngx-cookie-service';
import { decodeJwtToken } from '../../utils/decode-jwt-token';
import { Subscription } from 'rxjs';
import { PosterInfo } from '../../models/poster-info.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  title = "";
  subtitle = "Sponsored";
  avatar_image = "";
  BASE_URL = BASE_URL;
  @Input() commenter_info: Comment = { _id: -1, commenter_id: -1, post_id: -1, text: "", createdAt: "" };
  private userSubscription!: Subscription;
  @Input() action = "";
  @Input() posterInfo!: PosterInfo;

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.subtitle = this.commenter_info.text;
    if (this.action == 'feed') {
      this.getPostUserInfo();
    }
    else {
      const token = this.cookieService.get('jwt');;
      const user = decodeJwtToken(token).user;
      this.title = user.username;
      this.avatar_image = BASE_URL + 'uploads/' + user.image;
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  getPostUserInfo() {
    this.avatar_image = BASE_URL + 'uploads/' + this.posterInfo.image;
    this.title = this.posterInfo.username;
  }

}
