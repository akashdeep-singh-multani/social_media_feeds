import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../environment/environment';
import { PostResponse } from '../models/post-response.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient:HttpClient) { }

  getPosts(offset:number, limit:number):Observable<PostResponse>{
    return this.httpClient.get<PostResponse>(BASE_URL+`posts/posts?offset=${offset}&limit=${limit}`);
  }

  addPost(post:FormData):Observable<any>{
    return this.httpClient.post<any>(BASE_URL+`posts/create`,post);
  }
}
