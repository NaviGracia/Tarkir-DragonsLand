import { Component, inject, input } from '@angular/core';
import { CardsService } from '../../cards.service';
import { ItemComponent } from "../item/item.component";
import { CardFilterPipe } from '../../pipes/card-filter.pipe';

@Component({
  selector: 'cards-list',
  imports: [ItemComponent, CardFilterPipe],
  templateUrl: './list.component.html',
})
export class ListComponent {
  cardsService = inject(CardsService);

  searchParams = input.required<string>();


}
