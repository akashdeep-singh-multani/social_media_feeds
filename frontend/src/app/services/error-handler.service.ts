import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import * as AuthActions from '../store/actions/auth.action'

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private snackBar: MatSnackBar, private cookieService:CookieService, private store:Store) { }

  handleError(error:any){
    let message="";
    if(error.status===0){
      message="Network error: Please check your internet connection.";
    }
    else if(error.status>=400 && error.status!==401 && error.status<500){
      message=error.error?.message || 'Client error: Please check your input.';
    }
    else if(error.status==401){
      // console.log("error.message while inactive: "+error.message);
      // console.log("error while inactive: "+JSON.stringify(error));
      message="Session expired due to inactivity. Please log in again.";
      this.handleLogout();
    }
    else if(error.status>=500){
      message="Server error: Please try again later.";
    }
    else{
      message="An unexpected error occured. Please try again.";
    }
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition:'center'
    })

  }

  private handleLogout(){
    console.log("this.cookieService.get('token') before: "+this.cookieService.get('token'))
    this.cookieService.delete('jwt');
    console.log("this.cookieService.get('token') after: "+this.cookieService.get('token'))
    this.store.dispatch(AuthActions.logout())
  }

}
