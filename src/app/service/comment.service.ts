import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CommentPayload } from '../model/comment.payload';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private basicUrl = 'http://localhost:8080/api/comments/';
  constructor(private httpClient: HttpClient) {}
  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(
      this.basicUrl + 'by-post/' + postId
    );
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post<any>(this.basicUrl, commentPayload);
  }

  getAllCommentsByUser(name: string) {
    return this.httpClient.get<CommentPayload[]>(
      this.basicUrl + 'by-user/' + name
    );
  }
}
