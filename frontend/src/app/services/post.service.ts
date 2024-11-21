import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../environment/environment';
import { PostResponse } from '../models/post-response.model';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  getPosts(offset: number, limit: number): Observable<PostResponse> {
    return this.httpClient.get<PostResponse>(
      BASE_URL + `posts/posts?offset=${offset}&limit=${limit}`
    );
  }

  addPost(post: FormData): Observable<Post> {
    return this.httpClient.post<Post>(BASE_URL + `posts/create`, post);
  }
}
