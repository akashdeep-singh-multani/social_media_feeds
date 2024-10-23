import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../environment/environment';
import { Observable } from 'rxjs';
import { Like } from '../models/like.model';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private apiUrl=BASE_URL;

  constructor(private httpClient:HttpClient) { }

  // Likes for Posts
  createPostLike(postId: string, userId: string): Observable<Like> {
    return this.httpClient.post<Like>(`${this.apiUrl}/posts/${postId}/likes`, { user_id: userId });
  }

  getPostLikes(postId: string): Observable<Like[]> {
    return this.httpClient.get<Like[]>(`${this.apiUrl}/posts/${postId}/likes`);
  }

  deletePostLike(postId: string, likeId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/posts/${postId}/likes/${likeId}`);
  }

  // Likes for Comments
  createCommentLike(commentId: string, userId: string): Observable<Like> {
    return this.httpClient.post<Like>(`${this.apiUrl}/comments/${commentId}/likes`, { user_id: userId });
  }

  getCommentLikes(commentId: string): Observable<Like[]> {
    return this.httpClient.get<Like[]>(`${this.apiUrl}/comments/${commentId}/likes`);
  }

  deleteCommentLike(commentId: string, likeId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/comments/${commentId}/likes/${likeId}`);
  }
}
