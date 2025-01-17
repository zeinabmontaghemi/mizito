import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://your-backend-url/api/users';

  constructor(private http: HttpClient) {}

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(`${this.apiUrl}/all`).pipe(
      map((response) => response.users) // Extracting users array from response
    );
  }

  // Get a single user by ID
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }
  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}`);
  }

  // Create or update a user
  updateUser(
    userId: number,
    userData: {
      username: string;
      email: string;
      userRole: string;
      password: string;
      active: boolean;
    }
  ): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, userData);
  }

  // Delete a user by ID
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}
