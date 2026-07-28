import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
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
export class BookForm implements AfterViewInit, OnInit {
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
  private editingBook: any = null;

  ngOnInit() {
    this.loadBookData(this.route.snapshot.paramMap.get('id'));
  }

  ngAfterViewInit() {
    this.titleInput?.nativeElement.focus();
  }

  private loadBookData(routeId: string | null) {
    if (routeId) {
      this.resetForm();
      const currentBook = this.bookstore.books().find((book) => book.id === Number(routeId));

      if (currentBook) {
        this.editingBook = currentBook;
        this.applyFormData(currentBook);
        return;
      }

      this.bookstore.getBook(Number(routeId)).subscribe({
        next: (book) => {
          this.editingBook = book;
          this.applyFormData(book);
        },
        error: (err) => {
          console.error('Failed to load book:', err);
          this.resetForm();
        }
      });
      return;
    }

    const currentBook = this.getCurrentBook();
    this.editingBook = currentBook;

    if (currentBook) {
      this.applyFormData(currentBook);
    } else {
      this.resetForm();
    }
  }

  private applyFormData(book: any | null) {
    if (!book) {
      this.resetForm();
      return;
    }

    this.title = book.title ?? '';
    this.isbn = book.isbn ?? '';
    this.author = book.author ?? '';
    this.price = book.price ?? 0;
    this.quantity = book.quantity ?? 0;
  }

  private resetForm() {
    this.title = '';
    this.isbn = '';
    this.author = '';
    this.price = 0;
    this.quantity = 0;
  }

  private getCurrentBook() {
    return this.editingBook ?? this.book() ?? this.bookstore.selectedBook();
  }

  saveBook() {
    const currentBook = this.getCurrentBook();
    const bookData = {
      title: this.title,
      isbn: this.isbn,
      author: this.author,
      price: this.price,
      quantity: this.quantity
    };

    if (currentBook || this.book()) {
      const id = currentBook?.id ?? this.book()?.id;
      this.bookstore.updateBook(id, bookData).subscribe({
        next: () => {
          this.bookstore.selectedBook.set({ ...currentBook, ...bookData, id });
          this.router.navigate(['books']);
        },
        error: (err) => console.error('Failed to update book:', err)
      });
    } else {
      this.bookstore.addBook(bookData).subscribe({
        next: (savedBook) => {
          this.bookstore.selectedBook.set(savedBook);
          this.router.navigate(['books']);
        },
        error: (err) => console.error('Failed to create book:', err)
      });
    }
  }

  cancel() {
    this.bookstore.selectedBook.set(null);
    this.router.navigate(['/books']);
    this.cancelClicked.emit();
  }
}