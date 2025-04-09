import { Injectable, signal } from '@angular/core';
import { Card } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cart = signal<Card[]>([]);

  constructor() { }

}
