import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  auth = getAuth()
  user = this.auth.currentUser;

  async login(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    return this.afAuth.signOut();
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  getFullName() {
    return this.auth.currentUser?.displayName || 'getFullName'
  }

  getUid() {
    return this.auth.currentUser?.uid || 'getUid';
  }

  getEmail() {
    return this.auth.currentUser?.email || 'getEmail'
  }

  createAccount(email: string, password: string) {
    try {
      createUserWithEmailAndPassword(this.auth, email, password)
    }
    catch (error) {
      console.log('Error:', error)
    }
  }

  updateProfile(displayName: string) {
    if (this.user) {
      updateProfile(this.user, { "displayName": displayName })
    }
  }

  sendPasswordReset(email: string) {
    sendPasswordResetEmail(this.auth, email)
  }

  /*
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
    */
}
