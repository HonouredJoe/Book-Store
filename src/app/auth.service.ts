import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api/auth';
  private readonly tokenKey = 'bookstore.token';
  private readonly userKey = 'bookstore.user';

  readonly currentUser = signal<any | null>(this.getStoredUser());
  readonly isAuthenticated = signal<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, payload).pipe(
      tap((response: any) => this.storeSession(response))
    );
  }

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, payload);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private storeSession(response: any): void {
    const token = response?.token ?? response?.accessToken ?? null;
    if (token) {
      localStorage.setItem(this.tokenKey, token);
      this.isAuthenticated.set(true);
      const user = {
        email: response?.email ?? null,
        username: response?.username ?? null
      };
      localStorage.setItem(this.userKey, JSON.stringify(user));
      this.currentUser.set(user);
    }
  }

  private getStoredUser(): any | null {
    const saved = localStorage.getItem(this.userKey);
    return saved ? JSON.parse(saved) : null;
  }

  private hasToken(): boolean {
    return Boolean(localStorage.getItem(this.tokenKey));
  }
}
