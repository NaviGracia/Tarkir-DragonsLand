import { Routes } from '@angular/router';
import { DecksLayoutComponent } from './layout/decks-layout/decks-layout.component';
import { AddDeckPageComponent } from './pages/add-deck-page/add-deck-page.component';
import { ModifyDeckPageComponent } from './pages/modify-deck-page/modify-deck-page.component';
import { DecksComponent } from './pages/decks/decks.component';

export const decksRoutes: Routes = [
  {
    path: '',
    component: DecksLayoutComponent,
    children: [
      {
        path: '',
        component: DecksComponent,
      },
      {
        path: 'new-deck',
        component: AddDeckPageComponent,
      },
      {
        path: ':idDeck',
        component: ModifyDeckPageComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  }
]

export default decksRoutes;
