import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';

@Injectable()
export class AuthService {
  private profileLoaded: boolean = false;
  private profile: KeycloakProfile | undefined;

  constructor(private keycloakService: KeycloakService) {
    console.log('Keycloak service initialized');
    this.loadUserProfile()
      .then((profile) => {
        console.log('keycloakService.User profile loaded:', profile);
        this.profileLoaded = true;
        this.profile = profile;
      })
      .catch((error) => {
        console.error('Error loading user profile:', error);
      });
  }

  public getLoggedUser(): KeycloakTokenParsed | undefined {
    try {
      const userDetails: KeycloakTokenParsed | undefined =
        this.keycloakService.getKeycloakInstance().idTokenParsed;
      this.keycloakService.getKeycloakInstance().idToken;
      return userDetails;
    } catch (e) {
      console.error('Exception', e);
      return undefined;
    }
  }

  public getUid(): string | undefined {
    if (this.profile == undefined) {
      return '';
    } else {
      return this.profile['id'];
    }
  }

  public getFirstName(): string {
    if (this.profile == undefined) {
      return 'Loading...';
    } else {
      return this.profile['firstName']!;
    }
  }

  public getLastName(): string {
    if (this.profile == undefined) {
      return 'Loading...';
    } else {
      return this.profile['lastName']!;
    }
  }

  public getFullName(): string {
    if (this.profile == undefined) {
      return 'Loading...';
    } else {
      return this.profile['lastName'] + ' ' + this.profile['firstName'];
    }
  }

  public getEmail(): string {
    if (this.profile == undefined) {
      return 'Loading...';
    } else {
      return this.profile['email']!;
    }
  }

  public getPhone(): string {
    if (this.profile == undefined) {
      return 'Loading...';
    } else {
      return 'phone';
    }
  }

  public isLoggedIn(): Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }

  public loadUserProfile(): Promise<KeycloakProfile> {
    return this.keycloakService.loadUserProfile();
  }

  public async login(): Promise<void> {
    return this.keycloakService
      .login({
        redirectUri: window.location.origin + '/dashboard',
      })
      .then((value) => {
        console.log('login:', value);
      })
      .catch((error) => {
        console.error('login error:', error);
      });
  }

  public logout(redirecUrl: string): void {
    this.keycloakService.logout(window.location.origin + redirecUrl);
  }

  public register(email: string, password: string): void {
    console.log('register user with email', email, 'and password', password);
  }

  public updateProfile(fullName: string): void {
    console.log('update user profile with full name', fullName);
  }

  public getCurrentUser(): KeycloakTokenParsed | undefined {
    const user: KeycloakTokenParsed | undefined = this.getLoggedUser();
    if (user == undefined) {
      return undefined;
    } else {
      return user;
    }
  }
  public getUserRoles(): string[] {
    const user: KeycloakTokenParsed | undefined = this.getLoggedUser();
    if (user == undefined) {
      return [];
    } else {
      const roles: string[] = user['realm_access']?.['roles'] ?? [];
      return roles;
    }
  }
  public getUserGroups(): string[] {
    const user: KeycloakTokenParsed | undefined = this.getLoggedUser();
    if (user == undefined) {
      return [];
    } else {
      const groups: string[] = user['groups'];
      return groups;
    }
  }
  public getUserId(): string | undefined {
    const user: KeycloakTokenParsed | undefined = this.getLoggedUser();
    if (user == undefined) {
      return undefined;
    } else {
      return user['sub'];
    }
  }
  public getUserName(): string | undefined {
    const user: KeycloakTokenParsed | undefined = this.getLoggedUser();
    if (user == undefined) {
      return undefined;
    } else {
      return user['preferred_username'];
    }
  }
  public getUserEmail(): string | undefined {
    const user: KeycloakTokenParsed | undefined = this.getLoggedUser();
    if (user == undefined) {
      return undefined;
    } else {
      return user['email'];
    }
  }

  public registerUser(email: string, password: string) {
    console.log('register user with email', email, 'and password', password);
  }
  public updateUserProfile(fullName: string) {
    console.log('update user profile with full name', fullName);
  }

  sendPasswordReset(email: string) {
    console.log('send password reset email to', email);
  }

  public redirectToProfile(): void {
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

  public getRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }
}
function value(value: void): void | PromiseLike<void> {
  throw new Error('Function not implemented.');
}
