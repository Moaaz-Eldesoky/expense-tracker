import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = new BehaviorSubject<any>(null);
  loginUrl = 'https://api.escuelajs.co/api/v1/auth/login';
  registerUrl = 'https://reqres.in/api/register';
  constructor(private http: HttpClient) {
    this.decodeUserData();
  }
  login(email: any, password: any): Observable<any> {
    return this.http.post(this.loginUrl, { email, password });
  }
  register(email: any, password: any): Observable<any> {
    return this.http.post(this.registerUrl, { email, password });
  }
  logOut() {
    localStorage.removeItem('userData');
    console.log('token removed.....');
    this.userData.next(null);
  }
  isAuth(): boolean {
    return !!localStorage.getItem('userData');
  }
  decodeUserData() {
    const encodedToken = localStorage.getItem('userData');
    if (encodedToken) {
      try {
        const decodedToken = jwtDecode(encodedToken);
        this.userData.next(decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
        this.userData.next(null);
      }
    } else {
      this.userData.next(null);
    }
  }
}
