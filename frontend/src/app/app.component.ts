import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import * as AuthActions from './store/actions/auth.action';
import { decodeJwtToken } from './utils/decode-jwt-token';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'social_media_feed';
  userInfo!: User;
  currentRouteName="";

  constructor(private router:Router,private store: Store, private cookieService: CookieService, private authService: AuthService) {
    const token = this.cookieService.get('jwt');

    if (token) {
      let userId = decodeJwtToken(token);
      this.authService.getUserInfo(userId.id).subscribe((response: User) => {
        this.userInfo = response;
      })
      this.store.dispatch(AuthActions.loginSuccess({ token, user: this.userInfo }))
    }
  }

  ngOnInit(){
    this.getCurrentRouteInfo();
  }

  getCurrentRouteInfo(){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRouteName = this.router.url;
    });
  
  }


}
