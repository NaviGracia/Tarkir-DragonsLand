import { Component, inject } from '@angular/core';
import { ThemeService } from '@shared/services/theme.service';


@Component({
  selector: 'clan-page',
  imports: [],
  templateUrl: './clan-page.component.html',
})
export class ClanPageComponent {
  actualTheme = inject(ThemeService);
}
