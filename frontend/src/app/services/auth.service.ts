import { Injectable } from '@angular/core';
import { BASE_URL } from '../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GeneralResponse } from '../models/general-response';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_API_URL=BASE_URL+"auth";
  // private token:string | null=null;
  // public isLoggedIn$=new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private httpClient: HttpClient, private cookieService:CookieService) { }

  signup(request:any):Observable<any>{
    return this.httpClient.post<any>( `${this.AUTH_API_URL}/signup`,request);
  }

  login(request:any):Observable<any>{
    return this.httpClient.post<any>(`${this.AUTH_API_URL}/login`,request);
  }

  getUserInfo(user_id:number):Observable<User>{
    return this.httpClient.post<User>(`${this.AUTH_API_URL}/user-info`,{user_id});
  }

  // logout(){
  //   this.token=null;
  //   this.isLoggedIn$.next(false);
  // }

  // private isLoggedIn(){
  //   return !!localStorage.getItem('token');
  // }

  setToken(token:string){
    this.cookieService.set('jwt', token, {secure:true, sameSite:'Strict'});
  }

  getToken(){
    return this.cookieService.get('jwt');
  }

  removeToken(){
    this.cookieService.delete('jwt');
  }

}
