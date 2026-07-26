import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Bookstore {

  books = signal([
    {
      id: 1,
      title: 'Angular Basics',
      isbn: '11111',
      author: 'Ahmed Ali',
      price: 250,
      quantity: 10
    },
    {
      id: 2,
      title: 'Java Programming',
      isbn: '22222',
      author: 'Mohamed Hassan',
      price: 300,
      quantity: 5
    },
    {
      id: 3,
      title: 'Python for Beginners',
      isbn: '33333',
      author: 'Sara Mohamed',
      price: 200,
      quantity: 0
    }
  ]);
  selectedBook = signal<any>(null);
  addBook(book: any) {

    this.books.update(books => [
      ...books,
      {
        id: books.length + 1,
        ...book
      }
    ]);

  }
  updateBook(updatedBook: any) {

  this.books.update(books =>

    books.map(book =>

      book.id === updatedBook.id

        ? updatedBook

        : book

    )

  );

}
getBook(id: number) {
  return this.books().find(book => book.id === id);
}

}