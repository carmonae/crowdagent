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
    console.log('login')
  }

  public logout(): void {
    this.keycloakService.logout(window.location.origin);
  }

  public register(email: string, password: string): void {
    console.log('register user with email', email, 'and password', password)
  }
  public updateProfile(fullName: string): void {
    console.log('update user profile with full name', fullName)
  }
  public getCurrentUser(): KeycloakTokenParsed | undefined {
    const user: KeycloakTokenParsed | undefined = this.getLoggedUser()
    if (user == undefined) {
      return undefined
    }
    else {
      return user
    }
  }
  public getUserRoles(): string[] {
    const user: KeycloakTokenParsed | undefined = this.getLoggedUser()
    if (user == undefined) {
      return []
    }
    else {
      const roles: string[] = user['realm_access']?.['roles'] ?? []
      return roles
    }
  }
  public getUserGroups(): string[] {
    const user: KeycloakTokenParsed | undefined = this.getLoggedUser()
    if (user == undefined) {
      return []
    }
    else {
      const groups: string[] = user['groups']
      return groups
    }
  }
  public getUserId(): string | undefined {
    const user: KeycloakTokenParsed | undefined = this.getLoggedUser()
    if (user == undefined) {
      return undefined
    }
    else {
      return user['sub']
    }
  }
  public getUserName(): string | undefined {
    const user: KeycloakTokenParsed | undefined = this.getLoggedUser()
    if (user == undefined) {
      return undefined
    }
    else {
      return user['preferred_username']
    }
  }
  public getUserEmail(): string | undefined {
    const user: KeycloakTokenParsed | undefined = this.getLoggedUser()
    if (user == undefined) {
      return undefined
    }
    else {
      return user['email']
    }
  }

  public registerUser(email: string, password: string) {
    console.log('register user with email', email, 'and password', password)
  }
  public updateUserProfile(fullName: string) {
    console.log('update user profile with full name', fullName)
  }


  sendPasswordReset(email: string) {
    console.log('send password reset email to', email)
  }


  public redirectToProfile(): void {
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

  public getRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }
}
