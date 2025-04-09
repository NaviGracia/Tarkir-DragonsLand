import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { ThemeService } from '@shared/services/theme.service';
import { Watermark } from '@shared/interfaces/raw-card.interfaces';


@Component({
  selector: 'clans-nav',
  imports: [RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './clans-nav.component.html',
})
export class ClansNavComponent {
  actualTheme = inject(ThemeService);

  clans = Object.values(Watermark);

}
