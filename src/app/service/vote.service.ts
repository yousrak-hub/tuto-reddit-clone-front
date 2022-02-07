import { Observable } from 'rxjs';
import { VotePayload } from './../model/vote-payload';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private basicUrl = 'http://localhost:8080/api/votes';
  constructor(private httpClient: HttpClient) {}
  vote(votePayload: VotePayload): Observable<any> {
    return this.httpClient.post(this.basicUrl, votePayload);
  }
}
