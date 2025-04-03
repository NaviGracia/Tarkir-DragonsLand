import { Component, inject } from '@angular/core';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './shared/services/theme.service';
import { FooterComponent } from "./shared/components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  actualTheme = inject(ThemeService);
}
