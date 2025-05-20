export interface Order {
  createdAt: string;
  items: {
    imageUrl: string;
    name: string;
    price: number;
    productId: string;
    quantity: number;
  }[];
  total: number;
  userId: string;
}
