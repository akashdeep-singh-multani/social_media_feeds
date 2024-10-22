import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  updateProfile(request:FormData):Observable<any>{
    return this.httpClient.patch<any>(BASE_URL+`user/edit`,request);
  }
}
