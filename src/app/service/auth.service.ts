import { SignupRequestPayload } from '../model/signup.request.payload';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { LoginRequestPayload } from '../model/login.request.payload';
import { LoginResponse } from '../model/login.response.payload';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  private basicUrl = 'http://localhost:8080/api/auth/';
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName(),
  };
  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}
  singup(signupRequestPayload: SignupRequestPayload): Observable<string> {
    return this.httpClient.post(
      this.basicUrl + 'signup',
      signupRequestPayload,
      { responseType: 'text' }
    );
  }
  login(loginRequestPayload: LoginRequestPayload): Observable<Boolean> {
    return this.httpClient
      .post<LoginResponse>(this.basicUrl + 'login', loginRequestPayload)
      .pipe(
        map((data) => {
          this.localStorage.store(
            'authenticationToken',
            data.authenticationToken
          );
          this.localStorage.store('username', data.username);
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('expiresAt', data.expiresAt);

          this.loggedIn.emit(true);
          this.username.emit(data.username);
          return true;
        })
      );
  }
  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }
   isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
  refreshToken() {
    return this.httpClient
      .post<LoginResponse>(
        this.basicUrl + 'refresh/token',
        this.refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          this.localStorage.clear('authenticationToken');
          this.localStorage.clear('expiresAt');

          this.localStorage.store(
            'authenticationToken',
            response.authenticationToken
          );
          this.localStorage.store('expiresAt', response.expiresAt);
        })
      );
  }
  logout() {
    this.httpClient.post(this.basicUrl+'logout', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }
}
