import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  input,
  output,
  inject,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Bookstore } from '../../bookstore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookForm implements AfterViewInit, OnInit, OnChanges {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private bookstore = inject(Bookstore);

  cancelClicked = output<void>();
  book = input<any>();

  @ViewChild('titleInput')
  titleInput!: ElementRef<HTMLInputElement>;

  title = '';
  isbn = '';
  author = '';
  price = 0;
  quantity = 0;

  ngOnInit() {
    this.loadBookData();
  }

  ngAfterViewInit() {
    this.titleInput?.nativeElement.focus();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadBookData();
  }

  private loadBookData() {
    const currentBook = this.getCurrentBook();

    if (currentBook) {
      this.title = currentBook.title ?? '';
      this.isbn = currentBook.isbn ?? '';
      this.author = currentBook.author ?? '';
      this.price = currentBook.price ?? 0;
      this.quantity = currentBook.quantity ?? 0;
    } else {
      this.resetForm();
    }
  }

  private resetForm() {
    this.title = '';
    this.isbn = '';
    this.author = '';
    this.price = 0;
    this.quantity = 0;
  }

  private getCurrentBook() {
    const routeId = this.route.snapshot.paramMap.get('id');

    if (routeId) {
      return this.bookstore.getBook(Number(routeId));
    }

    return this.book() ?? this.bookstore.selectedBook();
  }

  saveBook() {
    const currentBook = this.getCurrentBook();
    const bookData = {
      id: currentBook?.id ?? this.book()?.id,
      title: this.title,
      isbn: this.isbn,
      author: this.author,
      price: this.price,
      quantity: this.quantity
    };

    let savedBook: any;

    if (currentBook || this.book()) {
      savedBook = { ...bookData, id: currentBook?.id ?? this.book()?.id };
      this.bookstore.updateBook(savedBook);
    } else {
      savedBook = { ...bookData, id: this.bookstore.books().length + 1 };
      this.bookstore.addBook(savedBook);
    }

    this.bookstore.selectedBook.set(savedBook);
    this.router.navigate(['books']);
  }

  cancel() {
    this.bookstore.selectedBook.set(null);
    this.router.navigate(['/books']);
    this.cancelClicked.emit();
  }
}