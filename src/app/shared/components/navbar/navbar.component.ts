import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Watermark } from '../../../gallery/interfaces/raw-card.interfaces';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  clans = Object.values(Watermark);

  mergeClanRoute(clan: string): string {
    return "/clans/" + clan;
  }
}
