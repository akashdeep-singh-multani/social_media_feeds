import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../environment/environment';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getComments(): Observable<Comment[]>{
    return this.httpClient.get<Comment[]>(BASE_URL);
  }

  addComment(comment: Comment): Observable<Comment>{
    return this.httpClient.post<Comment>(BASE_URL,comment);
  }

}
