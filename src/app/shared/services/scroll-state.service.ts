import { ElementRef, Injectable, signal } from "@angular/core";
import { CardsService } from "@cards/cards.service";

@Injectable({ providedIn: 'root' })
export class ScrollStateService {
  /* Signals */
  trendingScrollState = signal(0);
}
