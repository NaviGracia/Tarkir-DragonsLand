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
  items:     Item[];
}

export interface Item {
  id:           number;
  productName:  string;
  productPrice: number;
  amount:       number;
  orderId:      number;
}
