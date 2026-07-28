import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bookstore } from '../../bookstore';
import { Orderstore } from '../../orderstore';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatChipsModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatListModule],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css'
})
export class OrderForm {
  constructor(
    public bookstore: Bookstore,
    private orderstore: Orderstore,
    private router: Router
  ) {}

  cancelClicked = output<void>();
  cart: any[] = [];
  quantities: { [key: number]: number } = {};

  addToCart(book: any) {
    const qty = this.quantities[book.id] || 1;

    if (book.quantity < qty) {
      alert('Not enough stock');
      return;
    }

    const existing = this.cart.find((item) => item.book.id === book.id);

    if (existing) {
      existing.quantity += qty;
    } else {
      this.cart.push({ book, quantity: qty });
    }

    this.quantities[book.id] = 1;
  }

  removeItem(item: any) {
    this.cart = this.cart.filter((i) => i !== item);
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  }

  placeOrder() {
    if (this.cart.length === 0) {
      alert('Cart is empty');
      return;
    }

    this.orderstore.addOrder({
      date: new Date().toLocaleDateString(),
      items: [...this.cart]
    });

    this.cancel();
  }

  cancel() {
    this.router.navigate(['/orders']);
    this.cancelClicked.emit();
  }
}