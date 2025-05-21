import { inject, Injectable } from '@angular/core';
import {
  Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, onAuthStateChanged, User, signInWithPopup, updateProfile,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  updateEmail,
  reauthenticateWithPopup
} from '@angular/fire/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '@shared/services/snackbar.service';

const loadFromLocalStorage = () => {
  const userFromLocalStorage = localStorage.getItem('user');
  if (!userFromLocalStorage || userFromLocalStorage == 'undefined') return null;
  const parsedUser = JSON.parse(userFromLocalStorage) as User;
  return parsedUser;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  router = inject(Router);
  private auth = inject(Auth);
  private provider = new GoogleAuthProvider;
  private _snackService = inject(SnackbarService);

  user = signal<User | null>(loadFromLocalStorage());

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.user.set(user);
      localStorage.setItem('user', JSON.stringify(this.user()));
    });
  }

  async register(displayName: string, email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: displayName
        });

        this.user.set(userCredential.user);
      }

      return userCredential;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then((resp) => {
        this.router.navigateByUrl('/');
      });
  }

  logout() {
    localStorage.setItem('user', 'undefined');
    return signOut(this.auth);
  }

  getCurrentUser() {
    return this.user();
  }

  getUserDisplayName() {
    return this.user()?.displayName || 'Usuario';
  }

  async deleteCurrentUser(): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      reauthenticateWithPopup(user!, this.provider).then(() => {
        this.router.navigateByUrl('/');
        this._snackService.openSnackBar('Usuario Eliminado');
        return deleteUser(user!);
      })
    } else {
      throw new Error('No hay usuario autenticado');
    }
  }

  async updateUserDisplayName(displayName: string) {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      try {
        await updateProfile(currentUser, { displayName }).then(() => {
          this._snackService.openSnackBar('Nombre de Usuario Actualizado')
        });;
        this.user.set({...currentUser});
        return true;
      } catch (error) {
        console.error('Error al actualizar displayName:', error);
        throw error;
      }
    }
    return false;
  }

  async updateCurrentUserEmail(newEmail: string): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      await updateEmail(user, newEmail).then(() => {
        this._snackService.openSnackBar('Email Actualizado')
      });;
    } else {
      throw new Error('No hay usuario autenticado');
    }
  }

  async updateCurrentUserPassword(newPassword: string): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      await updatePassword(user, newPassword).then(() => {
        this._snackService.openSnackBar('Contraseña Actualizada')
      });
    } else {
      throw new Error('No hay usuario autenticado');
    }
  }

  async reauthenticate(currentPassword: string): Promise<void> {
    const user = this.auth.currentUser;
    if (user && user.email) {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
    } else {
      throw new Error('No hay usuario autenticado o sin email');
    }
  }
}
