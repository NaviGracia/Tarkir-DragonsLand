export interface CartData {
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  updatedAt?: any;
}
