import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then((m) => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/signup/signup').then((m) => m.SignupComponent)
  },
  {
    path: 'books',
    canActivate: [authGuard],
    loadComponent: () => import('./components/book-list/book-list').then((m) => m.BookList)
  },
  {
    path: 'book-details/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./components/book-details/book-details').then((m) => m.BookDetails)
  },
  {
    path: 'book-form/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./components/book-form/book-form').then((m) => m.BookForm)
  },
  {
    path: 'book-form',
    canActivate: [authGuard],
    loadComponent: () => import('./components/book-form/book-form').then((m) => m.BookForm)
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    loadComponent: () => import('./components/order-list/order-list').then((m) => m.OrderList)
  },
  {
    path: 'order-details/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./components/order-details/order-details').then((m) => m.OrderDetails)
  },
  {
    path: 'order-form',
    canActivate: [authGuard],
    loadComponent: () => import('./components/order-form/order-form').then((m) => m.OrderForm)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'books'
  }
];
