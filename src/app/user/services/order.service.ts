import { effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

const loadFromLocalStorage = () => {
  const ordersFromLocalStorage = localStorage.getItem('orders');
  if (!ordersFromLocalStorage || ordersFromLocalStorage == 'undefined') return null;
  const parsedOrders = JSON.parse(ordersFromLocalStorage) as any[];
  console.log(parsedOrders);
  return parsedOrders;
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private fs = inject(Firestore);

  private ordersCollection = collection(this.fs, 'orders');

  orderStorage = signal(loadFromLocalStorage());

  readonly orders = toSignal(
    collectionData(this.ordersCollection, { idField: 'id' }) as Observable<any[]>,
    { initialValue: [] }
  );

  constructor() {
    collectionData(this.ordersCollection, { idField: 'id' });
    effect(() => {
      localStorage.setItem('orders', JSON.stringify(this.orders()));
      this.orderStorage.set(loadFromLocalStorage());
    });
  }

  addOrder(order: any) {
    return addDoc(this.ordersCollection, order);
  }
}
