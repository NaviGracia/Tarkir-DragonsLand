import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './user-navbar.component.html',
})
export class UserNavbarComponent { }
