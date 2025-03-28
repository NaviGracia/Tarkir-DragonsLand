import { Component, input } from '@angular/core';
import { Card } from '../../interfaces/card.interface';

@Component({
  selector: 'card-item',
  imports: [],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  card = input.required<Card>();
}
