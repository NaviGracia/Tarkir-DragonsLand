import { Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { CardsGalleryComponent } from './cards/pages/cards-gallery/cards-gallery.component';
import { DecksComponent } from './decks/pages/decks/decks.component';
import { CharacterComponent } from './characters/pages/character/character.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'cards-gallery',
    component: CardsGalleryComponent,
  },
  {
    path: 'decks-gallery',
    component: DecksComponent,
  },
  {
    path: 'character/:name',
    component: CharacterComponent,
  },
  /* {
    path: ,
    component: ,
  }, */
  {
    path: '**',
    redirectTo: 'home',
  },
];
