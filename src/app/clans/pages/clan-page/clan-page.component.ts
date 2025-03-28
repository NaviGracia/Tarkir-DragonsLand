import { Component, inject } from '@angular/core';
import { ClansNavComponent } from "../../components/clans-nav/clans-nav.component";
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'clan-page',
  imports: [ClansNavComponent],
  templateUrl: './clan-page.component.html',
})
export class ClanPageComponent {
  actualTheme = inject(ThemeService);
}
