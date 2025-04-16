import { Component, OnInit, signal } from '@angular/core';
import { FiltersMenuComponent } from '@cards/components/filters-menu/filters-menu.component';
import { ListComponent } from "../../components/list-view/list.component";

@Component({
  selector: 'app-cards-gallery',
  imports: [ListComponent, FiltersMenuComponent],
  templateUrl: './cards-gallery.component.html',
})

export class CardsGalleryComponent implements OnInit{
  /* Signals */
  searchQuery = signal('');
  hideGallery = signal(false);

  showCardsList = false;

  /* LifeCycle */
  constructor() {
    this.hideGallery.set(false);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showCardsList = true
    }, 2000);
  }
}
