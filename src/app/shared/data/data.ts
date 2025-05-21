import { signal } from "@angular/core";
import { CreditCard } from "@shared/interfaces/credit-card";

const initialCards: CreditCard[] = [
  {
    id: 1,
    brand: 'Visa',
    last4: '4242',
    expiry: '12/2026'
  },
  {
    id: 2,
    brand: 'Mastercard',
    last4: '5678',
    expiry: '09/2025'
  },
];

export const creditCards = signal<CreditCard[]>(initialCards);
