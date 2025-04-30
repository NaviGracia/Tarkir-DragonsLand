import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '@shared/interfaces/card.interface';
import { ShoppingCartService } from '@cart/services/shopping-cart.service';


@Component({
  selector: 'card-item',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  card = input.required<Card>();

  cartService = inject(ShoppingCartService);

  purchaseAnimation = signal(false);

  addToCart(product: Card) {
    this.cartService.addToCart({
      productId: product.id,
      name: product.name,
      price: product.prices['eur'] ? +product.prices['eur'] : 0,
      quantity: 1
    });
  }

  activatePurchaseAnimation(){
    this.purchaseAnimation.set(true);
    setTimeout(() => {
      this.purchaseAnimation.set(false);
    }, 1000)
  }
}
