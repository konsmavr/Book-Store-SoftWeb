import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/login';
  private loggedIn = false;

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

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
