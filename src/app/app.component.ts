import { Component } from '@angular/core';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { CardsGalleryComponent } from "./cards/pages/cards-gallery/cards-gallery.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [ NavbarComponent, CardsGalleryComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'SnapVault';
}
