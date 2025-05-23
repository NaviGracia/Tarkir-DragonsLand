import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CardsService } from '@cards/cards.service';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Alchemy } from '@shared/interfaces/raw-card.interfaces';
import { ShoppingCartService } from '@cart/services/shopping-cart.service';

@Component({
  selector: 'app-details-page',
  imports: [CurrencyPipe, TitleCasePipe],
  templateUrl: './details-page.component.html',
})
export class DetailsPageComponent {
  /* Injects */
  activatedRoute = inject(ActivatedRoute);
  cardService = inject(CardsService);
  cartService = inject(ShoppingCartService);
  legalitiesEntries = signal<{ format: string; status: Alchemy }[]>([]);

  formattedEffect = computed(() => {
    const effect = this.cardResource.value()?.effect;
    return effect ? effect.replace(/\n/g, '<br>') : '';
  });

  cardId: string = this.activatedRoute.snapshot.params['id'];

  /* Resources */
  cardResource = rxResource({
    request: () => ({id: this.cardId}),
    loader: ({request}) => {
      return this.cardService.getCardById(request.id)
    }
  });

  /* LifeCycle */
  constructor() {
    effect(() => {
      const card = this.cardResource.value();
      if (!card) return;

      const entries = Object.entries(card.legalities).map(([format, status]) => ({
        format,
        status: status as Alchemy
      }));

      this.legalitiesEntries.set(entries);
    });
  }

  /* For showing the correct image */
  checkLegality(legality: Alchemy){
    if(legality.toString() == "legal") return true;

    return false;
  }
}
