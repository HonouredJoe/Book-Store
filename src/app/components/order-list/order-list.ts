import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Orderstore } from '../../orderstore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatTableModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css'
})
export class OrderList {
  constructor(public orderstore: Orderstore, private router: Router) {}

  displayedColumns = ['id', 'date', 'items', 'total', 'actions'];

  addClicked = output<void>();
  viewClicked = output<any>();

  addOrder() {
    this.router.navigate(['/order-form']);
  }

  viewOrder(order: any) {
    this.router.navigate(['/order-details', order.id]);
  }

  getTotal(order: any) {
    return order.items.reduce((sum: any, item: any) => sum + item.book.price * item.quantity, 0);
  }

  getItems(order: any) {
    const books = order.items.length;
    const copies = order.items.reduce((sum: any, item: any) => sum + item.quantity, 0);
    return `${books} books, ${copies} copies`;
  }
}