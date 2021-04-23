import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService: WebRequestService, private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http.post(`${this.webService.ROOT_URL}/users/login`, {
      email,
      password
    }, {
      observe: 'response'
    }).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        this.setUserDetails(res.body.firstname, res.body.lastname, res.body.email);
        console.log("Successfully logged in");
      })
    )
  }

  signup(firstname: string, lastname: string, email: string, password: string) {
    return this.http.post(`${this.webService.ROOT_URL}/users`, {
      firstname,
      lastname,
      email,
      password
    }, {
      'observe': 'response'
    }).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        this.setUserDetails(res.body.firstname, res.body.lastname, res.body.email);
        console.log("Signed up (and logged in) successfully");
      })
    )
  }

  getUserDetails(): User {
    let _id = localStorage.getItem('userId');
    let firstname = localStorage.getItem('firstname');
    let lastname = localStorage.getItem('lastname');
    let email = localStorage.getItem('email');
    return { _id, firstname, lastname, email }
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  getNewAccessToken() {
    let refreshToken = this.getRefreshToken();
    let userId = this.getUserId();

    if (refreshToken && userId) {
      return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
        headers: {
          'x-refresh-token': this.getRefreshToken(),
          '_id': this.getUserId()
        },
        observe: 'response'
      }).pipe(
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(res.headers.get('x-access-token'))
        })
      )
    } else {
      return throwError(new Error('Refresh Token and/or User Id is null or undefined'));
    }
  }

  logout() {
    this.removeSession();
    this.removeUserDetails();
    this.router.navigateByUrl('/auth/login');
  }

  setUserDetails(firstname: string, lastname:string, email: string) {
    localStorage.setItem('fistname', firstname);
    localStorage.setItem('lastname', lastname);
    localStorage.setItem('email', email);
  }

  private removeUserDetails() {
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('email');
  }
  
  
  
  private setAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }


  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('userId', userId);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
  
  isLoggedIn() {
    // we want to check whether or not the user id and auth tokens are present in local storage
    let userId = this.getUserId();
    let accessToken = this.getAccessToken();
    let refreshToken = this.getRefreshToken();
    return userId && accessToken && refreshToken;
  }
  
}