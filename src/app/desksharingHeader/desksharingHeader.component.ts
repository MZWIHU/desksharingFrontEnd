import {Component} from '@angular/core';
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatIcon, MatIconModule} from "@angular/material/icon";
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
