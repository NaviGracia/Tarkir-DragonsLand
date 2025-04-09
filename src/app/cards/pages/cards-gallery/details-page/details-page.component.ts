import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CardsService } from '@cards/cards.service';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Alchemy } from '@shared/interfaces/raw-card.interfaces';

@Component({
  selector: 'app-details-page',
  imports: [CurrencyPipe, TitleCasePipe],
  templateUrl: './details-page.component.html',
})
export class DetailsPageComponent {
  activatedRoute = inject(ActivatedRoute);
  cardService = inject(CardsService);
  cardId: string = this.activatedRoute.snapshot.params['id'];

  cardResource = rxResource({
    request: () => ({id: this.cardId}),
    loader: ({request}) => {
      return this.cardService.getCardById(request.id)
    }
  });

  formattedEffect = computed(() => {
    const effect = this.cardResource.value()?.effect;
    return effect ? effect.replace(/\n/g, '<br>') : '';
  });


  legalitiesEntries = signal<{ format: string; status: Alchemy }[]>([]);

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

  checkLegality(legality: Alchemy){
    if(legality.toString() == "legal") return true;

    return false;
  }
}
