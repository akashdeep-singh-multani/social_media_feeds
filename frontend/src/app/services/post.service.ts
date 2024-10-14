import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient:HttpClient) { }

  getPosts():Observable<Post[]>{
    return this.httpClient.get<Post[]>(BASE_URL+'posts/posts');
  }

  addPost(post:Post):Observable<Post>{
    return this.httpClient.post<Post>(BASE_URL+`posts/create`,post);
  }
}
