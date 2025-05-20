import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserNavbarComponent } from "../../components/user-navbar/user-navbar.component";

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, UserNavbarComponent],
  templateUrl: './user-layout.component.html',
})
export class UserLayoutComponent { }
