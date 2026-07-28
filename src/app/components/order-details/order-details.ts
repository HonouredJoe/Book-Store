import { Component, output, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Orderstore } from '../../orderstore';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatTableModule],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css'
})
export class OrderDetails {
  order = signal<any | null>(null);
  displayedColumns = ['book', 'unitPrice', 'qty', 'subtotal'];
  backClicked = output<void>();
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private orderstore = inject(Orderstore);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.orderstore.getOrder(Number(id)).subscribe({
        next: (o) => this.order.set(o),
        error: (err) => console.error('Failed to load order:', err)
      });
    }
  }

  getSubtotal(item: any) {
    return item.book.price * item.quantity;
  }

  getTotal() {
    const o = this.order();
    if (!o) return 0;
    return o.items.reduce((sum: number, item: any) => sum + this.getSubtotal(item), 0);
  }

  back() {
    this.backClicked.emit();
    this.router.navigate(['/orders']);
  }
}