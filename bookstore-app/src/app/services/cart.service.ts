import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getCart(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cart/${username}`);
  }

  addToCart(username: string, book: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/cart/${username}`, book);
  }

  removeFromCart(username: string, bookId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/cart/${username}/${bookId}`);
  }

  placeOrder(username: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/cart/${username}/order`, {});
  }
}
