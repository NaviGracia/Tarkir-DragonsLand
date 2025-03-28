import { Component, signal } from '@angular/core';
import { ListComponent } from "../../components/list-view/list.component";

@Component({
  selector: 'app-cards-gallery',
  imports: [ListComponent],
  templateUrl: './cards-gallery.component.html',
})
export class CardsGalleryComponent {
  searchQuery = signal('');
}
