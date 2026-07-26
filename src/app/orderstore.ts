import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Orderstore {

  orders = signal<any[]>([
    {
      id: 1021,
      date: 'Jul 18, 2026',
      items: [
        {
          book: {
            id: 1,
            title: 'Angular Basics',
            price: 250
          },
          quantity: 2
        },
        {
          book: {
            id: 2,
            title: 'Java Programming',
            price: 300
          },
          quantity: 1
        }
      ]
    }
  ]);

  addOrder(order: any) {

    this.orders.update(orders => [

      ...orders,

      {

        id: 1020 + orders.length + 1,

        ...order

      }

    ]);

  }

}