import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar:MatSnackBar) { }

  open(message: string, action: string = 'Close', duration: number = 3000): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  openError(message: string) {
    return this.open(message, 'Close', 3000);
  }

  openSuccess(message: string) {
    return this.open(message, 'Success', 3000);
  }}
