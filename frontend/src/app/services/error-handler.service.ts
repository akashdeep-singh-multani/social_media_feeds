import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import * as AuthActions from '../store/actions/auth.action'
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private snackbarService:SnackbarService, private cookieService: CookieService, private store: Store) { }

  handleError(error: any) {
    let message = "";
    if (error.status === 0) {
      message = "Network error: Please check your internet connection.";
    }
    else if (error.status >= 400 && error.status !== 401 && error.status < 500) {
      message = error.error?.message || 'Client error: Please check your input.';
    }
    else if (error.status == 401) {
      message = "Session expired due to inactivity. Please log in again.";
      this.handleLogout();
    }
    else if (error.status >= 500) {
      message = "Server error: Please try again later.";
    }
    else {
      message = "An unexpected error occured. Please try again.";
    }
    this.snackbarService.openError(message);

  }

  private handleLogout() {
    this.cookieService.delete('jwt');
    this.store.dispatch(AuthActions.logout())
  }

}
