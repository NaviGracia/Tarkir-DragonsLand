import { Routes } from '@angular/router';
import { CardsGalleryComponent } from './cards/pages/cards-gallery/cards-gallery.component';
import { DetailsPageComponent } from './cards/pages/cards-gallery/details-page/details-page.component';
import { PaymentPageComponent } from './payment/pages/payment-page/payment-page.component';
import { AuthGuard } from '@auth/guards/auth.guard';
import { HomePageComponent } from '@shared/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: 'clans',
    component: HomePageComponent,
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
    path: 'cart',
    loadChildren: () => import('./cart/cart.routes'),
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'pay-me-mtf',
    component: PaymentPageComponent,
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.routes')
  },
  {
    path: '**',
    redirectTo: 'clans',
  },
];
