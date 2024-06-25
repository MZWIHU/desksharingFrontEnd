import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FloorComponent} from "./floor/floor.component";
import {LandingpageComponent} from "./landingpage/landingpage.component";
import {ReservationOverviewComponent} from "./reservation-overview/reservation-overview.component";


export const routes: Routes = [
  { path: 'floor/:id', component: FloorComponent },
  { path: '', component: LandingpageComponent},
  {path: 'overview', component: ReservationOverviewComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
