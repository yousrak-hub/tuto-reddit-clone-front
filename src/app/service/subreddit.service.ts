import { SubredditModel } from './../model/subreddit-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubredditService {
  private basicUrl = 'http://localhost:8080/api/subreddit';
  constructor(private http: HttpClient) {}
  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.http.get<Array<SubredditModel>>(this.basicUrl);
  }
  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    return this.http.post<SubredditModel>(this.basicUrl, subredditModel);
  }
}
