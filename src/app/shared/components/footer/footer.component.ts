import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Watermark } from '../../interfaces/raw-card.interfaces';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  clans = Object.values(Watermark);
  date = new Date().getFullYear();
}
