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
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { CartData } from '@cart/interfaces/cart-data.interfaces';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  [key: string]: any; // Para permitir propiedades adicionales
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private firestore = getFirestore();
  private auth = getAuth();
  private cartRef: DocumentReference<DocumentData> | null = null;
  private currentUser: User | null = null;

  // Signal para almacenar el carrito
  readonly cart = signal<CartItem[]>([]);
  readonly isInitialized = signal<boolean>(false);

  constructor() {
    // Escuchar cambios en el estado de autenticación
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;

      if (user) {
        this.initCart(user.uid);
      } else {
        this.cartRef = null;
        this.cart.set([]);
        this.isInitialized.set(false);
      }
    });

    // También inicializar el carrito si el usuario ya está autenticado
    const user = this.auth.currentUser;
    if (user) {
      this.initCart(user.uid);
    }
  }

  private initCart(userId: string) {
    // Inicializar la referencia al carrito
    this.cartRef = doc(this.firestore, 'carts', userId);
    this.listenToCart();
    this.isInitialized.set(true);
  }

  private listenToCart() {
    if (!this.cartRef) return;

    onSnapshot(this.cartRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as CartData;
        this.cart.set(data?.items || []);
      } else {
        // Si el documento no existe, inicializarlo
        this.createEmptyCart();
      }
    });
  }

  private async createEmptyCart() {
    if (!this.cartRef) return;

    try {
      await setDoc(this.cartRef, {
        items: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error creating empty cart:", error);
    }
  }

  // Método para obtener la cantidad actual de un producto en el carrito
  getProductQuantity(productId: string): number {
    const item = this.cart().find(item => item.productId === productId);
    return item ? item.quantity : 0;
  }

  async addToCart(product: CartItem) {
    try {
      // Verificar que cartRef esté inicializado
      if (!this.cartRef) {
        if (!this.currentUser) {
          console.error("Cannot add to cart: User not logged in");
          return;
        }

        // Intentar inicializar el carrito
        this.initCart(this.currentUser.uid);

        // Verificar nuevamente
        if (!this.cartRef) {
          console.error("Cannot add to cart: Failed to initialize cart reference");
          return;
        }
      }

      // Verificar primero los datos actuales en Firestore
      const cartDoc = await getDoc(this.cartRef);
      let currentItems: CartItem[] = [];

      if (cartDoc.exists()) {
        const data = cartDoc.data() as CartData;
        currentItems = data?.items || [];
      }

      // Buscar el producto en los items actuales
      const index = currentItems.findIndex(p => p.productId === product.productId);

      if (index !== -1) {
        // Si existe, actualizar su cantidad
        currentItems[index].quantity += product.quantity;
        // También actualizar otros campos en caso de que hayan cambiado
        currentItems[index].name = product.name;
        currentItems[index].price = product.price;
        // Mantener propiedades adicionales
        Object.keys(product).forEach(key => {
          if (!['productId', 'name', 'price', 'quantity'].includes(key)) {
            currentItems[index][key] = product[key];
          }
        });
      } else {
        // Si no existe, añadirlo al array
        currentItems.push({...product});
      }

      // Actualizar el documento en Firestore
      await setDoc(this.cartRef, {
        items: currentItems,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      // El listener onSnapshot actualizará automáticamente la signal cart

    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  async updateQuantity(productId: string, newQuantity: number) {
    try {
      if (!this.cartRef) {
        console.error("Cannot update quantity: Cart reference not initialized");
        return;
      }

      // Verificar datos actuales en Firestore
      const cartDoc = await getDoc(this.cartRef);
      if (!cartDoc.exists()) {
        console.error("Cart document does not exist");
        return;
      }

      const data = cartDoc.data() as CartData;
      const currentItems: CartItem[] = data?.items || [];

      const index = currentItems.findIndex(p => p.productId === productId);

      if (index !== -1) {
        // Actualizar la cantidad
        currentItems[index].quantity = newQuantity;

        // Si la cantidad es 0 o menor, eliminar el producto
        if (newQuantity <= 0) {
          currentItems.splice(index, 1);
        }

        // Actualizar en Firestore
        await setDoc(this.cartRef, {
          items: currentItems,
          updatedAt: serverTimestamp(),
        }, { merge: true });
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }

  async removeFromCart(productId: string) {
    try {
      if (!this.cartRef) {
        console.error("Cannot remove from cart: Cart reference not initialized");
        return;
      }

      // Verificar datos actuales en Firestore
      const cartDoc = await getDoc(this.cartRef);
      if (!cartDoc.exists()) return;

      const data = cartDoc.data() as CartData;
      const currentItems: CartItem[] = data?.items || [];

      const updatedItems = currentItems.filter(p => p.productId !== productId);

      await setDoc(this.cartRef, {
        items: updatedItems,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }

  async clearCart() {
    try {
      if (!this.cartRef) {
        console.error("Cannot clear cart: Cart reference not initialized");
        return;
      }

      await setDoc(this.cartRef, {
        items: [],
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }

  readonly subtotal = computed(() =>
    this.cart().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  readonly itemCount = computed(() =>
    this.cart().reduce((count, item) => count + item.quantity, 0)
  );
}
