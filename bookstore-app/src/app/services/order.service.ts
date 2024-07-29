import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:3000/api/order';

  constructor(private http: HttpClient) { }

  getOrder(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  updateOrder(order: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, order);
  }
}
