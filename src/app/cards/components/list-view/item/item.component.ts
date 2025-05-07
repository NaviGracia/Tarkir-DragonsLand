import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Card } from '@shared/interfaces/card.interface';
import { CartItem, ShoppingCartService } from '@cart/services/shopping-cart.service';


@Component({
  selector: 'card-item',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  card = input.required<Card>();

  router = inject(Router)
  cartService = inject(ShoppingCartService);

  purchaseAnimation = signal(false);

  async addProductToCart(card: Card) {
    if (this.cartService.isInitialized()) {
      // Obtenemos los items actuales del carrito
      const currentCart = this.cartService.cart();

      const product: CartItem = {
        productId: card.id,
        name: card.name,
        price: card.prices['eu'] ? +card.prices['eu'] : 0,
        quantity: 1,
        imageUrl: card.pngUrl ? card.pngUrl : ''
      }

      // Buscamos si el producto ya existe en el carrito
      const existingProduct = currentCart.find(item => item.productId === product.productId);

      if (existingProduct) {
        // Si el producto ya existe, creamos un nuevo objeto con la cantidad actualizada
        const updatedProduct = {
          ...product,
          quantity: 1  // Añadimos solo 1 unidad
        };

        await this.cartService.addToCart(updatedProduct);
      } else {
        // Si el producto no existe en el carrito, lo añadimos con cantidad 1
        await this.cartService.addToCart(product);
      }
    } else {
      console.log('El carrito no está inicializado todavía');
      this.router.navigateByUrl('/user/login');
    }
  }

  activatePurchaseAnimation(){
    this.purchaseAnimation.set(true);
    setTimeout(() => {
      this.purchaseAnimation.set(false);
    }, 1000)
  }
}
