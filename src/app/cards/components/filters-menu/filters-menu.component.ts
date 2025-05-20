import { Component, inject, output, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardsService } from '@cards/cards.service';
import { ShoppingCartService } from '@cart/services/shopping-cart.service';
import { DebounceService } from '@shared/services/debounce.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'filters-menu',
  imports: [RouterLink],
  templateUrl: './filters-menu.component.html',
})
export class FiltersMenuComponent {
  /* Outputs | Inputs */
  hideGallery = output<boolean>();

  /* Injects */
  cardService = inject(CardsService);
  cartService = inject(ShoppingCartService);

  /* Signals */
  isVisible = signal(false);

  iconOrder = signal("asc");
  orderBy = signal("name");

  query = signal('');
  nameQuery = signal('');
  selectedColors = signal<string[]>([]);
  selectedTypes = signal<string[]>([]);
  selectedManaCosts = signal<string[]>([]);
  categoryMap: Record<string, WritableSignal<string[]>> = {
    color: this.selectedColors,
    type: this.selectedTypes,
    cost: this.selectedManaCosts,
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

  costOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  private subscription: Subscription | null = null;

  constructor(private debounceService: DebounceService){}

  ngOnInit() {
    this.subscription = this.debounceService.setup((value) => {
      this.onNameSearchChange(value);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.debounceService.destroy();
  }

  handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.debounceService.next(value);
  }


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

    this.searchCardsWithFilters();
  }

  onOrderChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.orderBy.set(value);
    this.searchCardsWithFilters();
  }

  toggleType(){
    if(this.iconOrder() == "asc"){
      this.iconOrder.set("desc");
      this.searchCardsWithFilters();
      return;
    }
    this.iconOrder.set("asc");
    this.searchCardsWithFilters();
  }


  /* Sending Filters */
  searchCardsWithFilters(){
    let colorQuery = this.selectedColors().join('');
    let typeQuery = this.selectedTypes().join(' ');
    let costQuery = this.selectedManaCosts().join(' or mv=');
    let orderQuery = this.orderBy();

    if(colorQuery != "") colorQuery = " c:" + colorQuery;

    if(typeQuery != "") typeQuery = " type:" + typeQuery;

    if(costQuery != "") costQuery = " (mv=" + costQuery + ")";

    this.query.set(this.nameQuery() + colorQuery + typeQuery + costQuery);
    console.log(this.query());

    this.cardService.loadCards(this.query(), orderQuery, this.iconOrder());
    this.query.set('');
  }
}
