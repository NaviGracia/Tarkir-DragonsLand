import { Order } from './../interfaces/order.interfaces';
import { Injectable, inject, signal, computed } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, updateDoc, deleteDoc, collection, addDoc } from '@angular/fire/firestore';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Cart, CartItem } from '@cart/interfaces/cart-item.interfaces';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from '@shared/interfaces/card.interface';
import { CartItemMapper } from '@cart/mapper/cart-item.mapper';
import { Router } from '@angular/router';
import { OrderService } from '@user/services/order.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private router = inject(Router)
  private afs: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);
  private orderService: OrderService = inject(OrderService);

  private userId = signal<string | null>(null);

  private cartSignal = signal<Cart>({ items: [] });

  cart = computed<CartItem[]>(() => {
    const cartData = this.cartSignal();
    return cartData?.items ?? [];
  });

  total = computed(() => {
    const items = this.cart();
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  });

  itemCount = computed(() => {
    const items = this.cart();
    return items.reduce((total, item) => total + item.quantity, 0);
  });

  constructor() {
    onAuthStateChanged(this.auth, user => {
      this.userId.set(user?.uid ?? null);
      if (user?.uid) {
        this.loadCart(user.uid);
      }
    });
  }

  private loadCart(uid: string): void {
    const cartDocRef = doc(this.afs, `carts/${uid}`);
    from(getDoc(cartDocRef)).pipe(
      map(snapshot => snapshot.exists() ? snapshot.data() as Cart : { items: [] })
    ).subscribe(cartData => {
      this.cartSignal.set(cartData);
    });
  }

  async addToCart(product: Card) {
    const uid = this.userId();
    if (!uid) {
      this.router.navigateByUrl('/auth/login');
      return;
    };

    const cartRef = doc(this.afs, `carts/${uid}`);
    const snap = await getDoc(cartRef);
    const cartData = snap.exists() ? snap.data() as Cart : { items: [] };
    const items = cartData.items;

    const pr = this.cartSignal().items.find(p => p.productId == product.id);

    if(pr) {
      items.map((pr) => {
        if(pr.productId == product.id){
          pr.quantity = pr.quantity + 1
        }
      });
    } else {
      items.push(CartItemMapper.mapCardToCartItem(product));
      console.log(CartItemMapper.mapCardToCartItem(product));
    }

    await setDoc(cartRef, { items, updatedAt: new Date() }, { merge: true });
    this.cartSignal.set({ items });
  }

  async modifyCart(index: number, cartItem: CartItem, plus: boolean){
    const uid = this.userId();
    const cartRef = doc(this.afs, `carts/${uid}`);
    const snap = await getDoc(cartRef);
    const cartData = snap.exists() ? snap.data() as Cart : { items: [] };
    const items = cartData.items;

    items.map((pr) => {
      if(pr.productId == cartItem.productId){
        if(plus){
          pr.quantity = pr.quantity + 1
        }else{
          if(pr.quantity > 1) {
            pr.quantity = pr.quantity - 1
          } else{
            this.removeFromCart(index);
          }
        }
      }
    });

    await setDoc(cartRef, { items, updatedAt: new Date() }, { merge: true });
    this.cartSignal.set({ items });
  }

  async removeFromCart(index: number) {
    const uid = this.userId();
    if (!uid) throw new Error('Usuario no autenticado');

    const cartRef = doc(this.afs, `carts/${uid}`);
    const snap = await getDoc(cartRef);
    const cartData = snap.exists() ? snap.data() as Cart : { items: [] };
    const items = cartData.items;

    items.splice(index, 1);

    await updateDoc(cartRef, { items });
    this.cartSignal.set({ items });
  }

  async clearCart() {
    const uid = this.userId();
    if (!uid) throw new Error('Usuario no autenticado');

    const cartRef = doc(this.afs, `carts/${uid}`);
    await deleteDoc(cartRef);
    this.cartSignal.set({ items: [] });
  }

  async checkout() {
    const uid = this.userId();
    if (!uid) throw new Error('Usuario no autenticado');

    const cartRef = doc(this.afs, `carts/${uid}`);
    const snap = await getDoc(cartRef);
    if (!snap.exists()) throw new Error('Carrito no encontrado');

    const cartData: any = snap.data();
    const orderData: Order = {
      createdAt: new Date().toISOString(),
      items: cartData.items,
      total: this.total(),
      userId: uid
    };

    try {
      await this.orderService.addOrder(orderData);
      await deleteDoc(cartRef);
      this.cartSignal.set({ items: [] });
      this.router.navigateByUrl('/');
    } catch (error) {
      console.error('Error al procesar la orden:', error);
    }
  }

}
