import { CartData } from "./cart-data.interfaces";

export interface OrderResponse {
  total:  number;
  orders: Order[];
}

export interface Order {
  id:        number;
  userId:    number;
  address:   string;
  status:    string;
  createdAt: Date;
  items:     CartData;
}
