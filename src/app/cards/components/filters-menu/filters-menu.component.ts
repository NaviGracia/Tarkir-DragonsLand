import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'filters-menu',
  imports: [],
  templateUrl: './filters-menu.component.html',
})
export class FiltersMenuComponent {
  searchQuery = signal('');
  isVisible = signal(false);
  hideGallery = output<boolean>();
}
