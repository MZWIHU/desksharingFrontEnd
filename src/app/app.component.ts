import {Component, NgModule, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {DesksharingHeaderComponent} from "./desksharingHeader/desksharingHeader.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    DesksharingHeaderComponent,
    RouterLink,
    HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent{

}

