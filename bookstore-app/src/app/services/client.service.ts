import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:3000/api/clients';

  constructor(private http: HttpClient) { }

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createClient(client: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, client);
  }

  editClient(id: number, client: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, client);
  }

  updateClient(id: number, client: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, client);
  }


  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
