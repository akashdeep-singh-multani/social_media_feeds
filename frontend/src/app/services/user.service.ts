import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../environment/environment';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  updateProfile(request: FormData): Observable<AuthResponse> {
    return this.httpClient.patch<AuthResponse>(BASE_URL + `user/edit`, request);
  }
}
