import { Component, computed, inject, signal } from '@angular/core';

import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShoppingCartService } from '@cart/services/shopping-cart.service';


@Component({
  selector: 'app-preview-page',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './preview-page.component.html',
})
export class PreviewPageComponent {
  cartService = inject(ShoppingCartService);

  discount = signal(0);
  sendingTax = signal(0);

  total = computed(() => {
    return this.cartService.total() + this.sendingTax() - this.discount();
  })

  constructor(){}
}
