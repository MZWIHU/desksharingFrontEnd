import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {FloorComponent} from "./floor/floor.component";
import {LandingpageComponent} from "./landingpage/landingpage.component";
import {KeycloakAngularModule, KeycloakAuthGuard} from "keycloak-angular";


export const routes: Routes = [
  { path: 'floor', component: FloorComponent },
  { path: '', component: LandingpageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
