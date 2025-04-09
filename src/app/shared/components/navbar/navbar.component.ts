import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ThemeService } from '@shared/services/theme.service';
import { Watermark } from '@shared/interfaces/raw-card.interfaces';




@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, UpperCasePipe],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  themeService = inject(ThemeService);
  clans = Object.values(Watermark);

  isOpen = signal(false);

  toggleDropdown(){
    this.isOpen.set(!this.isOpen());
  }
}
