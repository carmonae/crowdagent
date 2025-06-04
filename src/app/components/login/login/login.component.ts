import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '@app/auth/service/auth.keycloak.service';

import { FeatherIconsComponent } from '../../../shared/component/feather-icons/feather-icons.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeatherIconsComponent,
  ],
})
export class LoginComponent {
  public show: boolean = false;
  public loginForm: FormGroup;
  public errorMessage: string = '';

  private email: string = '';
  private password: string = '';
  private isLoading: boolean = false;
  public rememberUser: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    public router: Router
  ) {
    const userData = localStorage.getItem('user');
    if (userData?.length != null) {
      router.navigate(['/dashboard/default']);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  // Simple Login
  async onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    this.email = this.loginForm.value['email'];
    this.password = this.loginForm.value['password'];

    try {
      await this.authService.login();

      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.errorMessage = error.code || ' An Error ocurred during login';
      console.log('errorMessage:', this.errorMessage);
    } finally {
      this.isLoading = false;
    }
  }

  onRememberUser() {
    this.rememberUser = !this.rememberUser;
    if (!this.rememberUser) {
      localStorage.clear();
    }
  }

  showPassword() {
    this.show = !this.show;
  }

  error() {
    return this.errorMessage;
  }
}
