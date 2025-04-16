import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { ThemeService } from '@shared/services/theme.service';


@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  actualTheme = inject(ThemeService);
  authService = inject(AuthService);

  user = computed(() => {
    return this.authService.user();
  })

  logout() {
    this.authService.logout().then(() => {
      this.authService.user.set(null); // Limpiamos el estado de user en el signal
    });
  }
}
