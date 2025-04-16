import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '@shared/interfaces/card.interface';


@Component({
  selector: 'card-item',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  /* Inputs */
  card = input.required<Card>();
}
