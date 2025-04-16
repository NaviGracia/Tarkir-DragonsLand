import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    // Verificamos si el usuario está autenticado usando el signal
    const user = this.authService.getCurrentUser();
    console.log(user);
    if (user) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      this.router.navigateByUrl('/')
      return false;
    }
  }
}
