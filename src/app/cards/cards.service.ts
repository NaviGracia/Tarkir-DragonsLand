import { inject, Injectable, signal } from '@angular/core';
import { CardsResponse } from './interfaces/rawcard.interfaces';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CardMapper } from './mapper/card.mapper';
import { Card } from './interfaces/card.interface';
import { concatMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private http = inject(HttpClient);

  cards = signal<Card[]>([]);
  cardsLoading = signal(false);
  private maxPages = 14;

  constructor(){
    this.loadCards();
  }

  loadCards() {
    if (this.cardsLoading()) return;

    this.cardsLoading.set(true);

    const requests = [];
    for (let page = 1; page <= this.maxPages; page++) {
      requests.push(this.http.get<CardsResponse>(`${environment.endpointAllCards}/cards/`, {
        params: { page }
      }));
    }

    of(...requests) // Convierte las peticiones en un flujo RxJS
      .pipe(concatMap(req => req)) // Ejecuta en orden
      .subscribe(resp => {
        let newCards = CardMapper.mapRawCardsToCardsArray(resp.results);
        this.cards.update(currentCards => [...currentCards, ...newCards]);
        console.log(newCards);

        if (this.cards.length === this.maxPages) {
          this.cardsLoading.set(false);
        }
      });
  }

}
