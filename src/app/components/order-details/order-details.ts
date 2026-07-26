import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
 imports: [CommonModule],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css'
})
export class OrderDetails {

  @Input() order:any;

  @Output() backClicked = new EventEmitter<void>();

  getSubtotal(item:any){

    return item.book.price * item.quantity;

  }

  getTotal(){

    return this.order.items.reduce(

      (sum:number,item:any)=>

      sum + this.getSubtotal(item),

      0

    );

  }

  back(){

    this.backClicked.emit();

  }

}