import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Card } from './interfaces/card.interface';
import { RawCardResponse } from './interfaces/raw-card.interfaces';
import { CardMapper } from './mapper/card.mapper';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private http = inject(HttpClient);

  cards = signal<Card[]>([]);
  cardsLoading = signal(false);

  constructor(){
    this.loadCards();
  }

  loadCards() {
    if (this.cardsLoading()) return;

    this.cardsLoading.set(true);

    this.http.get<RawCardResponse>(`${ environment.endpointAllCards }`)
    .subscribe( (resp) => {
      const cards = CardMapper.mapRawCardsToCardsArray(resp.data);
      this.cards.update( currentCards => [...currentCards, ...cards]);
      this.cardsLoading.set(false);
      console.log({ cards });
    })
  }
}
