import { Routes } from "@angular/router";
import { CartLayoutComponent } from "./layout/cart-layout/cart-layout.component";
import { PreviewPageComponent } from "./pages/preview-page/preview-page.component";



export const cartRoutes: Routes = [
  {
    path: '',
    component: CartLayoutComponent,
    children: [
      {
        path: '',
        component: PreviewPageComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

export default cartRoutes;
