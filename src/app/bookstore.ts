import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class Bookstore {
  private readonly apiUrl = 'http://localhost:8080/books';
  private booksSubscription?: Subscription;

  books = signal<any[]>([]);
  selectedBook = signal<any>(null);

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  getAllBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  loadBooks(): void {
    this.booksSubscription?.unsubscribe();

    this.booksSubscription = this.getAllBooks().subscribe({
      next: (data) => this.books.set(data),
      error: (err) => {
        console.error('Failed to load books from backend:', err);
        this.books.set([]);
      }
    });
  }

  addBook(book: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, book, { headers: this.getHeaders() });
  }

  updateBook(id: number, book: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, book, { headers: this.getHeaders() });
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getBook(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  ngOnDestroy(): void {
    this.booksSubscription?.unsubscribe();
  }
}