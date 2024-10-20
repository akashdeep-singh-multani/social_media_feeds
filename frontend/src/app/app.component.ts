import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import * as AuthActions from './store/actions/auth.action';
import { decodeJwtToken } from './utils/decode-jwt-token';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'social_media_feed';
  userInfo!:User;

  constructor(private router:Router,private store:Store, private cookieService:CookieService, private authService:AuthService){
    const token=this.cookieService.get('jwt');
    
    if(token){
      console.log("app-component called")
      let userId=decodeJwtToken(token);
      // console.log("decoded token: "+JSON.stringify(userInfo))
      
      this.authService.getUserInfo(userId.id).subscribe((response:User)=>{
        this.userInfo=response;
      })
      this.store.dispatch(AuthActions.loginSuccess({token, user:this.userInfo}))
      console.log("dispatched app")
    }
    else{
      console.log('token not present')
      this.router.navigate(['/login'])
    }
  }

  
}
