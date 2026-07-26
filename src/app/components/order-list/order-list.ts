import { Component, EventEmitter, Output } from '@angular/core';
import { Orderstore } from '../../orderstore';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css'
})
export class OrderList {

  constructor(public orderstore: Orderstore){}

  @Output() addClicked = new EventEmitter<void>();

  @Output() viewClicked = new EventEmitter<any>();

  addOrder(){

    this.addClicked.emit();

  }

  viewOrder(order:any){

    this.viewClicked.emit(order);

  }

  getTotal(order:any){

    return order.items.reduce(

      (sum:any,item:any)=>

      sum + item.book.price * item.quantity,

      0

    );
  }

  getItems(order:any){

    const books = order.items.length;

    const copies = order.items.reduce(

      (sum:any,item:any)=>

      sum + item.quantity,

      0

    );

    return `${books} books, ${copies} copies`;

  }

}