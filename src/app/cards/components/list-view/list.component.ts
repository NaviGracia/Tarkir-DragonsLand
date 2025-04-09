import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { ItemComponent } from './item/item.component';
import { CardFilterPipe } from '@cards/pipes/card-filter.pipe';
import { CardsService } from '@cards/cards.service';
import { ScrollStateService } from '@shared/services/scroll-state.service';


@Component({
  selector: 'cards-list',
  imports: [ItemComponent, CardFilterPipe],
  templateUrl: './list.component.html',
})
export class ListComponent {
  cardsService = inject(CardsService);

  searchParams = input.required<string>();

  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if( !scrollDiv )return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll($event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if( !scrollDiv )return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom: boolean = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if ( isAtBottom ) {
      this.cardsService.chargeNextPage();
    }
  }
}
