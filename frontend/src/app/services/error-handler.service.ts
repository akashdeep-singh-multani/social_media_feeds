import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private snackBar: MatSnackBar) { }

  handleError(error:any){
    let message="";
    if(error.status===0){
      message="Network error: Please check your internet connection.";
    }
    else if(error.status>=400 && error.status<500){
      message=error.error?.message || 'Client error: Please check your input.';
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

}
