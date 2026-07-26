import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bookstore } from '../../bookstore';
import { Orderstore } from '../../orderstore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  standalone: true,
 imports: [CommonModule, FormsModule],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css'
})
export class OrderForm {

  constructor(
    public bookstore: Bookstore,
    private orderstore: Orderstore
  ){}

  @Output() cancelClicked = new EventEmitter<void>();

  cart:any[] = [];

  quantities:{[key:number]:number} = {};

  addToCart(book:any){

    const qty = this.quantities[book.id] || 1;

    if(book.quantity < qty){

      alert("Not enough stock");

      return;

    }

    const existing = this.cart.find(item=>item.book.id===book.id);

    if(existing){

      existing.quantity += qty;

    }

    else{

      this.cart.push({

        book,

        quantity:qty

      });

    }

    this.quantities[book.id]=1;

  }

  removeItem(item:any){

    this.cart=this.cart.filter(i=>i!==item);

  }

  getTotal(){

    return this.cart.reduce(

      (sum,item)=>sum+item.book.price*item.quantity,

      0

    );

  }

  placeOrder(){

    if(this.cart.length==0){

      alert("Cart is empty");

      return;

    }

    this.orderstore.addOrder({

      date:new Date().toLocaleDateString(),

      items:[...this.cart]

    });

    this.cancel();

  }

  cancel(){

    this.cancelClicked.emit();

  }

}