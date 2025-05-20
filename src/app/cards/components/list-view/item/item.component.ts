import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Card } from '@shared/interfaces/card.interface';
import { ShoppingCartService } from '@cart/services/shopping-cart.service';
import { CartItem } from '@cart/interfaces/cart-item.interfaces';
import { AuthService } from '@auth/services/auth.service';


@Component({
  selector: 'card-item',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  card = input.required<Card>();

  cartService = inject(ShoppingCartService);
  authService = inject(AuthService);

  purchaseAnimation = signal(false);

  activatePurchaseAnimation(){
    this.purchaseAnimation.set(true);
    setTimeout(() => {
      this.purchaseAnimation.set(false);
    }, 1000)
  }
}
