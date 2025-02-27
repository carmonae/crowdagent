// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user$: Observable<any>;

    constructor(private afAuth: AngularFireAuth) {
        this.user$ = afAuth.authState;
    }

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
        return this.afAuth.currentUser;
    }

    public getUid(): string | undefined {
        return "edward.a.carmona"
    }

    public getEmail(): string {
        return "edward.a.carmona@gmail.com"
    }

    public getFullName(): string {
        return "Edward A. Carmona"
    }

    public getFirstName(): string {
        return "Edward"
    }

    public getLoggedUser(): any {
        return this.afAuth.currentUser
    }
}