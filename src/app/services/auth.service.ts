import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { SignInfo } from '../models/sign-info';
import { SignUpInfo } from '../models/sign-up-info';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://backend-url/api/auth';
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor(private http: HttpClient) {}

  // User signup
  signup(signupData: SignUpInfo): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/signup`, signupData, {
      withCredentials: true, // Required to include cookies in the request
    });
  }

  // User login
  login(loginData: SignInfo): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/login`, loginData, {
      withCredentials: true,
    });
  }

  // User logout
  logout(): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  // // Check session validity
  // checkSession(): Observable<boolean> {
  //   return this.http.get<boolean>(`${this.apiUrl}/session`, {
  //     withCredentials: true,
  //   });
  // }

  setAdminStatus(status: boolean): void {
    this.isAdminSubject.next(status);
  }

  getAdminStatus(): boolean {
    return this.isAdminSubject.value;
  }
}
