import { AfterViewInit, Component, signal } from '@angular/core';
import { FiltersMenuComponent } from '@cards/components/filters-menu/filters-menu.component';
import { ListComponent } from "../../components/list-view/list.component";



@Component({
  selector: 'app-cards-gallery',
  imports: [ListComponent, FiltersMenuComponent],
  templateUrl: './cards-gallery.component.html',
})
export class CardsGalleryComponent {
  searchQuery = signal('');
  hideGallery = signal(false);

  constructor() {
    this.hideGallery.set(false);
  }
}
