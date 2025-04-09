import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClansNavComponent } from "../../components/clans-nav/clans-nav.component";

@Component({
  selector: 'app-clans-layout',
  imports: [RouterOutlet, ClansNavComponent],
  templateUrl: './clans-layout.component.html',
})
export class ClansLayoutComponent { }
