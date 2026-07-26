import { Component, signal } from '@angular/core';
import { BookList } from './components/book-list/book-list';
import { BookForm } from './components/book-form/book-form';
import { BookDetails } from './components/book-details/book-details';
import { OrderList } from './components/order-list/order-list';
import { OrderForm } from './components/order-form/order-form';
import { OrderDetails } from './components/order-details/order-details';
@Component({
  selector: 'app-root',
  imports: [BookList, BookForm, BookDetails, OrderList, OrderForm, OrderDetails],
  
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  title = signal('Book Store');

  screen = signal('book-list');
  selectedBook = signal<any>(null);
  selectedOrder = signal<any>(null);

}