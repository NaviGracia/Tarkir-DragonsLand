import { Routes } from '@angular/router';
import { CardsGalleryComponent } from './cards/pages/cards-gallery/cards-gallery.component';
import { DetailsPageComponent } from './cards/pages/cards-gallery/details-page/details-page.component';
import { PaymentPageComponent } from './payment/pages/payment-page/payment-page.component';
import { AuthGuard } from '@auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'clans',
    loadChildren: () => import('./clans/clans.routes'),
  },
  {
    path: 'decks',
    loadChildren: () => import('./decks/decks.routes'),
  },
  {
    path: 'cards',
    component: CardsGalleryComponent,
  },
  {
    path: "cards/:id",
    component: DetailsPageComponent,
  },
  {
    path: 'user',
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'pay-me-mtf',
    component: PaymentPageComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: '**',
    redirectTo: 'clans',
  },
];
