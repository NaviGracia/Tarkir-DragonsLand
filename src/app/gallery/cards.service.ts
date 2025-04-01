import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../shared/interfaces/card.interface';
import { RawCardResponse } from '../shared/interfaces/raw-card.interfaces';
import { CardMapper } from './mapper/card.mapper';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private http = inject(HttpClient);

  cards = signal<Card[]>([]);
  cardsWithPages = signal<Record<number, Card[]>>([]);
  cardsLoading = signal(false);
  cardsPage = signal(1);
  totalCards = signal<Card[]>([]);

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

      this.createPagination();
    })
  }

  createPagination(){
    const paginated: Record<number, Card[]> = {};

    for (let i = 0; i < this.cards().length; i += 20) {
      const pageNumber = i / 20 + 1;
      paginated[pageNumber] = this.cards().slice(i, i + 20);
    }

    this.cardsWithPages.set(paginated);
    this.totalCards.update(currentCards => [...currentCards, ...this.cardsWithPages()[1]]);
  }

  chargeNextPage(){
    this.cardsPage.update(page => page + 1);

    if (!this.cardsWithPages()[this.cardsPage()]) return;
    this.totalCards.update(currentCards => [...currentCards, ...this.cardsWithPages()[this.cardsPage()]]);
  }
}
