import { Routes } from "@angular/router";
import { ClanPageComponent } from "./pages/clan-page/clan-page.component";
import { AbzanClanComponent } from "./components/clans/abzan-clan/abzan-clan.component";
import { SultaiClanComponent } from "./components/clans/sultai-clan/sultai-clan.component";
import { JeskaiClanComponent } from "./components/clans/jeskai-clan/jeskai-clan.component";
import { TemurClanComponent } from "./components/clans/temur-clan/temur-clan.component";
import { MarduClanComponent } from "./components/clans/mardu-clan/mardu-clan.component";

export const clansRoutes: Routes = [
  {
    path: '',
    component: ClanPageComponent,
    children: [
      {
        path: 'abzan',
        component: AbzanClanComponent,
      },
      {
        path: 'sultai',
        component: SultaiClanComponent,
      },
      {
        path: 'jeskai',
        component: JeskaiClanComponent,
      },
      {
        path: 'temur',
        component: TemurClanComponent,
      },
      {
        path: 'mardu',
        component: MarduClanComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

export default clansRoutes;
