import { inject, Injectable, computed, WritableSignal, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Order } from '@cart/interfaces/order.interfaces';
import { addDoc, CollectionReference, DocumentData, Query } from 'firebase/firestore';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private fs = inject(Firestore);
  private ordersCollection = collection(this.fs, 'orders');

  readonly orders = toSignal(
    collectionData(this.ordersCollection, { idField: 'id' }) as Observable<any[]>,
    { initialValue: [] }
  );

  constructor() {
    collectionData(this.ordersCollection, { idField: 'id' }).subscribe({
      next: data => console.log('Datos recibidos:', data),
      error: err => console.error('Error al obtener datos:', err)
    });
    console.log(this.orders)
  }

  addOrder(order: any) {
    return addDoc(this.ordersCollection, order);
  }
}
