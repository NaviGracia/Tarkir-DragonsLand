export interface CreditCard {
  id: number;
  brand: 'Visa' | 'Mastercard';
  last4: string;
  expiry: string;
}
