import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../environment/environment';
import { Comment } from '../models/comment.model';
import { CommentRequest } from '../models/comment-request.model';
import { CommentResponse } from '../models/comment-response.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getComments(postId:number): Observable<CommentResponse>{
    return this.httpClient.get<CommentResponse>(BASE_URL+`comments/load/${postId}`);
  }

  addComment(comment: CommentRequest): Observable<Comment>{
    return this.httpClient.post<Comment>(BASE_URL+`comments/create`,comment);
  }

}
