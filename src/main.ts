import {
  APP_INITIALIZER,
  enableProdMode,
  importProvidersFrom,
} from '@angular/core';

import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AuthService } from '@app/auth/service/auth.keycloak.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { routes } from '../src/app/app-routing.module';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { initializeKeycloak } from './app/auth/keycloak/keycloak-initializer';
import { LoginComponentModule } from './app/components/login/login.module';
import { HttpLoaderFactory, SharedModule } from './app/shared/shared.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule,
      NgbModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      KeycloakAngularModule,
      LoginComponentModule
    ),
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes, withComponentInputBinding()),
  ],
}).catch((err) => console.error(err));
