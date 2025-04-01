import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Watermark } from '../../interfaces/raw-card.interfaces';
import { ThemeService } from '../../services/theme.service';
import { TitleCasePipe } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TitleCasePipe],
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
