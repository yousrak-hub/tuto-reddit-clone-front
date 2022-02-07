import { CreatePostPayload } from './../model/create-post.payload';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from '../model/post-model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private basicUrl = 'http://localhost:8080/api/posts/';
  constructor(private http: HttpClient) {}
  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(this.basicUrl);
  }
  createPost(createPostPayload: CreatePostPayload) {
    return this.http.post(this.basicUrl, createPostPayload);
  }
  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(this.basicUrl + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.basicUrl +'by-user/' + name);
  }
}
