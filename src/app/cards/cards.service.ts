import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '@shared/interfaces/card.interface';
import { RawCard, RawCardResponse } from '@shared/interfaces/raw-card.interfaces';
import { environment } from 'src/environments/environment.development';
import { CardMapper } from './mapper/card.mapper';
import { catchError, map, Observable, of, tap } from 'rxjs';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  /* Injects */
  private http = inject(HttpClient);

  /* Signals */
  cards = signal<Card[]>([]);
  cardsWithPages = signal<Record<number, Card[]>>([]);
  cardsLoading = signal(false);
  cardsPage = signal(1);
  totalCards = signal<Card[]>([]);

  /* Cache */
  private cardCache = new Map<string, Card>();

  constructor(){
    this.loadCards();
  }

  /* Gestión HTTP */
  loadCards(params?: string) {
    if (this.cardsLoading()) return;
    console.log(params);
    if(params == undefined) params = '';

    this.cardsLoading.set(true);

    this.http.get<RawCardResponse>(`${ environment.baseUrl }/cards/search`, {
      params:{
        q: "e:tdm " + params,
      }
    })
    .pipe(
      catchError(error => {
        console.log("No hay cartas con ese criterio de búsqueda", error);
        this.cardsLoading.set(false);
        return of({ data: [] })
      })
    )
    .subscribe( (resp) => {
      const cards = CardMapper.mapRawCardsToCardsArray(resp.data);
      this.cards.set(cards);
      console.log(cards);
      this.cardsLoading.set(false);
      this.cardsPage.set(1);
      this.totalCards.set([])
      this.createPagination();
    });
  }

  getCardById(id: string): Observable<Card>{
    if(this.cardCache.has(id)) return of(this.cardCache.get(id)!);

    return this.http.get<RawCard>(`${baseUrl}/cards/${id}`)
    .pipe(
      map((card) => CardMapper.mapRawCardToCard(card)),
      tap((card) => this.cardCache.set(id, card)),
      tap((card) => console.log(card)),
    );
  }
  /* ¿Debería estar aquí o en Scroll Service? */
  /* Crear Paginación Para Infinite Scroll */
  createPagination(){
    const paginated: Record<number, Card[]> = {};

    for (let i = 0; i < this.cards().length; i += 20) {
      const pageNumber = i / 20 + 1;
      paginated[pageNumber] = this.cards().slice(i, i + 20);
    }

    this.cardsWithPages.set(paginated);
    this.totalCards.update(currentCards => [...currentCards, ...this.cardsWithPages()[1]]);
    console.log(this.totalCards())
  }

  chargeNextPage(){
    this.cardsPage.update(page => page + 1);

    if (!this.cardsWithPages()[this.cardsPage()]) return;
    this.totalCards.update(currentCards => [...currentCards, ...this.cardsWithPages()[this.cardsPage()]]);
  }
}
