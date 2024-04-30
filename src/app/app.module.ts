// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import {environment} from "../enviroment/enviroment";
import {AppComponent} from "./app.component";
import {NgxImageZoomModule} from "ngx-image-zoom";

export function initializeKeycloak(keycloak: KeycloakService) {
  return () => keycloak.init({
    config: {
      url: environment.keycloak.url, // Your Keycloak URL
      realm: environment.keycloak.realm, // Your Keycloak Realm
      clientId: environment.keycloak.clientId // Your Keycloak Client ID
    },
    initOptions: {
      onLoad: 'login-required', // Load the login page on initialization
      checkLoginIframe: false // Disable checking login status using iframes
    }
  });
}

@NgModule({
  imports: [
    BrowserModule,
    KeycloakAngularModule,
    NgxImageZoomModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    KeycloakService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
