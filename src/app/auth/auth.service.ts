import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  loginUrl = 'https://api.escuelajs.co/api/v1/auth/login';
  registerUrl = 'https://reqres.in/api/register';
  constructor(private http: HttpClient) {}
  login(email: any, password: any): Observable<any> {
    return this.http.post(this.loginUrl, { email, password });
  }
  register(email: any, password: any): Observable<any> {
    return this.http.post(this.registerUrl, { email, password });
  }
  logOut() {
    localStorage.removeItem('userData');
  }
  isAuth(): boolean {
    return !!localStorage.getItem('userData');
  }
}
