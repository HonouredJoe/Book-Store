import { Component, Output, EventEmitter } from '@angular/core';
import { Bookstore } from '../../bookstore';
@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {
  constructor(public bookstore: Bookstore) {}
  @Output() addClicked = new EventEmitter<void>();
  @Output() editClicked = new EventEmitter<any>();
  @Output() viewClicked = new EventEmitter<any>();
  addBook() {
    this.addClicked.emit();
  }

 editBook(book: any) {
  this.editClicked.emit(book);
}
  deleteBook(id: number) {

  this.bookstore.books.update(books =>
    books.filter(book => book.id !== id)
  );

}

  viewBook(book: any) {

  this.viewClicked.emit(book);

}

}