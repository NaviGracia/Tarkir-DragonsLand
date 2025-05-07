import { Routes } from "@angular/router";
import { UserLayoutComponent } from "./layout/user-layout/user-layout.component";
import { SettingsPageComponent } from "./pages/settings-page/settings-page.component";

export const userRoutes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: 'config',
        component: SettingsPageComponent,
      },
      {
        path: '**',
        redirectTo: 'config',
      },
    ],
  },
];

export default userRoutes;
