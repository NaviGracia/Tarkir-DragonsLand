import { CartItem } from "@cart/interfaces/cart-item.interfaces";
import { Card } from "@shared/interfaces/card.interface";

export class CartItemMapper {
  static mapCardToCartItem( item: Card, quantity?: number ): CartItem{
    return{
      name: item.name,
      price: item.prices['eur'] ? +item.prices['eur'] : 0.05,
      quantity: quantity || 1,
      productId: item.id,
      imageUrl: item.pngUrl
    };
  }
}
