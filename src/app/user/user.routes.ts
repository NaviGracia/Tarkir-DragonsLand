import { Routes } from "@angular/router";
import { UserLayoutComponent } from "./layout/user-layout/user-layout.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { OrdersPageComponent } from "./pages/orders-page/orders-page.component";
import { BillingPageComponent } from "./pages/billing-page/billing-page.component";
import { AuthGuard } from "@auth/guards/auth.guard";

export const userRoutes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: 'profile',
        component: ProfilePageComponent,
      },
      {
        path: 'billing',
        component: BillingPageComponent,
      },
      {
        path: 'orders',
        component: OrdersPageComponent,
      },
      {
        path: '**',
        redirectTo: 'config',
      },
    ],
    canActivate: [
      AuthGuard
    ]
  },
];

export default userRoutes;
