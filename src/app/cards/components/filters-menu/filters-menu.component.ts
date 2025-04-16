import { Component, inject, output, Signal, signal, WritableSignal } from '@angular/core';
import { CardsService } from '@cards/cards.service';

@Component({
  selector: 'filters-menu',
  imports: [],
  templateUrl: './filters-menu.component.html',
})
export class FiltersMenuComponent {
  /* Outputs | Inputs */
  hideGallery = output<boolean>();

  /* Injects */
  cardService = inject(CardsService);

  /* Signals */
  isVisible = signal(false);
  query = signal('');
  nameQuery = signal('');
  categoryQuery = signal('');
  selectedColors = signal<string[]>([]);
  selectedTypes = signal<string[]>([]);
  categoryMap: Record<string, WritableSignal<string[]>> = {
    color: this.selectedColors,
    type: this.selectedTypes
  };


  colorOptions = [
    { label: 'White', value: 'w'},
    { label: 'Black', value: 'b'},
    { label: 'Blue', value: 'u'},
    { label: 'Red', value: 'r'},
    { label: 'Green', value: 'g'},
    { label: 'Colorless', value: 'c'},
  ]

  typeOptions = [
    { label: 'Creature', value: 'creature'},
    { label: 'Instant', value: 'instant'},
    { label: 'Sorcery', value: 'sorcery'},
    { label: 'Enchantment', value: 'enchantment'},
    { label: 'Artifact', value: 'artifact'},
    { label: 'Planeswalker', value: 'planeswalker'},
    { label: 'Land', value: 'land'},
  ]

  /* Getters of Filters */
  onNameSearchChange(value: string){
    console.log(value)
    if(value == '') {
      this.nameQuery.set('');
    }else{
      this.nameQuery.set("name:" + value);
    }
    this.searchCardsWithFilters();
  }

  onCheckboxChange(category: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    const signal = this.categoryMap[category];
    if (!signal) {
      console.warn(`Categoría desconocida: ${category}`);
      return;
    }

    signal.update(current =>
      checkbox.checked
        ? current.includes(value) ? current : [...current, value]
        : current.filter(item => item !== value)
    );

    console.log(`${category} seleccionados:`, signal());

    this.searchCardsWithFilters();
  }

  /* Sending Filters */
  searchCardsWithFilters(){
    const colorQuery = "c:" + this.selectedColors().join('');
    const typeQuery = "type:" + this.selectedTypes().join(' ');

    this.query.set(this.nameQuery() + " " + colorQuery + " " + typeQuery)
    console.log(this.query());
    if(this.query() == ''){
      this.cardService.loadCards();
      return;
    }

    this.cardService.loadCards(this.query());
    this.query.set('');
  }
}
