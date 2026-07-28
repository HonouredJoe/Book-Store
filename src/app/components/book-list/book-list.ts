import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Bookstore } from '../../bookstore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatTableModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {
  constructor(public bookstore: Bookstore,private router:Router) {}
  
  
  displayedColumns = ['title', 'isbn', 'author', 'price', 'quantity', 'status', 'actions'];

  addClicked = output<void>();
  editClicked = output<any>();
  viewClicked = output<any>();

  addBook() {
    this.bookstore.selectedBook.set(null);
    this.router.navigate(['/book-form']);
  }

  editBook(book: any) {
    this.bookstore.selectedBook.set(book);
  
    this.router.navigate(['/book-form', book.id]);
  }

  deleteBook(id: number) {
    this.bookstore.books.update((books) => books.filter((book) => book.id !== id));
  }

  viewBook(book: any) {
   this.bookstore.selectedBook.set(book);
  this.router.navigate(['/book-details', book.id]);
  }
}