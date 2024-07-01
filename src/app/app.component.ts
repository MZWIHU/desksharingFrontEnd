import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {DesksharingHeaderComponent} from "./desksharingHeader/desksharingHeader.component";
import {HttpClientModule} from "@angular/common/http";
import {MatDivider} from "@angular/material/divider";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    DesksharingHeaderComponent,
    RouterLink,
    HttpClientModule, MatDivider, MatSidenavModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  open: boolean = false;
  title = "desksharingFrontEnd";
  numberOfFloors: number = 4;
  numberOfFloorsCollection: number[] = []
  previousRoute: string = "";

  constructor(private router: Router) {

      router.events.subscribe(_ => {
      //console.log(router.url);
      this.open = router.url != "/";
      //console.log(router.url != "/")
      //console.log(this.open)
    })

    for (let i = 1; i <= this.numberOfFloors; i++) {
      this.numberOfFloorsCollection.push(i)
    }
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri])});
  }
}

