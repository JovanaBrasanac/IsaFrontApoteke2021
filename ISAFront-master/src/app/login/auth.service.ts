import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { throwError } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String;
  public password: String;
  private url: string;
  private access_token = null;

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {
    this.url = `http://localhost:8080/auth/login`;
  }

  authenticationService(username1: String, password1: String) {
    console.log(username1);
    const loginHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    const body = {
      'username': username1,
      'password': password1
    };

    return this.apiService.post(this.url, JSON.stringify(body), loginHeaders)
      .pipe(
        map((res) => {
          console.log('Logovanje uspesno');
          this.username = username1;
          this.password = password1;
          this.access_token = res.accessToken;
          console.log(res.accessToken + 'ok');

          this.registerSuccessfulLogin(username1, password1);
        }));
  }

  loginDone(user: User) {
    return this.http.post<User>('http://localhost:8080/login', user);
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }

  tokenIsPresent() {
    return true;
  }

  getToken() {
    return this.access_token;
  }
}