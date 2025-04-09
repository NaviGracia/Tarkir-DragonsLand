import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { Watermark } from '@shared/interfaces/raw-card.interfaces';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  clans = Object.values(Watermark);
  date = new Date().getFullYear();
}
