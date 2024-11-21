import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.action';
import { selectIsLoggedIn } from '../../store/selectors/auth.selectors';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  token = null;

  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
    private loaderService: LoaderService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.store.select(selectIsLoggedIn).subscribe((response) => {
      if (response == true) {
        this.router.navigate(['user_post']);
      }
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loaderService.showLoader();
      this.store.dispatch(
        AuthActions.login({
          username: this.loginForm.value.username,
          password: this.loginForm.value.password,
        })
      );
    }
  }
}
