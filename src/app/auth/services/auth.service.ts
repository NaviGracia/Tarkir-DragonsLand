import { inject, Injectable } from '@angular/core';
import {
  Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup, updateProfile
} from '@angular/fire/auth';
import { signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  router = inject(Router);

  user = signal<User | null>(null);

  constructor(private auth: Auth) {
    // Verificamos si hay un usuario logueado
    onAuthStateChanged(this.auth, (user) => {
      this.user.set(user);
    });
  }

  // Registrar un nuevo usuario con displayName
  async register(displayName: string, email: string, password: string) {
    try {
      // 1. Creamos el usuario con email y password
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      // 2. Actualizamos el perfil para añadir el displayName
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: displayName
        });

        // 3. Actualizar el signal con la información actualizada
        this.user.set(userCredential.user);
      }

      return userCredential;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }

  // Iniciar sesión con un usuario
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Iniciar sesión con cuenta de google
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then((resp) => {
        this.router.navigateByUrl('/');
      });
  }

  // Cerrar sesión
  logout() {
    return signOut(this.auth);
  }

  // Obtener el usuario actual
  getCurrentUser() {
    return this.user();
  }

  // Método auxiliar para obtener el displayName del usuario actual
  getUserDisplayName() {
    return this.user()?.displayName || 'Usuario';
  }

  // Método para actualizar el displayName después del registro
  async updateUserDisplayName(displayName: string) {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      try {
        await updateProfile(currentUser, { displayName });
        this.user.set({...currentUser});
        return true;
      } catch (error) {
        console.error('Error al actualizar displayName:', error);
        throw error;
      }
    }
    return false;
  }
}
