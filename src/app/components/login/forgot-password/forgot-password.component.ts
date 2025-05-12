import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '@app/auth/service/auth.keycloak.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterLink]
})
export class ForgotPasswordComponent {

  public show: boolean = false;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }
  showPassword() {
    this.show = !this.show;
  }

  resetPassword() {
    console.log('password reset')
    this.authService.sendPasswordReset('edward.a.carmona@gmail.com')
  }
}
