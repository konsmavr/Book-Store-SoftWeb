import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/login';
  private loggedIn = false;
  currentUser: any;
  private username: string | null = null;

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(this.baseUrl, credentials).pipe(
      tap(response => {
        if (response.message === 'Login successful') {
          this.loggedIn = true;
        }
      })
    );
  }
  logout(): void {
    this.loggedIn = false;
    this.username = null;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  getUsername(): string | null {
    return this.currentUser ? this.currentUser.username : null;
  }
  setCurrentUser(user: any) {
    this.currentUser = user;
  }
}
