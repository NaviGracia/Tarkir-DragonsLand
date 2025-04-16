import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Signal para el estado de autenticación
  user = signal<User | null>(null); // Aquí guardamos el usuario

  constructor(private auth: Auth) {
    // Verificamos si hay un usuario logueado
    onAuthStateChanged(this.auth, (user) => {
      this.user.set(user); // Actualizamos el signal con el usuario logueado
    });
  }

  // Registrar un nuevo usuario
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Iniciar sesión con un usuario
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Iniciar sesión con cuenta de google
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  // Cerrar sesión
  logout() {
    return signOut(this.auth);
  }

  // Obtener el usuario actual
  getCurrentUser() {
    return this.user();
  }
}
