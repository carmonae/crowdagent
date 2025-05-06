import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/auth/service/auth.keycloak.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public show: boolean = false;
  public loginForm: FormGroup;
  public errorMessage: string = ''

  private email: string = '';
  private password: string = '';
  private isLoading: boolean = false;
  public rememberUser: boolean = false

  constructor(private authService: AuthService, private fb: FormBuilder, public router: Router) {

    const userData = localStorage.getItem('user');
    if (userData?.length != null) {
      router.navigate(['/dashboard/default'])
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
    });

  }

  ngOnInit() { }

  // Simple Login
  async onSubmit() {
    this.isLoading = true
    this.errorMessage = ''
    this.email = this.loginForm.value["email"]
    this.password = this.loginForm.value["password"]

    try {
      await this.authService.login()

      if (this.rememberUser) {
        localStorage.setItem("user", JSON.stringify({ 'email': this.email, 'password': this.password }));
      }
      this.router.navigate(["/dashboard/default"]);
    }
    catch (error: any) {
      this.errorMessage = error.code || ' An Error ocurred during login'
      console.log('errorMessage:', this.errorMessage)

    }
    finally {
      this.isLoading = false
    }

  }

  onRememberUser() {
    this.rememberUser = !this.rememberUser
    if (!this.rememberUser) {
      localStorage.clear()
    }
  }

  showPassword() {
    this.show = !this.show;
  }

  error() {
    return this.errorMessage
  }

}
