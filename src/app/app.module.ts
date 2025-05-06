// Angular imports
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';

// Keycloak imports
import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { keycloakConfig, keycloakInitOptions } from '@environments/keycloak.config';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

// Firebase imports
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import firebaseConfig from '../environments/firebase.config';

// Local imports
import { AppComponent } from './app.component';
import { LoginComponentModule } from './components/login/login.module';
import { HttpLoaderFactory, SharedModule } from './shared/shared.module';


export const initializeKeycloak = (keycloakService: KeycloakService) => async () =>
  keycloakService.init({
    config: keycloakConfig,
    initOptions: keycloakInitOptions,
    bearerExcludedUrls: [],
    loadUserProfileAtStartUp: true,
  });

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    KeycloakAngularModule,
    LoginComponentModule,
  ],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
