import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MaterialModule } from '../../material/material.module';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { CommonModule } from '@angular/common';
import * as AuthActions from '../../store/actions/auth.action';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthSelectors from '../../store/selectors/auth.selectors';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MaterialModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm:FormGroup;
  token=null;
  error$: Observable<String | null>;

  constructor(private store:Store,private errorHandlerService:ErrorHandlerService,private router:Router,private fb:FormBuilder, private authService:AuthService){
    this.signupForm=this.fb.group({
      username:['', [Validators.required, Validators.minLength(3)]],
      password:['', [Validators.required, Validators.minLength(6)]],
      email:['', [Validators.required, Validators.email]]
    });
    this.error$=this.store.select(AuthSelectors.selectError);
  }

  ngOnInit(){
    this.error$.subscribe(error=>{
      if(error){
        this.errorHandlerService.handleError(error);
      }
    })
  }

  signup(){
    if(this.signupForm.valid){
      this.store.dispatch(AuthActions.signup({
        username: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      }))
    }
  }
}
