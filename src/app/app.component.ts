import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {DesksharingHeaderComponent} from "./desksharingHeader/desksharingHeader.component";
import {HttpClientModule} from "@angular/common/http";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    DesksharingHeaderComponent,
    RouterLink,
    HttpClientModule, MatDivider],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent{
 title = "desksharingFrontEnd";
}

