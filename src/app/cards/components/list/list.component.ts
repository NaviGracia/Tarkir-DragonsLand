import { Component, inject } from '@angular/core';
import { CardsService } from '../../cards.service';
import { ItemComponent } from "./item/item.component";

@Component({
  selector: 'cards-list',
  imports: [ItemComponent],
  templateUrl: './list.component.html',
})
export class ListComponent {
  cardsService = inject(CardsService);
  

}
