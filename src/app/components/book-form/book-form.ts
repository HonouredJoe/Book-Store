import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Bookstore } from '../../bookstore';
@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookForm implements AfterViewInit, OnChanges {
  constructor(private bookstore: Bookstore) {}
  @Output() cancelClicked = new EventEmitter<void>();
  @Input() book: any = null;
  @ViewChild('titleInput')
  titleInput!: ElementRef<HTMLInputElement>;
  title = '';
  isbn = '';
  author = '';
  price = 0;
  quantity = 0;

  ngAfterViewInit() {

    this.titleInput.nativeElement.focus();
    
  }

  ngOnChanges(changes: SimpleChanges) {
  if (this.book) {

  this.title = this.book.title;
  this.isbn = this.book.isbn;
  this.author = this.book.author;
  this.price = this.book.price;
  this.quantity = this.book.quantity;

}
else{

  this.title = '';
  this.isbn = '';
  this.author = '';
  this.price = 0;
  this.quantity = 0;

}
  }

 saveBook() {

  const bookData = {

    id: this.book?.id,

    title: this.title,
    isbn: this.isbn,
    author: this.author,
    price: this.price,
    quantity: this.quantity

  };

  if (this.book) {

    this.bookstore.updateBook(bookData);

  }

  else {

    this.bookstore.addBook(bookData);

  }

  this.cancel();

}

  cancel() {
    this.cancelClicked.emit();
  }

}