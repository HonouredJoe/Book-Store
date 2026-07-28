import { Routes } from '@angular/router';
import { BookList } from './components/book-list/book-list';
import { BookDetails } from './components/book-details/book-details';
import { OrderList } from './components/order-list/order-list';
import { OrderForm } from './components/order-form/order-form';
import { OrderDetails } from './components/order-details/order-details';

export const routes: Routes = [ 

    {
        path:'books',
        loadComponent: () => import('./components/book-list/book-list').then(m => m.BookList)
    },

    
    {   path: '',
        pathMatch: 'full',
        redirectTo: 'books'
    },
    {
        path: 'book-details/:id',
        loadComponent: () => import('./components/book-details/book-details').then(m => m.BookDetails)
    },
    {
        path: 'book-form/:id',
        loadComponent: () => import('./components/book-form/book-form').then(m => m.BookForm)
    },

    {
        path: 'book-form',
        loadComponent: () => import('./components/book-form/book-form').then(m => m.BookForm)
    },
    {
        path: 'orders',
        loadComponent: () => import('./components/order-list/order-list').then(m => m.OrderList)
    },
    {
        path: 'order-details/:id',
        loadComponent: () => import('./components/order-details/order-details').then(m => m.OrderDetails)
    },
    {
        path: 'order-form',
        loadComponent: () => import('./components/order-form/order-form').then(m => m.OrderForm)
    },
    

];
