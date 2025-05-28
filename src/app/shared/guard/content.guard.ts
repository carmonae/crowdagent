import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class ContentGuard {
  public url: any;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.url = this.router.url;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Guard for user is login or not
    let loginStatus = this.authService
      .isLoggedIn()
      .then((result) => {
        if (result) {
          this.router.navigate(['/dashboard']);
          return true;
        } else {
          this.router.navigate(['/landing']);
          return false;
        }
      })
      .catch((error) => {
        console.error('Error checking login status', error);
        this.router.navigate(['/landing']);
        return false;
      });

    return true;
  }
}
