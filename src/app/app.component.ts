import { Component, inject } from '@angular/core';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  actualTheme = inject(ThemeService);
}
