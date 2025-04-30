import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { ThemeService } from '@shared/services/theme.service';
import { Watermark } from '@shared/interfaces/raw-card.interfaces';
import { AuthService } from '@auth/services/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, UpperCasePipe, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  fb = inject(FormBuilder)

  isOpen = signal(false);

  clans = Object.values(Watermark);

  toggleDropdown(){
    this.isOpen.set(!this.isOpen());
  }
}
