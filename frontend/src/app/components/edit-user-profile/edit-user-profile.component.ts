import { Component } from '@angular/core';
import { UserPostComponent } from '../user-post/user-post.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AddPhotoComponent } from '../add-photo/add-photo.component';
import {
  BASE_URL,
  POST_LIMIT,
  POST_OFFSET,
} from '../../environment/environment';
import { UserService } from '../../services/user.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { loadPosts } from '../../store/actions/post.action';
import { Store } from '@ngrx/store';
import { SnackbarService } from '../../services/snackbar.service';
import { LoaderService } from '../../services/loader.service';
import { decodeJwtToken } from '../../utils/decode-jwt-token';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit-user-profile',
  standalone: true,
  imports: [
    AddPhotoComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    UserPostComponent,
  ],
  templateUrl: './edit-user-profile.component.html',
  styleUrl: './edit-user-profile.component.css',
})
export class EditUserProfileComponent {
  avatarUrl = '';
  username = '';
  isInputChanged = false;
  selectedImageObj: File | null = null;
  actionName = 'Edit';
  userId!: number;
  private userSubscription!: Subscription;
  myProfileObj = { userId: -1 };
  cachedUsername = '';

  constructor(
    private store: Store,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private errorHandlerservice: ErrorHandlerService,
    private authService: AuthService,
    private loaderService: LoaderService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    // this.userSubscription = this.authService.user$.subscribe((user) => {
    //   if (user) {
    //     this.updateUserDetails(user);
    //   }
    // });
    const token = this.cookieService.get('jwt');
    const user = decodeJwtToken(token).user;
    this.updateUserDetails(user);
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private updateUserDetails(user: any) {
    this.username = user.username;
    this.cachedUsername = user.username;
    this.userId = user._id;
    this.myProfileObj.userId = user._id;
    this.avatarUrl = BASE_URL + 'uploads/' + user.image;
  }

  onSelectedImageObj(imageObj: any) {
    this.selectedImageObj = imageObj;
    this.handleProfileEdit();
  }

  onProfileNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (this.cachedUsername == input.value) {
      this.isInputChanged = false;
      this.cachedUsername = input.value;
      return;
    }
    this.username = input.value;
    this.isInputChanged = true;
  }

  handleProfileEdit() {
    const formData = new FormData();
    if (this.isInputChanged) {
      formData.append('username', this.username);
    }
    if (this.selectedImageObj) {
      formData.append('image', this.selectedImageObj);
    }
    formData.append('userId', this.userId.toString());
    this.loaderService.showLoader();
    this.userService.updateProfile(formData).subscribe(
      (response) => {
        this.loaderService.hideLoader();
        if (response.status) {
          this.avatarUrl = BASE_URL + 'uploads/' + response.data.user.image;
          const newToken = response.data.token;
          this.store.dispatch(
            loadPosts({
              offset: POST_OFFSET,
              limit: POST_LIMIT,
              userId: this.userId,
            })
          );
          console.log('newToken: ' + newToken);
          this.authService.updateUser(newToken);
          this.snackbarService.openSuccess('Updation successful');
        } else {
          this.errorHandlerservice.handleError(
            'Something went wrong! Please try again later'
          );
        }
      },
      (error) => {
        this.loaderService.hideLoader();
        this.errorHandlerservice.handleError(error);
      }
    );
  }
}
