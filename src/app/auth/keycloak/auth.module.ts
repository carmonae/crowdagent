import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { AuthGuard } from './auth.guard';
import { initializer } from './keycloak-initializer'
import { AuthService } from '../../services/auth.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    AuthGuard,
    AuthService
  ]
})
export class AuthModule { }
