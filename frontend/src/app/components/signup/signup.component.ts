import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,MaterialModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm:FormGroup;
  token=null;

  constructor(private router:Router,private fb:FormBuilder, private authService:AuthService){
    this.signupForm=this.fb.group({
      username:['', Validators.required, Validators.minLength(3)],
      password:['', Validators.required, Validators.minLength(6)],
      email:['', [Validators.required, Validators.email]]
    });
  }

  signup(){
    let request={
      username:this.signupForm.value.username,
      password:this.signupForm.value.password,
      email:this.signupForm.value.email
    }
    if(this.signupForm.valid){
      this.authService.signup(request).subscribe((response)=>{
        
      },(error)=>{

      })
    }
  }
}
