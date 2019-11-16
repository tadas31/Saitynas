import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/User';
import { Token } from '../models/Token';
import { RegistrationData } from '../models/registrationData';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginUrl: string = 'http://localhost:90/saitynaspc/public/api/auth/login';
  logoutUrl: string = 'http://localhost:90/saitynaspc/public/api/auth/logout';
  registerUrl: string = 'http://localhost:90/saitynaspc/public/api/auth/register';
  userDataUrl: string = 'http://localhost:90/saitynaspc/public/api/auth/me';
  usersUrrl: string = 'http://localhost:90/saitynaspc/public/api/auth/users';
  makeAdminUrl: string = 'http://localhost:90/saitynaspc/public/api/auth/makeadmin';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<Token> {

    const payload = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post<Token>(this.loginUrl, payload, httpOptions);
  }

  logout(token: string): Observable<string>{
    const payload = new HttpParams()
      .set('token', token);

      return this.http.post<string>(this.logoutUrl, payload, httpOptions);

  }

  register(data: RegistrationData): Observable<RegistrationData>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }

    return this.http.post<RegistrationData>(this.registerUrl, data, httpOptions);
  }

  userData(token: string): Observable<User>{
    if (token){
      const playload = new HttpParams()
        .set('token', token);
      return this.http.post<User>(this.userDataUrl, playload, httpOptions);
    }
    return null;

  }

  getUsers(): Observable<User[]> {
    if (localStorage.getItem('Token')){
      const playload = new HttpParams()
        .set('token', localStorage.getItem('Token').split(" ")[1] );
      return this.http.post<User[]>(this.usersUrrl, playload, httpOptions);
    }
    return null;
  }

  makeAdmin(userId: string): Observable<User> {
    if (localStorage.getItem('Token')){
      const playload = new HttpParams()
        .set('token', localStorage.getItem('Token').split(" ")[1] );
      return this.http.put<User>(this.makeAdminUrl + "/" + userId, playload, httpOptions);
    }
    return null;
  }

}
