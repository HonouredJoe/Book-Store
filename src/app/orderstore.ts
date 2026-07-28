import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class Orderstore {
  private readonly apiUrl = 'http://localhost:8080/api/orders';

  orders = signal<any[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  loadOrders(): void {
    this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() }).subscribe({
      next: (orders) => this.orders.set(orders),
      error: (err) => console.error('Failed to load orders:', err)
    });
  }

  createOrder(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order, { headers: this.getHeaders() });
  }

  getOrder(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getOrderLocal(id: number) {
    return this.orders().find((o) => o.id === id) ?? null;
  }
}