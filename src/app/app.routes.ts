import { Routes } from '@angular/router';
import { DecksComponent } from './decks/pages/decks/decks.component';
import { CardsGalleryComponent } from './gallery/pages/cards-gallery/cards-gallery.component';

export const routes: Routes = [
  {
    path: 'clans',
    loadChildren: () => import('./clans/clans.routes'),
  },
  {
    path: 'battlefield',
    component: DecksComponent,
  },
  {
    path: 'bestiary',
    component: CardsGalleryComponent,
  },
  /* {
    path: ,
    component: ,
  }, */
  {
    path: '**',
    redirectTo: 'clans',
  },
];
