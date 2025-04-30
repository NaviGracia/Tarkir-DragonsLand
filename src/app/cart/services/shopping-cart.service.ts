import {
  signal,
  computed,
  inject,
  Injectable,
  effect,
} from '@angular/core';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
  DocumentReference,
  DocumentData
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { CartData } from '@cart/interfaces/cart-data.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private db = getFirestore();
  private auth = getAuth();
  private cartRef!: DocumentReference<DocumentData>;

  // Signal para almacenar el carrito
  readonly cart = signal<any[]>([]);

  constructor() {
    const user = this.auth.currentUser;
    if (user) {
      this.cartRef = doc(this.db, 'carts', user.uid);
      this.listenToCart(); // iniciar escucha en tiempo real
    }
  }

  private listenToCart() {
    if (!this.cartRef) return;

    onSnapshot(this.cartRef, (docSnap) => {
      const data = docSnap.data() as CartData;
      this.cart.set(data?.items || []);
    });
  }

  async addToCart(product: { productId: string, name: string, price: number, quantity: number }) {
    const currentItems = [...this.cart()];
    const index = currentItems.findIndex(p => p.productId === product.productId);

    if (index !== -1) {
      currentItems[index].quantity += product.quantity;
    } else {
      currentItems.push(product);
    }

    await setDoc(this.cartRef, {
      items: currentItems,
      updatedAt: serverTimestamp(),
    });
  }

  async removeFromCart(productId: string) {
    const updatedItems = this.cart().filter(p => p.productId !== productId);
    await updateDoc(this.cartRef, {
      items: updatedItems,
      updatedAt: serverTimestamp(),
    });
  }

  async clearCart() {
    await deleteDoc(this.cartRef);
    this.cart.set([]);
  }

  readonly subtotal = computed(() =>
    this.cart().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
}
