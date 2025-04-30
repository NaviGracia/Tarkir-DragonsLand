import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { Watermark } from '@shared/interfaces/raw-card.interfaces';
import { ThemeService } from '@shared/services/theme.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  themeService = inject(ThemeService);

  clans = Object.values(Watermark);
  date = new Date().getFullYear();
}
