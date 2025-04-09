import { Component } from '@angular/core';
import { DeckListComponent } from '@decks/components/deck-list/deck-list.component';


@Component({
  selector: 'app-decks',
  imports: [DeckListComponent],
  templateUrl: './decks.component.html',
})
export class DecksComponent { }
