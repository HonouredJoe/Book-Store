import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css'
})
export class BookDetails {

  @Input() book: any;

  @Output() backClicked = new EventEmitter<void>();

  back() {
    this.backClicked.emit();
  }

}