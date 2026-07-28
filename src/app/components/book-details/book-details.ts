import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Bookstore } from '../../bookstore';
@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css'
})
export class BookDetails {
  bookstore = inject(Bookstore);
  router = inject(Router);
  book = this.bookstore.selectedBook;
  backClicked = output<void>();

  back() {
    this.backClicked.emit();
    this.router.navigate(['/books']);
  }
}