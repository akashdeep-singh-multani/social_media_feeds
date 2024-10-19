import { Injectable } from '@angular/core';
import { BASE_URL } from '../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GeneralResponse } from '../models/general-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_API_URL=BASE_URL+"auth";
  private token:string | null=null;
  public isLoggedIn$=new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private httpClient: HttpClient) { }

  signup(request:any):Observable<GeneralResponse>{
    return this.httpClient.post<GeneralResponse>( `${this.AUTH_API_URL}/signup`,request);
  }

  login(request:any):Observable<{token:any}>{
    return this.httpClient.post<{token:any}>(`${this.AUTH_API_URL}/login`,request);
  }

  logout(){
    this.token=null;
    localStorage.removeItem('token');
    this.isLoggedIn$.next(false);
  }

  private isLoggedIn(){
    return !!localStorage.getItem('token');
  }

}
