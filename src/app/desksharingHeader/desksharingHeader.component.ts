import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatRipple} from "@angular/material/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'desksharingHeader',
  standalone: true,
  imports: [
    MatToolbarModule, MatButtonModule, MatIconModule, MatRipple, RouterLink
  ],
  templateUrl: './desksharingHeader.component.html',
  styleUrl: './desksharingHeader.component.css'
})
export class DesksharingHeaderComponent {
  loggedIn: boolean = true;

}
