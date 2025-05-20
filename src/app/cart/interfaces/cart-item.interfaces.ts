export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  productId: string;
  imageUrl?: string;
}

export interface Cart {
  items: CartItem[];
}
