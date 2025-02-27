import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';

@Injectable()
export class AuthService {

  constructor(private keycloakService: KeycloakService) { }

  public getLoggedUser(): KeycloakTokenParsed | undefined {
    try {
      const userDetails: KeycloakTokenParsed | undefined = this.keycloakService.getKeycloakInstance().idTokenParsed;
      return userDetails;
    }
    catch (e) {
      console.error("Exception", e);
      return undefined
    }
  }

  public getUid(): string | undefined {

    const user: KeycloakTokenParsed | undefined = this.getLoggedUser()
    if (user == undefined) {
      return ''
    }
    else {
      return user['sub']
    }
  }

  public getFirstName(): string {

    const user: KeycloakTokenParsed | undefined = this.getLoggedUser()
    if (user == undefined) {
      return ''
    }
    else {
      return user['given_name']
    }

  }

  public getLastName(): string {

    const user: KeycloakTokenParsed | undefined = this.getLoggedUser()
    if (user == undefined) {
      return ''
    }
    else {
      return user['family_name']
    }

  }

  public getFullName(): string {
    const user: KeycloakTokenParsed | undefined = this.getLoggedUser()
    if (user == undefined) {
      return ''
    }
    else {
      return user['name']
    }

  }

  public getEmail(): string {
    const user: KeycloakTokenParsed | undefined = this.getLoggedUser()
    if (user == undefined) {
      return ''
    }
    else {
      return user['email']
    }

  }

  public isLoggedIn(): Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }

  public loadUserProfile(): Promise<KeycloakProfile> {
    return this.keycloakService.loadUserProfile();
  }

  public login(): void {
    this.keycloakService.login()
  }

  public logout(): void {
    this.keycloakService.logout(window.location.origin);
  }

  public redirectToProfile(): void {
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

  public getRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }
}
