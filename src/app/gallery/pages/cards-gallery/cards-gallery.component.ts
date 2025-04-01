import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ListComponent } from "../../components/list-view/list.component";
import { ScrollStateService } from '../../../shared/services/scroll-state.service';
import { CardsService } from '../../cards.service';
import { FiltersMenuComponent } from "../../components/filters-menu/filters-menu.component";

@Component({
  selector: 'app-cards-gallery',
  imports: [ListComponent, FiltersMenuComponent],
  templateUrl: './cards-gallery.component.html',
})
export class CardsGalleryComponent {
  searchQuery = signal('');

  cardService = inject(CardsService);

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
      this.cardService.chargeNextPage();
    }
  }
}
